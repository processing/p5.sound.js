# About these tests

See also: [about-playwright.md](./about-playwright.md)

`tests/integration/test-examples-on-web-editor.spec.js` is a Playwright spec that smoke-tests a list of p5.sound example sketch on the web editor looking for console errors.

**Where are the sketches?:** 
The sketches are tested in place in the web editor.
At the moment that is where the example sketches live and where users will find them, so that's the best place to test them. 
It _would_ be easier to test them if they were in this repo.

**What does each test do?:** Each test loads the sketch → dismisses the cookie banner → presses Play → waits for the canvas → clicks inside it → lets it run → stops it → asserts **zero** console errors / uncaught exceptions. 
Mic/camera are pre-granted at the context level (native prompts can't be clicked by Playwright), and `--autoplay-policy=no-user-gesture-required` lets audio start.  These settings are made via a chromium-only mechanism.

**Difficulties in testing on the web editor:**
- The preview is **two iframes deep** (`iframe[title="sketch preview"]` → blob: child → `#defaultCanvas0`).
- There's a **race**: the editor ships sketch code to the preview sandbox over `postMessage`; pressing Play too early means the code never arrives and no canvas renders. A short settle wait before Play fixes it (this is what your original `waitForTimeout(10000)` was hacking around).
- p5 marks the canvas `data-hidden="true"` during setup, so the test waits for `attached` (not `visible`) and forces the click — otherwise the strict visibility wait would mask the real signal.

**Result (stable across parallel and serial runs): 18 pass, 4 fail** — and the 4 failures are *real bugs in the examples*, which is exactly the point:

| Sketch | Error |
|---|---|
| 002-Amplitude-VisualizingLoudness | `loadSound is not defined`, `sound is not defined`, `...reading 'pixels'` |
| 004-OscillatorAmplitudeLFOmodulation | `Failed to execute 'connect' on 'AudioNode': Overload resolution failed.` |
| 006-DelayTime-Envelope_b | same `AudioNode connect` error |
| 010-PitchShifterOnSampleEnded | `loadSound is not defined` |

The `connect`/`loadSound` failures look like they could be genuine p5.sound API regressions worth investigating separately.

Two notes:
- This test suite is **Chromium-only** (`test.skip` on other browsers) because the mic/camera permissions and autoplay flag are Chromium-specific. Run with `npx playwright test test-examples-on-web-editor --project=chromium`.
