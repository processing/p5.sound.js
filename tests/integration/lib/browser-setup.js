//@ts-check
import { test as testOriginal, expect } from "@playwright/test";

/**
 * Per-browser launch/context setup shared by BOTH example smoke suites
 * (the web-editor suite and the local-examples suite).
 *
 * This is the ONLY code shared between those two suites. It lives here on
 * purpose: the two test bodies are otherwise deliberately separate and simple,
 * but this block is identical, non-obvious, and hard to get right
 * (a wrong Firefox pref makes audio fail or the run audible without any error),
 * so we don't duplicate it.
 */

/**
 * The launch/context setup one browser needs to run audio + getUserMedia sketches
 * headlessly without prompts or gesture gating.
 * @typedef {Object} BrowserSetup
 * @property {string[]} permissions Context permissions to grant up front.
 * @property {import("@playwright/test").LaunchOptions} launchOptions
 */

/**
 * Configs for per-browser setup. The keys are the browsers the suites run on; a
 * browser not listed here (e.g. webkit) is skipped.
 * Each browser needs a different mechanism to:
 * (a) satisfy granting getUserMedia (camera & microphone access) without a prompt and
 * (b) let audio start without a user gesture.
 * @type {Record<string, BrowserSetup>}
 */
export const BROWSER_SETUP = {
  chromium: {
    // Grant mic/camera so getUserMedia() resolves without a native prompt.
    permissions: ["microphone", "camera"],
    // --autoplay-policy lets audio start without a user gesture.
    launchOptions: { args: ["--autoplay-policy=no-user-gesture-required"] },
  },
  firefox: {
    // Firefox rejects the "microphone"/"camera" permission names; instead we
    // feed a fake device and disable the prompt (see firefoxUserPrefs below).
    permissions: [],
    launchOptions: {
      firefoxUserPrefs: {
        // Fake media device + no prompt, in place of granting permissions.
        "media.navigator.streams.fake": true,
        "media.navigator.permission.disabled": true,
        // Allow autoplay (incl. WebAudio), in place of the autoplay launch flag.
        "media.autoplay.default": 0,
        "media.autoplay.blocking_policy": 0,
        "media.autoplay.block-webaudio": false,
        // Mute output: headless Firefox routes audio to the real device (unlike
        // headless Chromium's null sink), so the test run is otherwise audible.
        // Web Audio still runs, so errors still surface — we just silence it.
        "media.volume_scale": "0.0",
      },
    },
  },
};

/**
 * An overridden `test` function that automatically applies the current browser's setup:
 * - launchOptions is worker-scoped (the browser launches once per worker);
 * - permissions is a per-test context option.
 * Use this in place of the plain @playwright/test `test`. Browsers absent from
 * BROWSER_SETUP get empty defaults (callers should test.skip them).
 */
export const test = testOriginal.extend({
  launchOptions: [
    async ({ browserName, launchOptions }, use) => {
      await use({ ...launchOptions, ...(BROWSER_SETUP[browserName]?.launchOptions ?? {}) });
    },
    { scope: "worker" },
  ],
  permissions: async ({ browserName }, use) => {
    await use(BROWSER_SETUP[browserName]?.permissions ?? []);
  },
});

export { expect };
