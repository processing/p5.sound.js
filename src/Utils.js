import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getAudioContext() {
    context = ToneGetContext();
    return context;
}

function setAudioContext(context) {
    ToneSetContext(context);
}

function userStartAudio() {
    Tone.start();
}

function userStopAudio() {
    context = ToneGetContext();
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
