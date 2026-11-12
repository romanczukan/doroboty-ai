import { z } from "zod";

export const publicCommentSchema = z.string().trim().max(2000);
export const nextStepKinds = ["interview", "feedback", "technical"] as const;
export const nextStepLabels = {
  interview: "Pierwsza rozmowa",
  feedback: "Przekazanie feedbacku",
  technical: "Ewaluacja techniczna",
};
export const nextStepSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("interview"), scheduledFor: z.iso.datetime().nullable() }),
  z.object({ kind: z.literal("technical"), scheduledFor: z.iso.datetime().nullable() }),
  z.object({ kind: z.literal("feedback"), scheduledFor: z.iso.date().nullable() }),
]);
export type NextStep = z.infer<typeof nextStepSchema>;
export const nextStepInputSchema = z.object({
  step: nextStepSchema,
  comment: publicCommentSchema,
});
export const nextStepUpdateSchema = z.object({
  at: z.iso.datetime(),
  before: nextStepSchema.nullable(),
  after: nextStepSchema.nullable(),
  reason: z.enum(["updated", "completed", "closed"]),
  comment: publicCommentSchema,
});
export type NextStepUpdate = z.infer<typeof nextStepUpdateSchema>;

const wallFormat = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Europe/Warsaw",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Native datetime-local values are Polish wall time, independent of the device zone. */
export function meetingInputFromInstant(instant: string) {
  const parts = Object.fromEntries(
    wallFormat.formatToParts(new Date(instant)).map(({ type, value }) => [type, value]),
  );
  return `${parts.year.padStart(4, "0")}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

export function meetingInputToInstant(input: string) {
  if (
    !/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d$/.test(input) ||
    !z.iso.date().safeParse(input.slice(0, 10)).success
  )
    throw new Error("Podaj poprawną datę i godzinę spotkania.");
  const wall = Date.parse(`${input}:00.000Z`);
  const offsets = new Set(
    [-12, 12].map((hours) => {
      const sample = wall + hours * 3_600_000;
      return Date.parse(`${meetingInputFromInstant(new Date(sample).toISOString())}:00Z`) - sample;
    }),
  );
  const candidates = [...offsets]
    .map((offset) => new Date(wall - offset).toISOString())
    .filter((instant) => meetingInputFromInstant(instant) === input);
  if (candidates.length !== 1)
    throw new Error(
      "Ta godzina jest niejednoznaczna lub nie istnieje z powodu zmiany czasu w Polsce. Wybierz inną godzinę.",
    );
  return candidates[0];
}

export function formatNextStepDate(step: NextStep) {
  if (!step.scheduledFor) return "Termin nie został jeszcze ustalony.";
  const feedback = step.kind === "feedback";
  const formatted = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(!feedback ? { hour: "2-digit" as const, minute: "2-digit" as const } : {}),
  }).format(new Date(feedback ? `${step.scheduledFor}T12:00:00Z` : step.scheduledFor));
  return feedback ? `Do ${formatted}` : formatted;
}

export function sameNextStep(a: NextStep | null, b: NextStep | null) {
  return a?.kind === b?.kind && a?.scheduledFor === b?.scheduledFor;
}
