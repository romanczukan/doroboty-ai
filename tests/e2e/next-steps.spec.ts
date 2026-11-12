import { expect, test, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { STORAGE_KEY } from "../../src/features/prototype/storage";

const employerUrl = "/#/app/kandydaci/application-example";
const candidateUrl = "/#/app/aplikacje/application-example";
async function choose(page: Page, name: string, url: string) {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: `Wejdź jako ${name}`, exact: true }).click();
  await page.goto(url);
}
async function selectStep(page: Page, card: Locator, label: string) {
  await card.getByRole("combobox", { name: "Kolejny krok", exact: true }).click();
  await page.getByRole("option", { name: label, exact: true }).click();
}
function card(page: Page) {
  return page.getByRole("region", { name: "Kolejne kroki", exact: true });
}

test("recruiter fills missing agreements, reschedules and shares public comments with the candidate", async ({
  page,
}) => {
  await choose(page, "Karolina Wiśniewska", employerUrl);
  await expect(card(page)).toContainText("Do uzupełnienia");
  await page
    .getByLabel("Notatka rekrutacyjna (widoczna pracodawcy)")
    .fill("Prywatna uwaga pracodawcy.");
  await card(page).getByRole("button", { name: "Ustal kolejny krok" }).click();
  await expect(card(page).getByRole("combobox")).toBeFocused();
  await selectStep(page, card(page), "Pierwsza rozmowa");
  await card(page)
    .getByLabel("Komentarz dla kandydata", { exact: false })
    .fill("Termin rozmowy jeszcze ustalamy.");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await expect(
    card(page).getByRole("heading", { name: "Kolejne kroki", exact: true }),
  ).toBeFocused();
  await expect(card(page)).toContainText("Brakuje terminu.");
  await expect(page.getByLabel("Notatka rekrutacyjna (widoczna pracodawcy)")).toHaveValue(
    "Prywatna uwaga pracodawcy.",
  );
  await page
    .getByLabel("Komentarz dla kandydata (opcjonalnie)", { exact: true })
    .fill("Rozpoczęliśmy przegląd Twojej aplikacji.");
  await page.getByRole("button", { name: "W przeglądzie", exact: true }).click();
  await page.reload();
  await expect(card(page)).toContainText("Pierwsza rozmowa");
  await choose(page, "Marek Nowak", candidateUrl);
  await expect(card(page)).toContainText("Termin nie został jeszcze ustalony.");
  await expect(card(page)).toContainText("Rozpoczęliśmy przegląd Twojej aplikacji.");
  await expect(page.getByText("Prywatna uwaga pracodawcy.", { exact: true })).toHaveCount(0);
  await expect(card(page).getByRole("button")).toHaveCount(0);
  await choose(page, "Karolina Wiśniewska", employerUrl);
  await card(page).getByRole("button", { name: "Uzupełnij termin" }).click();
  await card(page)
    .getByLabel("Data i godzina spotkania", { exact: false })
    .fill("2026-11-17T10:00");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await expect(card(page)).toContainText("17 listopada 2026");
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).applications[0].nextStep.scheduledFor,
      STORAGE_KEY,
    ),
  ).toBe("2026-11-17T09:00:00.000Z");
  await card(page).getByRole("button", { name: "Zmień ustalenia" }).click();
  await card(page)
    .getByLabel("Data i godzina spotkania", { exact: false })
    .fill("2026-11-18T11:30");
  await card(page)
    .getByLabel("Komentarz dla kandydata", { exact: false })
    .fill("Przepraszam za zmianę. Porozmawiamy w środę o 11:30.");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await page.screenshot({ path: "artifacts/next-steps/rescheduled-employer.png", fullPage: true });
  await choose(page, "Marek Nowak", candidateUrl);
  await page.reload();
  await expect(card(page)).toContainText("18 listopada 2026");
  await expect(card(page).locator("s")).toContainText("17 listopada 2026");
  await expect(card(page)).toContainText("Przepraszam za zmianę.");
  await expect(page.getByText("Prywatna uwaga pracodawcy.", { exact: true })).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 900 });
  await page.screenshot({
    path: "artifacts/next-steps/rescheduled-candidate-mobile.png",
    fullPage: true,
  });
});

test("completed conversation closes its plan; feedback, technical evaluation and closing remain coherent", async ({
  page,
}) => {
  await choose(page, "Karolina Wiśniewska", employerUrl);
  await card(page).getByRole("button", { name: "Ustal kolejny krok" }).click();
  await selectStep(page, card(page), "Pierwsza rozmowa");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  for (const stage of ["W przeglądzie", "Zaproszenie na rozmowę", "Pierwsza rozmowa odbyta"])
    await page.getByRole("button", { name: stage, exact: true }).click();
  await expect(card(page)).toContainText("Nie ustalono kolejnego kroku");
  await card(page).getByRole("button", { name: "Ustal kolejny krok" }).click();
  await selectStep(page, card(page), "Przekazanie feedbacku");
  await card(page).getByLabel("Termin przekazania feedbacku", { exact: false }).fill("2026-11-20");
  await card(page)
    .getByLabel("Komentarz dla kandydata", { exact: false })
    .fill("Do piątku wrócimy z feedbackiem.");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await choose(page, "Marek Nowak", candidateUrl);
  await expect(card(page)).toContainText("Do 20 listopada 2026");
  await expect(card(page)).toContainText("Do piątku wrócimy z feedbackiem.");
  await choose(page, "Karolina Wiśniewska", employerUrl);
  await card(page).getByRole("button", { name: "Zmień ustalenia" }).click();
  await selectStep(page, card(page), "Ewaluacja techniczna");
  await card(page)
    .getByLabel("Data i godzina spotkania", { exact: false })
    .fill("2026-11-24T14:00");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await page.getByRole("button", { name: "Kolejny etap", exact: true }).click();
  await expect(card(page)).toContainText("Ewaluacja techniczna");
  await choose(page, "Marek Nowak", candidateUrl);
  await expect(card(page)).toContainText("24 listopada 2026");
  await expect(card(page)).toContainText("14:00");
  await choose(page, "Karolina Wiśniewska", employerUrl);
  await page
    .getByLabel("Komentarz dla kandydata (opcjonalnie)", { exact: true })
    .fill("Dziękujemy za udział w procesie.");
  await page.getByRole("button", { name: "Proces zakończony", exact: true }).click();
  await expect(card(page)).toContainText("Brak kolejnych działań");
  await expect(card(page).getByRole("button")).toHaveCount(0);
  await expect(card(page).locator(".next-step-warning")).toHaveCount(0);
  await choose(page, "Marek Nowak", candidateUrl);
  await expect(card(page)).toContainText("Dziękujemy za udział w procesie.");
  await expect(card(page)).not.toContainText("24 listopada 2026");
});

test("planning supports keyboard, cancellation, validation, long comments and narrow screens", async ({
  page,
}) => {
  await choose(page, "Karolina Wiśniewska", employerUrl);
  const trigger = card(page).getByRole("button", { name: "Ustal kolejny krok" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(card(page).getByRole("combobox")).toBeFocused();
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await expect(card(page).getByRole("alert")).toHaveText("Wybierz kolejny krok.");
  await selectStep(page, card(page), "Pierwsza rozmowa");
  await card(page)
    .getByLabel("Data i godzina spotkania", { exact: false })
    .fill("2026-03-29T02:30");
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await expect(card(page).getByRole("alert")).toContainText("zmiany czasu");
  await card(page).getByRole("button", { name: "Anuluj", exact: true }).click();
  await expect(trigger).toBeFocused();
  await expect(card(page)).toContainText("Nie ustalono kolejnego kroku");
  await trigger.click();
  await selectStep(page, card(page), "Ewaluacja techniczna");
  await card(page)
    .getByLabel("Data i godzina spotkania", { exact: false })
    .fill("2026-11-24T14:00");
  const publicText = "DługiKomentarzBezSpacji".repeat(75);
  await card(page).getByLabel("Komentarz dla kandydata", { exact: false }).fill(publicText);
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  const editorAccessibility = await new AxeBuilder({ page }).include(".next-step-card").analyze();
  expect(editorAccessibility.violations).toEqual([]);
  await card(page).getByRole("button", { name: "Zapisz i przekaż kandydatowi" }).click();
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.screenshot({ path: "artifacts/next-steps/employer-desktop.png", fullPage: true });
  await choose(page, "Marek Nowak", candidateUrl);
  await expect(card(page)).toContainText(publicText);
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.screenshot({ path: "artifacts/next-steps/candidate-mobile.png", fullPage: true });
  const accessibility = await new AxeBuilder({ page }).include(".recruiting-record").analyze();
  expect(accessibility.violations).toEqual([]);
});
