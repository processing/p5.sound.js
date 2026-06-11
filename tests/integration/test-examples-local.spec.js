//@ts-check
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { test, expect, BROWSER_SETUP } from "./lib/browser-setup.js";

/**
 * Smoke-tests every example under ../../examples/ by serving it locally and
 * checking that running it produces no console errors or uncaught exceptions.
 *
 * This is the local-source counterpart to test-examples-on-web-editor.spec.js.
 * The web-editor suite tests what users see on editor.p5js.org; this one tests
 * the examples as they live in the repo, running against the freshly built
 * dist/p5.sound.js (each example's index.html loads ../../dist/p5.sound.js).
 *
 * The two suites are intentionally kept separate and simple rather than sharing
 * a procedure: running locally there are NO iframes, no Play button, no
 * editor/sandbox settle race, no cookie banner and no Stop button, so this file
 * is much shorter than its web-editor sibling. The only shared code is the
 * per-browser audio/mic setup in ./lib/browser-setup.js.
 *
 * Serving: playwright.config.js starts an http-server at the repo root and the
 * local-* projects set baseURL to it, so we navigate to "examples/<name>/".
 *
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

/** How long to let the sketch run (and potentially throw) after the canvas appears. */
const SKETCH_RUN_MS = 3000;
/** Max time (ms) to wait for the canvas to be in attached state. */
const MAX_WAIT_FOR_ATTACHED_CANVAS_MS = 15_000;
/** Max time (ms) to wait for the canvas to become visible before clicking it. */
const MAX_WAIT_FOR_VISIBLE_CANVAS_MS = 5_000;
/** Max time (ms) for a single canvas click attempt. */
const CANVAS_CLICK_TIMEOUT_MS = 5_000;

/**
 * Absolute path to the examples directory. Playwright runs with the repo root
 * (the directory holding playwright.config.js) as the working directory.
 */
const EXAMPLES_DIR = path.resolve("examples");

/**
 * Every example directory that has an index.html, discovered at load time.
 * @type {string[]}
 */
const EXAMPLE_NAMES = readdirSync(EXAMPLES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => existsSync(path.join(EXAMPLES_DIR, name, "index.html")))
  .sort();

// A wide viewport, to match the web-editor suite.
test.use({ viewport: { width: 1400, height: 900 } });

for (const name of EXAMPLE_NAMES) {
  test(`${name} runs with no console errors`, async ({ page, browserName }) => {
    // Skip browsers we have no headless audio/mic setup for (see BROWSER_SETUP).
    test.skip(!BROWSER_SETUP[browserName], `No headless audio/mic setup for ${browserName}`);

    const errors = trackErrors(page);

    // Load the example.  baseURL (set by the local-* project) points at the http-server serving the repo root.
    await page.goto(`examples/${name}/`, { waitUntil: "load" });

    // The canvas is right on the page here (no iframes). We match it by p5's
    // "p5Canvas" class rather than #defaultCanvas0: p5 v2 numbers the default
    // canvas inconsistently when run locally (defaultCanvas1 for 2D sketches,
    // defaultCanvas0 for WEBGL ones?), but every example sketch seems to produce exactly one
    // p5Canvas. Wait for "attached" rather than "visible": p5 marks the canvas
    // data-hidden="true" while setup/preload runs. If it never attaches, the
    // sketch failed to start.
    const canvas = page.locator("canvas.p5Canvas");
    const canvasAttached = await canvas
      .waitFor({ state: "attached", timeout: MAX_WAIT_FOR_ATTACHED_CANVAS_MS })
      .then(() => true)
      .catch(() => false);

    if (!canvasAttached) {
      errors.push({ kind: "pageerror", text: "Sketch never rendered a canvas (page stayed empty)", url: page.url() });
    } else {
      await clickCanvasOnceVisible(page, canvas, errors);
      // Let the sketch run for a moment so runtime errors have a chance to surface.
      await page.waitForTimeout(SKETCH_RUN_MS);
    }

    expect(errors.length, formatErrors(name, errors)).toBe(0);
  });
}

/**
 * Attaches console + pageerror listeners and returns the live array they push
 * into. Records every console error and uncaught exception; healthy sketches
 * produce none.
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
 * Clicks inside the sketch canvas once it is visible, recording any problem into
 * `errors`. Many examples generate or modulate sound on click, so this exercises
 * that wiring. We do NOT force the click: if the canvas never becomes visible the
 * test is suspect, so we record an error rather than mask it.
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
 * The first line of an Error's message (drops the stack), for compact reporting.
 * @param {unknown} err
 * @returns {string}
 */
function firstLine(err) {
  return String(err instanceof Error ? err.message : err).split("\n")[0];
}

/**
 * Builds a readable assertion message listing every captured error.
 * @param {string} name
 * @param {CapturedError[]} errors
 * @returns {string}
 */
function formatErrors(name, errors) {
  if (errors.length === 0) return `No console errors for ${name}`;
  const lines = errors.map((e) => `  [${e.kind}] ${e.text} (at ${e.url})`);
  return `Console errors while running ${name}:\n${lines.join("\n")}`;
}
