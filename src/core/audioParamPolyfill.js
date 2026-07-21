/**
 * Polyfill for AudioParam.cancelAndHoldAtTime().
 *
 * Firefox does not implement it (Bugzilla #1308431, open since 2016).
 * Chrome, Edge, and Safari have native implementations, so this is a
 * no-op there — the typeof guard means we never clobber a native method.
 *
 * Approximation note: this holds the param at its value as of *call*
 * time, not at cancelTime. That is exact for Tone.js's actual usage
 * (Envelope.triggerRelease and Param.rampTo pass "now") but wrong for
 * a cancel scheduled in the future during an active ramp. Documented
 * limitation — do not "fix" by removing, fix by computing the ramp
 * value at cancelTime if that case ever matters.
 *
 * Patching AudioParam.prototype covers params from AudioContext and
 * OfflineAudioContext alike — they share the prototype.
 *
 * This module is side-effect-only. It must execute before any
 * AudioNode is constructed.
 */
if (
  typeof AudioParam !== "undefined" &&
  typeof AudioParam.prototype.cancelAndHoldAtTime !== "function"
) {
  AudioParam.prototype.cancelAndHoldAtTime = function (cancelTime) {
    const heldValue = this.value;
    this.cancelScheduledValues(cancelTime);
    this.setValueAtTime(heldValue, cancelTime);
    return this; // spec: returns the AudioParam, allows chaining
  };
}