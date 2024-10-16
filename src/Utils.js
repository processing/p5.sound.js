/**
 *  @module Sound
 *  @submodule Sound Utilities
 *  @for sound
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
    let context = ToneGetContext();
    return context;
}

/**
 *  Sets the AudioContext to a specified context to enable cross library compatibility.
 *  @function setAudioContext
 *  @param {AudioContext} the desired AudioContext.
 */
function setAudioContext(context) {
    ToneSetContext(context);
}

/**
 *  userStartAudio() starts the AudioContext on a user gesture. It can be placed in a specific interaction function, such as mousePressed().
 *  @function userStartAudio
 */
function userStartAudio() {
    ToneStart();
}

/**
 *  userStopAudio() stops the AudioContext on a user gesture.
 *  @function userStopAudio
 */
function userStopAudio() {
    context = ToneGetContext();
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
