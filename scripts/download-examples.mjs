// Downloads every p5.sound example sketch from the p5 web editor into ./examples/,
// one folder per sketch (sketch source + assets, preserving the folder tree).
//
// It uses the editor's PUBLIC project JSON endpoint
//   https://editor.p5js.org/editor/<user>/projects/<id>
// rather than the editor's "File > Download" button — that button is gated behind
// being logged in (it silently no-ops otherwise). The JSON gives text files inline
// (`content`) and binary assets as `url`s, plus the folder tree via `children`.
//
// Usage:  node scripts/download-examples.mjs

import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

/** @typedef {{ name: string, url: string }} Sketch */

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

const EXAMPLES_DIR = new URL("../examples/", import.meta.url).pathname;

/**
 * Turns a sketch page URL into its project-JSON API URL.
 * https://editor.p5js.org/<user>/sketches/<id>  ->  https://editor.p5js.org/editor/<user>/projects/<id>
 * @param {string} sketchUrl
 * @returns {string}
 */
function apiUrlFor(sketchUrl) {
  const m = sketchUrl.match(/editor\.p5js\.org\/([^/]+)\/sketches\/([^/?#]+)/);
  if (!m) throw new Error(`Unrecognised sketch URL: ${sketchUrl}`);
  const [, user, id] = m;
  return `https://editor.p5js.org/editor/${user}/projects/${id}`;
}

/**
 * Walks the project's flat file list (linked by each node's `children` ids) and
 * yields every file with its full relative path. The root folder itself is
 * skipped (its children sit at the top level).
 * @param {any[]} files
 * @returns {{ path: string, file: any }[]}
 */
function flattenFiles(files) {
  const byId = new Map(files.map((f) => [f._id, f]));
  const root = files.find((f) => f.name === "root") ?? files.find((f) => f.fileType === "folder");
  /** @type {{ path: string, file: any }[]} */
  const out = [];
  /** @param {any} node @param {string} prefix */
  const walk = (node, prefix) => {
    for (const childId of node.children ?? []) {
      const child = byId.get(childId);
      if (!child) continue;
      const path = prefix ? `${prefix}/${child.name}` : child.name;
      if (child.fileType === "folder") walk(child, path);
      else out.push({ path, file: child });
    }
  };
  if (root) walk(root, "");
  return out;
}

/**
 * Fetches one sketch's project JSON and writes its files into destDir.
 * @param {Sketch} sketch
 * @param {string} destDir
 */
async function downloadSketch(sketch, destDir) {
  const res = await fetch(apiUrlFor(sketch.url));
  if (!res.ok) throw new Error(`project JSON ${res.status} for ${sketch.name}`);
  const project = await res.json();
  const entries = flattenFiles(project.files);

  let textCount = 0;
  let assetCount = 0;
  /** @type {string[]} Per-file problems (e.g. an asset whose URL 404s) — these
   * are real defects in the sketch, so we note them but keep the other files. */
  const fileErrors = [];
  for (const { path, file } of entries) {
    const dest = join(destDir, path);
    await mkdir(dirname(dest), { recursive: true });
    if (file.url) {
      try {
        const a = await fetch(file.url);
        if (!a.ok) throw new Error(`HTTP ${a.status}`);
        await writeFile(dest, Buffer.from(await a.arrayBuffer()));
        assetCount++;
      } catch (err) {
        fileErrors.push(`${path} (${err.message})`);
      }
    } else {
      await writeFile(dest, file.content ?? "");
      textCount++;
    }
  }
  return { textCount, assetCount, total: entries.length, fileErrors };
}

async function main() {
  const only = process.argv[2]; // optional: download just one sketch by name substring
  const list = only ? SKETCHES.filter((s) => s.name.includes(only)) : SKETCHES;
  if (only && list.length === 0) {
    console.error(`No sketch matches "${only}"`);
    process.exit(1);
  }

  console.log(`Downloading ${list.length} sketch(es) into ${EXAMPLES_DIR}\n`);
  let ok = 0;
  const failures = [];
  for (const sketch of list) {
    const destDir = join(EXAMPLES_DIR, sketch.name);
    try {
      await rm(destDir, { recursive: true, force: true }); // fresh each run
      const { textCount, assetCount, total, fileErrors } = await downloadSketch(sketch, destDir);
      const note = fileErrors.length ? `  ⚠ ${fileErrors.length} asset(s) unavailable: ${fileErrors.join("; ")}` : "";
      console.log(`✓ ${sketch.name}  (${total} files: ${textCount} text, ${assetCount} asset)${note}`);
      ok++;
    } catch (err) {
      console.log(`✗ ${sketch.name}  — ${err.message}`);
      failures.push(sketch.name);
    }
  }

  console.log(`\nDone: ${ok}/${list.length} ok.`);
  if (failures.length) {
    console.log(`Failed: ${failures.join(", ")}`);
    process.exit(1);
  }
}

await main();
