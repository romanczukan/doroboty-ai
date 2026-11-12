import { stageLabels, type Application } from "./model";
import { formatNextStepDate, nextStepLabels } from "./next-steps";

export type ApplicationHistoryItem = {
  id: string;
  title: string;
  at: string;
  details?: string;
  note?: string;
  publicComment?: string;
};

/** Project private notes at the role boundary; plan changes do not become stage transitions. */
export function applicationHistory(application: Application, audience: "employer" | "candidate") {
  const items: ApplicationHistoryItem[] = application.events.map((event, index) => ({
    id: `stage-${index}`,
    title: stageLabels[event.stage],
    at: event.at,
    ...(audience === "employer" ? { note: event.note } : {}),
    publicComment: event.publicComment,
  }));
  application.nextStepUpdates.forEach((update, index) => {
    // Completion/closure is already represented by its corresponding stage event.
    if (update.reason !== "updated" || !update.after) return;
    const changedDate =
      update.before?.kind === update.after.kind &&
      update.before.scheduledFor !== update.after.scheduledFor;
    items.push({
      id: `plan-${index}`,
      title: changedDate
        ? "Zmieniono termin kolejnego kroku"
        : update.before
          ? "Zmieniono kolejny krok"
          : "Ustalono kolejny krok",
      at: update.at,
      details: `${nextStepLabels[update.after.kind]} · ${formatNextStepDate(update.after)}${changedDate && update.before?.scheduledFor ? ` (poprzednio: ${formatNextStepDate(update.before)})` : ""}`,
      publicComment: update.comment,
    });
  });
  return items.sort((a, b) => a.at.localeCompare(b.at));
}
