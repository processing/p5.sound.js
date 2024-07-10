import * as Tone from "tone";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getAudioContext() {
    context = Tone.getContext();
    return context;
}

function setAudioContext(context) {
    Tone.setContext(context);
}

function userStartAudio() {
    Tone.start();
}

function userStopAudio() {
    context = Tone.getContext();
    console.log(context);
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
