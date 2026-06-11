// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /*
   * Two example smoke suites, each run on the browsers we have headless
   * audio/mic setup for (chromium & firefox; webkit is not investigated):
   *
   *   web-*   -> test-examples-on-web-editor.spec.js
   *              tests the published examples collection on editor.p5js.org (what users see)
   *   local-* -> test-examples-local.spec.js
   *              tests the repo's examples/ against the freshly built dist/,
   *              served by the webServer below (deterministic, offline)
   *
   * `testMatch` binds each spec to its projects so the two never cross over.
   * The local-* projects set baseURL to the local http-server.
   */
  projects: [
    {
      name: 'web-chromium',
      testMatch: 'test-examples-on-web-editor.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'web-firefox',
      testMatch: 'test-examples-on-web-editor.spec.js',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'local-chromium',
      testMatch: 'test-examples-local.spec.js',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5050/' },
    },
    {
      name: 'local-firefox',
      testMatch: 'test-examples-local.spec.js',
      use: { ...devices['Desktop Firefox'], baseURL: 'http://localhost:5050/' },
    },

    //We haven't investigated setting up mic+camera permissions and auto-start of audio context on safari
    // webkit (Desktop Safari) is intentionally omitted.
  ],

  /*
   * Static server for the local-examples suite. Serves the repo root so that
   * each example's index.html and its ../../dist/p5.sound.js resolve. -c-1
   * disables caching so a fresh `npm run build` is always picked up.
   * Harmless (just idles) when only the web-* projects run.
   */
  webServer: {
    command: 'npx http-server . -p 5050 -c-1 --silent',
    url: 'http://localhost:5050/examples/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});

