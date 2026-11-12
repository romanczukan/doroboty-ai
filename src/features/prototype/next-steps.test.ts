import { describe, expect, it } from "vitest";
import { initialState, stateSchema, transition, type State, type Stage } from "./model";
import { applicationHistory } from "./application-history";
import { parseState, serializeState } from "./storage";
import {
  formatNextStepDate,
  meetingInputFromInstant,
  meetingInputToInstant,
  nextStepSchema,
  type NextStep,
} from "./next-steps";

const now = "2026-11-12T10:00:00.000Z";
const meeting: NextStep = { kind: "interview", scheduledFor: "2026-11-17T09:00:00.000Z" };
function employer() {
  return transition(initialState(), { type: "select_person", id: "employer-brightlabs" });
}
function plan(state: State, step: NextStep, comment = "") {
  return transition(
    state,
    { type: "next_step", applicationId: "application-example", step, comment },
    now,
  );
}
function stage(state: State, value: Stage, publicComment = "") {
  return transition(
    state,
    {
      type: "stage",
      applicationId: "application-example",
      stage: value,
      note: "Private employer note",
      publicComment,
    },
    now,
  );
}

describe("next step planning and public history", () => {
  it("allows a step without a date and planning does not change stages or snapshots", () => {
    const before = employer();
    const result = plan(before, { kind: "interview", scheduledFor: null }, "  Termin ustalamy.  ");
    const record = result.applications[0];
    expect(record.nextStep).toEqual({ kind: "interview", scheduledFor: null });
    expect(record.nextStepUpdates[0]).toMatchObject({
      before: null,
      after: record.nextStep,
      comment: "Termin ustalamy.",
    });
    expect(record.stage).toBe(before.applications[0].stage);
    expect(record.events).toEqual(before.applications[0].events);
    expect(record.answer).toBe(before.applications[0].answer);
    expect(record.cv).toBe(before.applications[0].cv);
    expect(before.applications[0].nextStep).toBeNull();
  });
  it("keeps previous dates and optional public comments through rescheduling, export and reload", () => {
    let state = plan(employer(), meeting, "Pierwszy termin.");
    state = plan(
      state,
      { ...meeting, scheduledFor: "2026-11-18T10:30:00.000Z" },
      "Przepraszam za zmianę.",
    );
    state = parseState(serializeState(state));
    expect(state.applications[0].nextStepUpdates.at(-1)).toMatchObject({
      before: meeting,
      comment: "Przepraszam za zmianę.",
    });
    const history = applicationHistory(state.applications[0], "candidate");
    expect(history.at(-1)).toMatchObject({
      title: "Zmieniono termin kolejnego kroku",
      publicComment: "Przepraszam za zmianę.",
    });
    expect(history.at(-1)?.details).toContain("17 listopada 2026");
    expect(history.at(-1)?.details).toContain("18 listopada 2026");
    const withoutComment = plan(state, { kind: "feedback", scheduledFor: "2026-11-20" });
    expect(withoutComment.applications[0].nextStepUpdates.at(-1)?.comment).toBe("");
    expect(withoutComment.applications[0].nextStepUpdates[1].comment).toBe(
      "Przepraszam za zmianę.",
    );
  });
  it("projects public stage comments while excluding every private recruiting note", () => {
    const state = stage(
      plan(employer(), meeting, "Zapraszamy."),
      "reviewed",
      "Przeglądamy aplikację.",
    );
    const candidate = applicationHistory(state.applications[0], "candidate");
    expect(candidate.some((item) => item.publicComment === "Przeglądamy aplikację.")).toBe(true);
    expect(JSON.stringify(candidate)).not.toContain("Private employer note");
    expect(
      applicationHistory(state.applications[0], "employer").some(
        (item) => item.note === "Private employer note",
      ),
    ).toBe(true);
  });
  it("restricts planning to the employer of the application company", () => {
    for (const id of [
      null,
      "candidate-marek",
      "candidate-anna",
      "employer-northstar",
      "operator",
    ]) {
      const state = transition(initialState(), { type: "select_person", id });
      expect(() => plan(state, meeting)).toThrow();
    }
    expect(() =>
      transition(
        employer(),
        { type: "next_step", applicationId: "missing", step: meeting, comment: "" },
        now,
      ),
    ).toThrow();
  });
  it("completes a first interview only when the conversation is marked held", () => {
    let state = stage(stage(plan(employer(), meeting), "reviewed"), "interview_invited");
    expect(state.applications[0].nextStep).toEqual(meeting);
    state = stage(state, "first_conversation_held");
    expect(state.applications[0].nextStep).toBeNull();
    expect(state.applications[0].nextStepUpdates.at(-1)).toMatchObject({
      before: meeting,
      after: null,
      reason: "completed",
    });
    expect(stateSchema.safeParse(state).success).toBe(true);
    const feedback = plan(state, { kind: "feedback", scheduledFor: "2026-11-20" });
    expect(stage(feedback, "continued").applications[0].nextStep).toEqual(
      feedback.applications[0].nextStep,
    );
  });
  it("retains technical plans across nonterminal stage changes", () => {
    const technical: NextStep = { kind: "technical", scheduledFor: "2026-11-24T13:00:00.000Z" };
    const state = stage(
      stage(stage(plan(employer(), technical), "reviewed"), "interview_invited"),
      "first_conversation_held",
    );
    expect(state.applications[0].nextStep).toEqual(technical);
  });
  it.each(["rejected", "withdrawn", "hired"] as const)(
    "closes plans and blocks further planning after %s",
    (end) => {
      let state = plan(employer(), { kind: "technical", scheduledFor: null });
      if (end === "withdrawn") {
        state = transition(state, { type: "select_person", id: "candidate-marek" });
        state = transition(state, { type: "withdraw", applicationId: "application-example" }, now);
      } else {
        if (end === "hired")
          for (const value of [
            "reviewed",
            "interview_invited",
            "first_conversation_held",
            "continued",
          ] as const)
            state = stage(state, value);
        state = stage(state, end, "Dziękujemy za udział.");
      }
      expect(state.applications[0].nextStep).toBeNull();
      expect(state.applications[0].nextStepUpdates.at(-1)?.reason).toBe("closed");
      state = transition(state, { type: "select_person", id: "employer-brightlabs" });
      expect(() => plan(state, meeting)).toThrow("zakończony");
      expect(parseState(serializeState(state))).toEqual(state);
    },
  );
  it("accepts old version-1 saves and rejects inconsistent new histories without changing input", () => {
    const raw = JSON.parse(serializeState(initialState()));
    delete raw.applications[0].nextStep;
    delete raw.applications[0].nextStepUpdates;
    const restored = parseState(JSON.stringify(raw));
    expect(restored.applications[0].nextStep).toBeNull();
    expect(restored.applications[0].nextStepUpdates).toEqual([]);
    const broken = plan(employer(), meeting);
    broken.applications[0].nextStep = null;
    expect(() => parseState(serializeState(broken))).toThrow("Dotychczasowy stan");
    const badOrder = plan(plan(employer(), meeting), { kind: "feedback", scheduledFor: null });
    badOrder.applications[0].nextStepUpdates[1].at = "2026-11-01T00:00:00.000Z";
    expect(stateSchema.safeParse(badOrder).success).toBe(false);
    expect(raw.applications[0]).not.toHaveProperty("nextStep");
  });
  it("validates dates/comments and never auto-completes elapsed plans", () => {
    expect(nextStepSchema.safeParse({ kind: "feedback", scheduledFor: "2026-02-30" }).success).toBe(
      false,
    );
    expect(
      nextStepSchema.safeParse({ kind: "feedback", scheduledFor: meeting.scheduledFor }).success,
    ).toBe(false);
    expect(
      nextStepSchema.safeParse({ kind: "interview", scheduledFor: "2026-11-17" }).success,
    ).toBe(false);
    expect(() => plan(employer(), meeting, "x".repeat(2001))).toThrow();
    expect(() => stage(employer(), "reviewed", "x".repeat(2001))).toThrow();
    const expired: NextStep = { kind: "feedback", scheduledFor: "2026-11-03" };
    const result = plan(employer(), expired);
    expect(parseState(serializeState(result)).applications[0].nextStep).toEqual(expired);
  });
});

describe("Polish schedules independent of the device time zone", () => {
  it.each([
    ["2026-01-17T10:00", "2026-01-17T09:00:00.000Z"],
    ["2026-07-17T10:00", "2026-07-17T08:00:00.000Z"],
    ["2026-11-17T00:15", "2026-11-16T23:15:00.000Z"],
    ["2026-03-29T03:30", "2026-03-29T01:30:00.000Z"],
    ["2026-10-25T03:30", "2026-10-25T02:30:00.000Z"],
  ])("round-trips %s", (input, instant) => {
    expect(meetingInputToInstant(input)).toBe(instant);
    expect(meetingInputFromInstant(instant)).toBe(input);
  });
  it.each(["2026-03-29T02:30", "2026-10-25T02:30"])(
    "rejects nonexistent/ambiguous local time %s",
    (input) => {
      expect(() => meetingInputToInstant(input)).toThrow("zmiany czasu");
    },
  );
  it.each(["not-a-date", "2026-02-30T10:00", "2026-11-17T25:00"])(
    "rejects invalid date %s",
    (input) => {
      expect(() => meetingInputToInstant(input)).toThrow("poprawną datę");
    },
  );
  it("formats meetings and date-only feedback deadlines in Polish", () => {
    expect(formatNextStepDate(meeting)).toContain("10:00");
    expect(formatNextStepDate({ kind: "feedback", scheduledFor: "2026-11-20" })).toBe(
      "Do 20 listopada 2026",
    );
    expect(formatNextStepDate({ kind: "interview", scheduledFor: null })).toContain("nie został");
  });
});
