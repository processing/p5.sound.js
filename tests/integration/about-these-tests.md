# About these tests

See also: [about-playwright.md](./about-playwright.md)

`tests/integration/test-examples-on-web-editor.spec.js` is a Playwright spec that smoke-tests a list of p5.sound example sketches on the p5 web editor, looking for console errors and uncaught exceptions, against (currently) chromium and firefox browsers.

## Where are the sketches?

The sketches are tested in place in the web editor. At the moment that is where the example sketches live and where users will find them, so that's the best place to test them. It _would_ be easier to test them if they were in this repo.

The list of sketch URLs is a literal array (`SKETCHES`) in the spec, extracted once from the collection. The test does not re-scrape the collection at runtime, so it is deterministic. Re-extract and update the list when the collection changes.

## What does each test do?

Each test loads the sketch → dismisses the cookie banner → presses Play → waits for the canvas to attach → clicks inside it → lets it run → stops it → asserts **zero** console errors / uncaught exceptions.

## Browsers

The suite is cross-browser. Each browser needs a *different* mechanism to (a) allow `getUserMedia` (camera/mic) without a prompt and (b) let audio start without a user gesture, so these are kept as separate, self-contained configs in `BROWSER_SETUP`:
- **Chromium** — grants `microphone`/`camera` permissions and passes `--autoplay-policy=no-user-gesture-required`.
- **Firefox** — those permission names aren't accepted, so instead it uses `firefoxUserPrefs` (fake media device + disabled prompt, plus autoplay prefs).
- **WebKit** — not in `BROWSER_SETUP`, so it is skipped (no equivalent headless audio/mic mechanism).

Run all (supported) browsers with `npm run test:integration`, or just Chromium with `npm run test:integration:chromium-only`. (Native permission prompts are browser chrome and can't be clicked by Playwright, which is why the prompt is bypassed at the config level rather than clicked.)

Note: under headless **Firefox** the sketches are **audible** (audio routes to the real output device); headless **Chromium** is silent (null audio backend). This is expected, not a bug.

## Difficulties in testing on the web editor

- The preview is **two iframes deep** (`iframe[title="sketch preview"]` → a `blob:` child iframe → `#defaultCanvas0`).
- There's a **race**: the editor ships the sketch code to the preview sandbox over `postMessage`; pressing Play before that channel is established means the code never arrives and no canvas renders. A short fixed settle wait before Play (`SETTLE_BEFORE_PLAY_MS`) is a brittle-but-readable workaround. (A better fix would be for the editor to disable Play until it's ready.)
- p5 marks the canvas `data-hidden="true"` during setup/preload, so the test waits for the canvas to be **`attached`** (not `visible`) before deciding the sketch started.
- The click itself, however, requires the canvas to become **`visible`** — and we deliberately do **not** force it. If the canvas attaches but never becomes clickable, or never attaches at all, the test fails with an explicit message rather than silently skipping the interaction:
  - `Expected to click the canvas but it never became visible`
  - `Sketch never rendered a canvas (preview stayed empty)`
- Because the tests run against the live editor and live example code, the pass/fail set reflects the current state of those sketches and that external platform, not this repo.