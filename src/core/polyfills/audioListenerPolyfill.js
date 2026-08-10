/**
 * Firefox does not implement the AudioParam-based AudioListener
 * properties (positionX/Y/Z, forwardX/Y/Z, upX/Y/Z) — only the
 * deprecated setPosition()/setOrientation() methods.
 *
 * We fake each property with a real AudioParam borrowed from a
 * ConstantSourceNode, then drive the deprecated setters from their
 * values once per animation frame.
 *
 * Limitation: listener movement becomes k-rate (updated per frame,
 * ~60Hz), not a-rate. Fine for perceptual listener movement; not
 * sample-accurate automation. Per-source Panner3D positioning is
 * unaffected (Firefox supports PannerNode params natively).
 */
const LISTENER_PARAMS = [
  ["positionX", 0], ["positionY", 0], ["positionZ", 0],
  ["forwardX", 0], ["forwardY", 0], ["forwardZ", -1],
  ["upX", 0], ["upY", 1], ["upZ", 0],
];

export function polyfillAudioListener(ctx) {
  const listener = ctx && ctx.listener;
  // Bail on anything that isn't a raw context with a bare listener: Chrome,
  // Edge and Safari already have the params, a second call finds the ones we
  // installed on the first, and a Tone Context handed to setAudioContext()
  // carries a Tone ListenerClass that has them too.
  if (!listener || listener.positionX) return;
  if (typeof ctx.createConstantSource !== "function") return;

  // Muted sink keeps the donor nodes in the processing graph —
  // params on unpulled nodes may not advance their automation.
  const sink = ctx.createGain();
  sink.gain.value = 0;
  sink.connect(ctx.destination);

  const params = {};
  for (const [name, defaultValue] of LISTENER_PARAMS) {
    const source = ctx.createConstantSource();
    source.offset.value = defaultValue;
    source.connect(sink);
    source.start();
    params[name] = source.offset;
    Object.defineProperty(listener, name, { value: source.offset });
  }

  let last = [];
  (function sync() {
    if (ctx.state === "closed") return;
    const v = LISTENER_PARAMS.map(([n]) => params[n].value);
    if (v.some((x, i) => x !== last[i])) {
      listener.setPosition(v[0], v[1], v[2]);
      listener.setOrientation(v[3], v[4], v[5], v[6], v[7], v[8]);
      last = v;
    }
    requestAnimationFrame(sync);
  })();
}