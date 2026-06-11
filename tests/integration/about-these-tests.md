# About these tests

There are **two** Playwright smoke-test suites. Both run each p5.sound example sketch, do a trivial interaction, and assert **zero** console errors / uncaught exceptions. They differ only in *where the sketches come from*:

| Suite | Spec | Runs the sketches… | Good for |
| --- | --- | --- | --- |
| **web editor** | `test-examples-on-web-editor.spec.js` | in place on editor.p5js.org | testing what users actually see; catches platform/CDN drift |
| **local** | `test-examples-local.spec.js` | from this repo's `examples/`, against the freshly built `dist/` | deterministic, offline, tests *your* library changes |

Neither is "the real one" - they answer different questions. The web suite can drift if the published collection changes; the local suite can drift if `examples/` falls behind the collection. Keeping the two in sync is currently a manual job.

The two specs are intentionally kept **separate and simple** rather than sharing a procedure: run locally there are no iframes, no Play button, no settle race, no cookie banner and no Stop button, so the local spec is much shorter. The only shared code is the per-browser audio/mic setup in [`lib/browser-setup.js`](./lib/browser-setup.js) - identical, non-obvious, and easy to get subtly wrong, so it lives in one place.

## Where are the sketches?

- **web editor suite:** the list of sketch URLs is a literal array (`SKETCHES`) in the spec, extracted once from the [collection](https://editor.p5js.org/thomasjohnmartinez/collections/Dp0zGclVL). The test does not re-scrape at runtime, so it is deterministic. Re-extract and update the list when the collection changes.
- **local suite:** the list is discovered at load time by scanning `examples/*/` for directories containing an `index.html`. Each example's `index.html` loads `../../dist/p5.sound.js`, so the local suite tests **the library you just built** - run `npm run build` first (all relevant `test:integration:*` npm scripts do this for you).

## What does each test do?

Same essential procedure, different mechanics:

- **web editor:** load the sketch → dismiss the cookie banner → press Play → wait for the canvas to attach → click inside canvas → let it run → stop it → assert zero errors.
- **local:** load the served `index.html` (the sketch auto-runs) → wait for the canvas to attach → click inside canvas → let it run → assert zero errors.

## Browsers

Both suites are cross-browser. Each browser needs a *different* mechanism to (a) allow `getUserMedia` (camera/mic access) without a prompt and (b) let audio start without a user gesture, so these are kept as separate, self-contained configs in `BROWSER_SETUP` (in `lib/browser-setup.js`):

- **Chromium** - grants `microphone`/`camera` permissions and passes `--autoplay-policy=no-user-gesture-required`.
- **Firefox** - those permission names aren't accepted, so instead it uses `firefoxUserPrefs` (fake media device + disabled prompt, plus autoplay prefs). It also mutes output (`media.volume_scale: "0.0"`): headless Firefox routes audio to the real device, so the run would otherwise be audible.
- **WebKit** - not in `BROWSER_SETUP`, so it is skipped (no equivalent headless audio/mic mechanism - needs research).

(Native permission prompts are browser chrome and can't be clicked by Playwright, which is why the prompt is bypassed at the config level rather than clicked.)

## Test "projects" and how to run them

`playwright.config.js` defines four "projects" - a matrix of the two suites × {chromium, firefox} - bound to their spec via `testMatch`: `web-chromium`, `web-firefox`, `local-chromium`, `local-firefox`. The local projects point `baseURL` at a local `http-server` (a `webServer` in the config) that serves the repo root so `examples/<name>/` and its `../../dist/p5.sound.js` resolve.

| Command | Runs |
| --- | --- |
| `npm run test:integration` | builds `dist/`, then everything (both suites, both browsers) |
| `npm run test:integration:web` | web-editor suite (both browsers) |
| `npm run test:integration:web:chromium` | web-editor suite, Chromium only |
| `npm run test:integration:local` | builds `dist/`, then the local suite (both browsers) |
| `npm run test:integration:local:chromium` | builds `dist/`, then local suite, Chromium only |
| `npm run test:integration:ui` | opens the Playwright UI runner |

## What counts as a failure?

Any console `error` or uncaught exception while the sketch loads, is clicked, and runs. Nothing is filtered - a 404 for a missing asset or a failed AudioContext start is a real failure, not noise. The interaction is also asserted: if the canvas attaches but never becomes clickable, or never attaches at all, the test fails with an explicit message rather than silently skipping the interaction:

- `Expected to click the canvas but it never became visible`
- `Sketch never rendered a canvas (...)`

## Difficulties in testing on the web editor

These apply to the **web editor** suite only - the local suite sidesteps all of them:

- The preview is **two iframes deep** (`iframe[title="sketch preview"]` → a `blob:` child iframe → `#defaultCanvas0`).
- There's a **race**: the editor ships the sketch code to the preview sandbox over `postMessage`; pressing Play before that channel is established means the code never arrives and no canvas renders. A short fixed settle wait before Play (`SETTLE_BEFORE_PLAY_MS`) is a brittle-but-readable workaround. (A better fix would be for the editor to disable Play until it's ready.)
- p5 marks the canvas `data-hidden="true"` during setup/preload, so the test waits for the canvas to be **`attached`** (not `visible`) before deciding the sketch started.

Locally, the only comparable wrinkle is that p5 v2 numbers the default canvas inconsistently (`defaultCanvas1` for 2D sketches, `defaultCanvas0` for WEBGL ones), so the local spec matches the canvas by its `p5Canvas` class rather than by id.
