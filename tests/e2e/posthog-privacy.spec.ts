import { expect, test, type BrowserContext, type Request } from "@playwright/test";
import { gunzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";
import { build, preview, type PreviewServer } from "vite";

const token = "phc_local_privacy_test";
const host = "https://posthog-test.invalid";
const require = createRequire(import.meta.url);
const recorder = readFileSync(
  require.resolve("posthog-js/package.json").replace(/package\.json$/, "dist/lazy-recorder.js"),
);
let server: PreviewServer;
let app: string;
const publicText = "Praca dla ludzi, którzy dowożą z AI.";

type Event = { event: string; properties: Record<string, unknown> };

function bodyOf(request: Request) {
  const body = request.postDataBuffer();
  if (!body) return "";
  if (body[0] === 0x1f && body[1] === 0x8b) return gunzipSync(body).toString();
  const text = body.toString();
  if (text.startsWith("data="))
    return Buffer.from(new URLSearchParams(text).get("data")!, "base64").toString();
  return text;
}

function decodeReplay(value: unknown): unknown {
  if (typeof value === "string" && value.charCodeAt(0) === 0x1f && value.charCodeAt(1) === 0x8b) {
    return decodeReplay(JSON.parse(gunzipSync(Buffer.from(value, "latin1")).toString()));
  }
  if (Array.isArray(value)) return value.map(decodeReplay);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, decodeReplay(item)]),
    );
  return value;
}

async function mockPostHog(context: BrowserContext) {
  // A synthetic human-like browser for this intercepted local SDK test only.
  await context.addInitScript(() =>
    Object.defineProperty(navigator, "webdriver", { get: () => false }),
  );
  const requests: Request[] = [];
  const events: Event[] = [];
  await context.route(`${host}/**`, async (route) => {
    const request = route.request();
    requests.push(request);
    const path = new URL(request.url()).pathname;
    if (path.endsWith("/config.js")) {
      await route.fulfill({
        contentType: "text/javascript",
        body: `window._POSTHOG_REMOTE_CONFIG = { ${JSON.stringify(token)}: { config: { sessionRecording: { endpoint: '/s/', minimumDurationMilliseconds: 0, sampleRate: 1 }, hasFeatureFlags: false, autocapture_opt_out: false } } }`,
      });
    } else if (path.endsWith("/lazy-recorder.js")) {
      await route.fulfill({ contentType: "text/javascript", body: recorder });
    } else {
      if (request.method() === "POST") {
        const payload = JSON.parse(bodyOf(request));
        events.push(...(Array.isArray(payload) ? payload : (payload.batch ?? [payload])));
      }
      await route.fulfill({ json: { status: 1 } });
    }
  });
  return { requests, events };
}

test.beforeAll(async () => {
  const outDir = "test-results/posthog-preview";
  const config = {
    define: {
      "import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN": JSON.stringify(token),
      "import.meta.env.VITE_PUBLIC_POSTHOG_HOST": JSON.stringify(host),
    },
    build: { outDir },
  };
  await build({ ...config, logLevel: "error" });
  server = await preview({ ...config, preview: { host: "127.0.0.1", port: 0 } });
  app = `http://127.0.0.1:${(server.httpServer.address() as AddressInfo).port}`;
});

test.afterAll(async () => {
  await server?.close();
});

test("PostHog receives approved interactions and redacted recordings only after opt-in", async ({
  browser,
}) => {
  // HeadlessChrome is intentionally filtered by the production SDK.
  const userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
  const context = await browser.newContext({ userAgent, viewport: { width: 390, height: 844 } });
  const otherContext = await browser.newContext({ userAgent });
  try {
    const first = await mockPostHog(context);
    const other = await mockPostHog(otherContext);
    const page = await context.newPage();
    const otherPage = await otherContext.newPage();
    const grant = "Włącz analitykę i nagrania";
    const revoke = "Wyłącz analitykę i nagrania";
    const searchMarker = "PRIVATESEARCH94A";
    const answerMarker = "PRIVATEANSWER42B: Test syntetyczny z odpowiedzią kandydata.";

    await page.goto(`${app}/#/polityka-prywatnosci`);
    await expect(page.getByRole("button", { name: grant })).toBeVisible();
    expect(first.requests).toHaveLength(0);
    await Promise.all([
      page.waitForResponse(`${host}/array/${token}/config.js`),
      page.getByRole("button", { name: grant }).click(),
    ]);
    const pageviews = () => first.events.filter((event) => event.event === "$pageview");
    await page.getByRole("link", { name: "Oferty", exact: true }).last().click();
    await expect(page.getByRole("heading", { name: "Oferty pracy" })).toBeVisible();
    await page.getByRole("button", { name: /^Build/ }).click();
    await page.getByRole("textbox", { name: "Szukaj ofert" }).fill(searchMarker);
    await page.getByRole("button", { name: "Szukaj", exact: true }).click();
    await expect(page.getByRole("button", { name: `Usuń filtr: ${searchMarker}` })).toBeVisible();

    await page.goto(`${app}/#/oferty/ai-product-manager#warunki`);
    await expect(page.getByRole("heading", { name: "AI Product Manager" })).toBeVisible();
    await page.goto(`${app}/#/oferty/staff-ai-engineer`);
    await expect(page.getByRole("heading", { name: "Staff AI Engineer" })).toBeVisible();
    const initialPaths = ["/polityka-prywatnosci", "/oferty", "/oferty/:slug", "/oferty/:slug"];
    await expect
      .poll(() => pageviews().map((event) => event.properties.route))
      .toEqual(initialPaths);
    for (const [index, route] of initialPaths.entries()) {
      expect(pageviews()[index].properties).toMatchObject({
        route,
        $pathname: route,
        $current_url: app + route,
      });
      expect(pageviews()[index].properties).not.toHaveProperty("title");
    }
    expect(JSON.stringify(pageviews())).not.toMatch(
      /ai-product-manager|staff-ai-engineer|#warunki/,
    );

    await page.goto(`${app}/#/auth/sign-in`);
    await page.getByRole("button", { name: "Wejdź jako Anna Kowalska" }).click();
    await page.goto(`${app}/#/aplikuj/ai-product-manager`);
    await page.getByLabel("Dlaczego pasujesz do tej roli?").fill(answerMarker);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
    await page.getByRole("link", { name: "AI Product Manager", exact: true }).click();
    await page.getByRole("tab", { name: "Odpowiedź", exact: true }).click();
    await expect(page.getByText(answerMarker, { exact: true })).toBeVisible();

    await page.goto(`${app}/#/`);
    await expect(page.getByRole("heading", { name: publicText })).toBeVisible();
    await expect
      .poll(
        () =>
          first.events.some(
            (event) =>
              event.event === "$snapshot" &&
              JSON.stringify(decodeReplay(event.properties.$snapshot_data)).includes(publicText),
          ),
        { timeout: 12_000 },
      )
      .toBe(true);
    await expect
      .poll(() =>
        first.events
          .filter((event) => event.event === "$autocapture")
          .map((event) => event.properties.control),
      )
      .toContain("listing-category-build");
    expect(
      first.events
        .filter((event) => event.event === "$autocapture")
        .every((event) => typeof event.properties.control === "string"),
    ).toBe(true);
    expect(first.events.map((event) => event.event)).toEqual(
      expect.arrayContaining(["job_search_submitted", "person_selected", "application_submitted"]),
    );

    const wire = JSON.stringify(first.events.map((event) => decodeReplay(event)));
    for (const marker of [searchMarker, "PRIVATEANSWER42B", "Anna Kowalska", "candidate-anna"])
      expect(wire).not.toContain(marker);
    expect(first.requests.map((request) => request.url()).join(" ")).not.toContain(searchMarker);

    await otherPage.goto(`${app}/#/polityka-prywatnosci`);
    await otherPage.getByRole("button", { name: grant }).click();
    await otherPage.goto(`${app}/#/auth/sign-in`);
    await otherPage.getByRole("button", { name: "Wejdź jako Anna Kowalska" }).click();
    const person = () => other.events.find((event) => event.event === "person_selected");
    await expect.poll(() => person()?.properties.distinct_id).toEqual(expect.any(String));
    await otherPage.reload();
    await expect
      .poll(
        () =>
          other.events.filter(
            (event) => event.event === "$pageview" && event.properties.route === "/app",
          ).length,
      )
      .toBe(2);
    expect(person()?.properties.distinct_id).not.toBe(
      first.events.find((event) => event.event === "person_selected")?.properties.distinct_id,
    );
    expect(first.events.some((event) => event.event === "$identify")).toBe(false);

    await page.goto(`${app}/#/polityka-prywatnosci`);
    await page.getByRole("button", { name: revoke }).click();
    const posted = first.requests.filter((request) => request.method() === "POST").length;
    await page.goto(`${app}/#/oferty`);
    await page.getByRole("button", { name: /^Build/ }).click();
    await page.getByRole("textbox", { name: "Szukaj ofert" }).fill("Po wycofaniu");
    await page.getByRole("button", { name: "Szukaj", exact: true }).click();
    await page.goto(`${app}/#/polityka-prywatnosci`);
    await expect(page.getByRole("button", { name: grant })).toBeVisible();
    expect(first.requests.filter((request) => request.method() === "POST")).toHaveLength(posted);
  } finally {
    await Promise.all([context.close(), otherContext.close()]);
  }
});
