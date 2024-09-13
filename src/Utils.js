import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getAudioContext() {
    let context = ToneGetContext();
    return context;
}

function setAudioContext(context) {
    ToneSetContext(context);
}

function userStartAudio() {
    ToneStart();
}

function userStopAudio() {
    context = ToneGetContext();
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
