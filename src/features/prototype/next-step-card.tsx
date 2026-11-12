import { useId, useLayoutEffect, useRef, useState } from "react";
import { CalendarDays, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Application } from "./model";
import {
  formatNextStepDate,
  meetingInputFromInstant,
  meetingInputToInstant,
  nextStepInputSchema,
  nextStepKinds,
  nextStepLabels,
} from "./next-steps";
import { usePrototype } from "./store";

const messageDateFormat = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  dateStyle: "medium",
  timeStyle: "short",
});

export function NextStepCard({
  application,
  editable = false,
}: {
  application: Application;
  editable?: boolean;
}) {
  const { run } = usePrototype();
  const id = useId();
  const [editing, setEditing] = useState(false);
  const [kind, setKind] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusAfter = useRef<"kind" | "date" | "trigger" | "heading" | null>(null);
  const step = application.nextStep;
  const terminal = ["withdrawn", "rejected", "hired"].includes(application.stage);
  const lastUpdate = application.nextStepUpdates.at(-1);
  const previous =
    lastUpdate?.reason === "updated" &&
    lastUpdate.before?.kind === step?.kind &&
    lastUpdate.before?.scheduledFor !== step?.scheduledFor
      ? lastUpdate.before
      : null;
  const messages = [
    ...application.events.map(({ at, publicComment }) => ({ at, comment: publicComment ?? "" })),
    ...application.nextStepUpdates.map(({ at, comment: text }) => ({ at, comment: text })),
  ]
    .filter((message) => message.comment)
    .sort((a, b) => a.at.localeCompare(b.at));
  const message = messages.at(-1);

  useLayoutEffect(() => {
    const target = focusAfter.current;
    if (target === "date") dateRef.current?.focus();
    if (target === "kind") document.getElementById(`${id}-kind`)?.focus();
    if (target === "trigger") triggerRef.current?.focus();
    if (target === "heading") headingRef.current?.focus();
    focusAfter.current = null;
  }, [editing, id]);

  function edit() {
    setKind(step?.kind ?? "");
    setDate(
      step?.scheduledFor
        ? step.kind === "feedback"
          ? step.scheduledFor
          : meetingInputFromInstant(step.scheduledFor)
        : "",
    );
    setComment("");
    setError("");
    setAnnouncement("");
    focusAfter.current = step ? "date" : "kind";
    setEditing(true);
  }

  return (
    <section className="next-step-card" aria-labelledby={`${id}-heading`}>
      <div className="next-step-card-heading">
        <h2 id={`${id}-heading`} ref={headingRef} tabIndex={-1}>
          Kolejne kroki
        </h2>
        {editable && (
          <span
            className="next-step-badge"
            data-incomplete={!terminal && (!step || !step.scheduledFor)}
          >
            {terminal
              ? "Proces zakończony"
              : !step || !step.scheduledFor
                ? "Do uzupełnienia"
                : previous?.scheduledFor
                  ? "Termin zmieniony"
                  : "Zaplanowano"}
          </span>
        )}
      </div>
      <h3>
        {terminal
          ? "Brak kolejnych działań"
          : step
            ? nextStepLabels[step.kind]
            : editable
              ? "Nie ustalono kolejnego kroku"
              : "Czekamy na ustalenie kolejnego kroku"}
      </h3>
      {terminal ? (
        <p className="record-caption">
          {application.stage === "withdrawn"
            ? "Aplikacja została wycofana."
            : "Proces rekrutacyjny został zakończony."}
        </p>
      ) : step ? (
        <>
          <p className="next-step-date">
            <CalendarDays aria-hidden="true" size={18} />
            {step.scheduledFor ? (
              <time dateTime={step.scheduledFor}>{formatNextStepDate(step)}</time>
            ) : (
              <span>Termin nie został jeszcze ustalony.</span>
            )}
          </p>
          {step.scheduledFor && (
            <p className="record-caption">
              {step.kind === "feedback"
                ? "Termin przekazania feedbacku po rozmowie."
                : "Godzina w Polsce (Europe/Warsaw)."}
            </p>
          )}
        </>
      ) : !editable ? (
        <p className="record-caption">Rekruter nie podał jeszcze kroku ani terminu.</p>
      ) : null}
      {!terminal && editable && (!step || !step.scheduledFor) && (
        <p className="next-step-warning">
          <CircleAlert aria-hidden="true" size={18} />
          <span>
            {step
              ? "Brakuje terminu. Uzupełnij datę kolejnego kroku."
              : "Ustal, co wydarzy się dalej i kiedy."}
          </span>
        </p>
      )}
      {!terminal && previous?.scheduledFor && (
        <p className="next-step-previous">
          Poprzedni termin: <s>{formatNextStepDate(previous)}</s>
        </p>
      )}
      {message && (
        <div className="next-step-message">
          <p className="record-caption">
            {editable ? "Ostatni komentarz dla kandydata" : "Ostatnia wiadomość od pracodawcy"} ·{" "}
            <time dateTime={message.at}>{messageDateFormat.format(new Date(message.at))}</time>
          </p>
          <p>{message.comment}</p>
        </div>
      )}
      {!terminal && editable && !editing && (
        <div className="record-actions">
          <Button ref={triggerRef} onClick={edit}>
            {!step
              ? "Ustal kolejny krok"
              : !step.scheduledFor
                ? "Uzupełnij termin"
                : "Zmień ustalenia"}
          </Button>
        </div>
      )}
      {!terminal && editable && editing && (
        <form
          className="next-step-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            try {
              if (!kind) {
                setError("Wybierz kolejny krok.");
                return;
              }
              const input = nextStepInputSchema.safeParse({
                step: {
                  kind,
                  scheduledFor: date
                    ? kind === "feedback"
                      ? date
                      : meetingInputToInstant(date)
                    : null,
                },
                comment,
              });
              if (!input.success) {
                setError("Sprawdź krok, termin i długość komentarza (maksymalnie 2000 znaków).");
                return;
              }
              if (run({ type: "next_step", applicationId: application.id, ...input.data })) {
                focusAfter.current = "heading";
                setEditing(false);
                setAnnouncement(
                  "Zapisano ustalenia. Kandydat widzi aktualny krok i termin" +
                    (comment.trim() ? " oraz komentarz." : "."),
                );
              }
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : "Sprawdź termin spotkania.");
            }
          }}
        >
          <div className="next-step-fields">
            <div>
              <label htmlFor={`${id}-kind`}>Kolejny krok</label>
              <FormSelect
                id={`${id}-kind`}
                value={kind}
                options={nextStepKinds.map((value) => ({ value, label: nextStepLabels[value] }))}
                placeholder="Wybierz kolejny krok"
                onValueChange={(value) => {
                  if ((value === "feedback") !== (kind === "feedback")) setDate("");
                  setKind(value);
                }}
              />
            </div>
            <div>
              <label htmlFor={`${id}-date`}>
                {kind === "feedback" ? "Termin przekazania feedbacku" : "Data i godzina spotkania"}{" "}
                <span className="record-caption">(opcjonalnie)</span>
              </label>
              <Input
                ref={dateRef}
                id={`${id}-date`}
                type={kind === "feedback" ? "date" : "datetime-local"}
                value={date}
                aria-describedby={`${id}-date-hint${error ? ` ${id}-error` : ""}`}
                onChange={(event) => setDate(event.target.value)}
              />
              <p id={`${id}-date-hint`} className="record-caption">
                {kind === "feedback"
                  ? "Dzień, do którego kandydat otrzyma feedback."
                  : "Podaj godzinę w Polsce (Europe/Warsaw)."}{" "}
                Bez daty krok pozostanie do uzupełnienia.
              </p>
            </div>
          </div>
          <label htmlFor={`${id}-comment`}>
            Komentarz dla kandydata <span className="record-caption">(opcjonalnie)</span>
          </label>
          <p className="record-caption" id={`${id}-comment-hint`}>
            Kandydat zobaczy ten komentarz po zapisaniu ustaleń.
          </p>
          <Textarea
            id={`${id}-comment`}
            aria-describedby={`${id}-comment-hint`}
            maxLength={2000}
            rows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Co chcesz przekazać kandydatowi?"
          />
          {error && (
            <p className="next-step-error" id={`${id}-error`} role="alert">
              {error}
            </p>
          )}
          <div className="record-actions">
            <Button type="submit">Zapisz i przekaż kandydatowi</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                focusAfter.current = "trigger";
                setEditing(false);
                setError("");
              }}
            >
              Anuluj
            </Button>
          </div>
        </form>
      )}
      {editable && (
        <p className="record-caption next-step-announcement" role="status">
          {announcement}
        </p>
      )}
    </section>
  );
}
