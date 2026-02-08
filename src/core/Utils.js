/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

let audioContext = null;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 *  Get the window's audio context.
 *  @function getAudioContext
 *  @return {AudioContext} the audio context
 */
function getAudioContext() {
    if (!audioContext) {
        audioContext = new window.AudioContext();
        ToneSetContext(audioContext);
    }
    return audioContext;
}

/**
 *  Sets the AudioContext to a specified context to enable cross library compatibility.
 *  @function setAudioContext
 *  @param {AudioContext} the desired AudioContext.
 */
function setAudioContext(context) {
    audioContext = context;
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
    const context = audioContext || ToneGetContext();
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
