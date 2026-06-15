//@ts-check
import { test, expect, BROWSER_SETUP } from "./lib/browser-setup.js";

/**
 * Smoke-tests every sketch in the p5.sound examples collection on the p5 web
 * editor, asserting that running each one produces no console errors or uncaught
 * exceptions.
 *
 * The sketch list below was extracted once (on 2026-05-30) from the collection:
 *   https://editor.p5js.org/thomasjohnmartinez/collections/Dp0zGclVL
 * The test runs against this literal list rather than re-scraping the collection
 * at runtime, so it is deterministic and doesn't depend on the collection page's
 * markup. Re-extract and update SKETCHES when the collection changes.
 *
 * Assumptions: 
 *   * all examples will render a canvas (it will be clicked)
 *   * no example needs browser permissions beyond camera and microphone
 * 
 * Notes on driving the editor reliably:
 * - The preview runs in a cross-origin sandbox (preview.p5js.org). The editor
 *   ships the sketch code to that sandbox over postMessage; if we press Play
 *   before that channel is established the code never arrives and no canvas ever
 *   renders. We therefore wait for the editor to settle before pressing Play
 *   (see SETTLE_BEFORE_PLAY_MS).
 * - The canvas ends up two iframes deep: iframe[title="sketch preview"] (the
 *   preview.p5js.org frame) → a blob: child iframe → #defaultCanvas0.
 */

/**
 * @typedef {import("@playwright/test").Page} Page
 * @typedef {import("@playwright/test").Locator} Locator
 * @typedef {import("@playwright/test").ConsoleMessage} ConsoleMessage
 */

/**
 * A single captured problem (console error or uncaught page exception).
 * @typedef {Object} CapturedError
 * @property {"console" | "pageerror"} kind
 * @property {string} text
 * @property {string} url The page URL at the time the problem was captured.
 */

/**
 * One sketch in the collection.
 * @typedef {Object} Sketch
 * @property {string} name Human-readable name, used as the test title.
 * @property {string} url Direct URL to the sketch on the p5 web editor.
 */

/** @type {Sketch[]} */
const SKETCHES = [
  { name: "001-Oscillator-FrequencyAmplitude", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/z-KkeTrcu" },
  { name: "002-Amplitude-VisualizingLoudness", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/Wlcnc6WCD" },
  { name: "003-Microphone-Effects", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/5NV6gUkWM" },
  { name: "004-OscillatorAmplitudeLFOmodulation", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/9bsyBm86Q" },
  { name: "005-Oscillator-Reverb", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/eMQrmFczQ" },
  { name: "006-DelayTime-Envelope", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/Dk95S298f" },
  { name: "006-DelayTime-Envelope_b", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/2ay47nReh" },
  { name: "006-EnvelopeAndfilter", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/buaI5fkJC" },
  { name: "007-Envelope-Attack-Release", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/jx8TmJAST" },
  { name: "008-FFT-WaveForm-Visualize", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/GKLghF22G" },
  { name: "008_b-FFT-WaveForm-VisualizeSoundFile", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/dQFLbAwch" },
  { name: "009-NoiseTypes", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/KSE9hEBCu" },
  { name: "010-PitchShifterOnSampleEnded", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/kq0zqgdmL" },
  { name: "011-ReverbDecayTime", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/6tyyCCbEg" },
  { name: "012-SoundFileSetPath", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/eQQsm5apX" },
  { name: "013-MultiSamplePlaybackWithAmplitudeAnalysis", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/lYJ5w-tbL" },
  { name: "014-3DSoundSource", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/vEvHsr3c-" },
  { name: "015-SoundFile3DScale", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/hvhRcqrqi" },
  { name: "016-String-Synthesis", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/1erR4NUQd" },
  { name: "016-String-Synthesis_b", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/n_owBAPTN" },
  { name: "018-Oscillator-Delay", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/aGXHwoPVm" },
  { name: "p5-to-tone", url: "https://editor.p5js.org/thomasjohnmartinez/sketches/W0_fe403s" },
];

/**
 * How long to let the editor settle after load before pressing Play, so the
 * editor↔preview-sandbox postMessage channel is established first.
 */
const SETTLE_BEFORE_PLAY_MS = 3000;

/** How long to let the sketch run (and potentially throw) after the canvas appears. */
const SKETCH_RUN_MS = 3000;

/** Max time (ms) to wait for the play button to become visible. */
const MAX_WAIT_FOR_PLAY_BUTTON_VISIBLE_MS = 15_000;
/** Max time (ms) to wait for the canvas to be in attached state. */
const MAX_WAIT_FOR_ATTACHED_CANVAS = 20_000;
/** Max time (ms) to wait for the canvas to become visible before clicking it. */
const MAX_WAIT_FOR_VISIBLE_CANVAS_MS = 5_000;
/** Max time (ms) for a single canvas click attempt. */
const CANVAS_CLICK_TIMEOUT_MS = 5_000;

// The important overridden `test` function (with per-browser audio/mic setup), `expect`, and 
// BROWSER_SETUP come from ./lib/browser-setup.js — the only code shared with the local-examples
// suite. BROWSER_SETUP is also used below to skip browsers we have no setup for.

// Test setup for ALL browser types.
// A wide viewport keeps the editor's preview pane from collapsing
test.use({ viewport: { width: 1400, height: 900 } });

//Note: This for loop doesn't RUN the tests, rather it DECLARES them.
// In this way, for example, the developer can later decide in the UI test runner which tests to run and against which browser.
for (const sketch of SKETCHES) {
  
  // Declare one test for the sketch in question.  
  // The test has a title and a function which will be called if the test is run.
  // Here we use our MODIFIED test() function which will automatically set up the 
  // browser launchOptions and permissions.
  test(`${sketch.name} runs with no console errors`, async ({ page, browserName }) => {
    // Skip browsers we have no headless audio/mic setup for (see BROWSER_SETUP).
    test.skip(!BROWSER_SETUP[browserName], `No headless audio/mic setup for ${browserName}`);

    //the collection which will store any console errors encountered
    const errors = trackErrors(page);
    
    //Visit the sketch in the editor
    await page.goto(sketch.url, { waitUntil: "domcontentloaded" });
    
    await dismissCookieBannerIfPresent(page);

    // Pressing play...
    // The web editor's play button appears before the code has been sent to the iframe, and
    // pressing it too early will do nothing (no canvas and no helpful "too early" error)
    // So for now we wait giving time for the iframe setup to be done.  This is brittle (and slows the tests).
    // Better would be if the web editor disabled the button until it was ready for use.
    // (see SETTLE_BEFORE_PLAY_MS).
    await page.locator("#play-sketch").waitFor({ state: "visible", timeout: MAX_WAIT_FOR_PLAY_BUTTON_VISIBLE_MS });
    await page.waitForTimeout(SETTLE_BEFORE_PLAY_MS);
    await page.locator("#play-sketch").click();

    // Wait for the sketch's canvas to be created. We wait for "attached" rather
    // than "visible": p5 marks the canvas data-hidden="true" while setup/preload
    // runs, so requiring strict visibility here would time out before we get to
    // the real check (console errors). If the canvas never attaches the sketch
    // failed to start — fail now, but include any console error already captured
    // (often the cause, e.g. a throw in setup() that aborted before createCanvas).
    const canvas = getSketchCanvas(page);
    const canvasAttached = await canvas
      .waitFor({ state: "attached", timeout: MAX_WAIT_FOR_ATTACHED_CANVAS })
      .then(() => true)
      .catch(() => false);
    if (!canvasAttached) {
      errors.push({ kind: "pageerror", text: "Sketch never rendered a canvas (preview stayed empty)", url: page.url() });
    } else {      
      await clickCanvasOnceVisible(page, canvas, errors);
  
      // Let the sketch run for a moment so runtime errors have a chance to surface.
      await page.waitForTimeout(SKETCH_RUN_MS);
  
      // Should silence a noisy sketch that's being individually tested (and expose errors during resource release)
      await stopSketch(page);
    }
    // In all cases, if we encountered errors in the console (and/or the canvas didn't attach) then 
    // the test should fail and report them.
    expect(errors.length, formatErrors(sketch, errors)).toBe(0);
  });
}

/**
 * Attaches console + pageerror listeners and returns the live array they push
 * into. We record *every* console error and uncaught exceptionObserved healthy 
 * sketches produce no console errors at all.
 * @param {Page} page
 * @returns {CapturedError[]}
 */
function trackErrors(page) {
  /** @type {CapturedError[]} */
  const errors = [];

  page.on("console", (/** @type {ConsoleMessage} */ msg) => {
    if (msg.type() !== "error") return;
    errors.push({ kind: "console", text: msg.text(), url: page.url() });
  });

  page.on("pageerror", (/** @type {Error} */ err) => {
    errors.push({ kind: "pageerror", text: err.message, url: page.url() });
  });

  return errors;
}

/**
 * Dismisses the editor's cookie-consent banner if it is showing. The banner only
 * appears on the first visit per browser context, so its absence is fine.
 * @param {Page} page
 * @returns {Promise<void>}
 */
async function dismissCookieBannerIfPresent(page) {
  const allow = page.getByRole("button", { name: "Allow Essential" });
  if (await allow.isVisible().catch(() => false)) {
    await allow.click();
  }
}


/**
 * Clicks inside the sketch canvas once it is visible, recording any problem into
 * `errors`. Various examples generate or modulate sound on mouse clicks, so this
 * exercises that wiring and reveals basic bugs.
 *
 * We deliberately do NOT force the click: the canvas must actually become visible
 * for a real click to land. If it never does, the test is suspect (we may be
 * silently not exercising the sketch at all), so we record an error rather than
 * mask it.
 * @param {Page} page
 * @param {Locator} canvas Locator for the sketch's #defaultCanvas0.
 * @param {CapturedError[]} errors Sink for any failure encountered here.
 * @returns {Promise<void>}
 */
async function clickCanvasOnceVisible(page, canvas, errors) {
  const canvasVisible = await canvas
    .waitFor({ state: "visible", timeout: MAX_WAIT_FOR_VISIBLE_CANVAS_MS })
    .then(() => true)
    .catch(() => false);

  if (!canvasVisible) {
    errors.push({ kind: "pageerror", text: "Expected to click the canvas but it never became visible", url: page.url() });
    return;
  }

  try {
    await canvas.click({ timeout: CANVAS_CLICK_TIMEOUT_MS });
  } catch (e) {
    errors.push({ kind: "pageerror", text: `Canvas click failed: ${firstLine(e)}`, url: page.url() });
  }
}

/**
 * Presses the editor's stop button. Best-effort: stopping is just cleanup, so a
 * missing/disabled Stop button shouldn't fail the test (the error assertion is
 * the real check).
 * TODO: a failed stop button click should probably error.
 * @param {Page} page
 * @returns {Promise<void>}
 */
async function stopSketch(page) {
  await page.getByRole("button", { name: "Stop sketch" }).click({ timeout: 5_000 }).catch(() => {});
}

/**
 * Locates the running sketch's default p5 canvas. The preview is nested two
 * iframes deep: the outer iframe[title="sketch preview"] is the preview.p5js.org
 * frame, which embeds a blob: child iframe that finally holds our #defaultCanvas0.
 * @param {Page} page
 * @returns {Locator}
 */
function getSketchCanvas(page) {
  return page
    .locator('iframe[title="sketch preview"]')
    .contentFrame()
    .locator("iframe")
    .contentFrame()
    .locator("#defaultCanvas0");
}

/**
 * The first line of an Error's message (drops the stack), for compact reporting.
 * @param {unknown} err
 * @returns {string}
 */
function firstLine(err) {
  return String(err instanceof Error ? err.message : err).split("\n")[0];
}

/**
 * Builds a readable assertion message listing every captured error.
 * @param {Sketch} sketch
 * @param {CapturedError[]} errors
 * @returns {string}
 */
function formatErrors(sketch, errors) {
  if (errors.length === 0) return `No console errors for ${sketch.name}`;
  const lines = errors.map((e) => `  [${e.kind}] ${e.text} (at ${e.url})`);
  return `Console errors while running ${sketch.name}:\n${lines.join("\n")}`;
}
