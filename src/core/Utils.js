/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 *  Get the window's audio context.
 *  @function getAudioContext
 *  @return {AudioContext} the audio context
 */
function getAudioContext() {
    // Return the AudioContext that Tone.js owns rather than creating our own.
    // Tone wraps its context with standardized-audio-context, which polyfills
    // the Web Audio gaps Firefox and Safari have.
    return ToneGetContext().rawContext;
}

/**
 *  Sets the AudioContext to a specified context to enable cross library compatibility.
 *  @function setAudioContext
 *  @param {AudioContext} the desired AudioContext.
 */
function setAudioContext(context) {
    // Hand the supplied context to Tone; getAudioContext() then reflects it.
    ToneSetContext(context);
}

/**
 *  starts audio processing in the window when called from a user interaction (such as mousePressed()). Only necessary when not starting p5.sound nodes with the start() method.
 *  @function userStartAudio
 */
function userStartAudio() {
    ToneStart();
}

/**
 *  stops audio processing in the browser window.
 *  @function userStopAudio
 */
function userStopAudio() {
    getAudioContext().suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
