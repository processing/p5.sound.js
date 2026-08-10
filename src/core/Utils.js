/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { hasAudioContext } from "tone/build/esm/core/context/AudioContext.js";
import { setContext as ToneSetContext, start as ToneStart } from "tone/build/esm/core/Global.js";
import "./polyfills/audioParamPolyfill.js";
import { polyfillAudioListener } from "./polyfills/audioListenerPolyfill.js";

/**
 * A private function used to constrain values to a range and prevent boundary violations.
 * @private
 * @function clamp
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * A private helper function that creates a vanilla AudioContext. The Firefox incompatibilities
 * are handled by the polyfills in ./polyfills/.
 * @private
 * @function createContext
 */
function createContext() {
    const globalContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new globalContext();
    polyfillAudioListener(ctx);
    return ctx;
}

/**
 * The context the p5.sound.js node graph is built on.
 *
 * Created as soon as the library loads (rather than lazily, on first
 * p5soundNode) so it always exists before a sketch runs
 * @private
 */
let context = hasAudioContext ? createContext() : null;
if (context) {
    ToneSetContext(context);
}

/**
 * A private helper that returns the context, in the unlikely case it wasn't
 * available yet when this module first loaded.
 * @private
 * @function ensureContext
 */
function ensureContext() {
    if (!context) {
        setAudioContext(createContext());
    }
    return context;
}

/**
 *  Get the window's audio context. For patching p5.sound.js into other JavaScript sound libraries.
 *
 *  Returns the AudioContext that p5.sound.js plays through and builds its node
 *  graph on directly, so ordinary Web Audio code such as
 *  `ctx.createGain().connect(ctx.destination)` works against it.
 *
 *  It is the browser's own AudioContext, which is what lets another audio
 *  library share it. Hand it to that library's own context setter before
 *  creating any of its objects — `Tone.setContext(getAudioContext())` for
 *  Tone.js — and nodes from both libraries can then be connected to each
 *  other.
 *  @function getAudioContext
 *  @return {AudioContext} the audio context
 *  @example
 *  <div>
 *  <code>
 *  let synth, rev
 *
 *  function setup() {
 *    createCanvas(400, 400);
 *    //hand p5.sound's context to Tone.js, loaded from its own script tag,
 *    //before making any Tone.js object
 *    Tone.setContext(getAudioContext());
 *    //create a new MembraneSynth with Tone.js
 *    synth = new Tone.MembraneSynth();
 *    //create a new p5.sound.js Reverb effect
 *    rev = new p5.Reverb(3)
 *    //connect the MembraneSynth to the Reverb
 *    rev.setInput(synth)
 *  }
 *
 *  function draw() {
 *    background(220);
 *  }
 *
 *  function mousePressed() {
 *    synth.triggerAttackRelease("C2", "8n");
 *  }
 *  </code>
 *  </div>
 */
function getAudioContext() {
    return ensureContext();
}

/**
 *  Sets the audio context to a specified context to enable cross library compatibility.
 *
 *  Accepts an AudioContext, an OfflineAudioContext, or a Tone.js Context.
 *  A raw AudioContext supplied here gets the same Firefox fixes
 *  @function setAudioContext
 *  @param {AudioContext|OfflineAudioContext|Context} context the desired audio context.
 *  @example
 *  <div>
 *  <code>
 *  let osc, ctx
 *
 *  function setup() {
 *    createCanvas(400, 400);
 *    //route p5.sound.js through an audio context the sketch owns
 *    ctx = new AudioContext();
 *    setAudioContext(ctx);
 *    //nodes created from here on play through that context
 *    osc = new p5.Oscillator();
 *  }
 *
 *  function draw() {
 *    background(220);
 *  }
 *
 *  function mousePressed() {
 *    osc.start();
 *  }
 *  </code>
 *  </div>
 */
function setAudioContext(ctx) {
    context = ctx;
    //Firefox fix
    polyfillAudioListener(ctx);
    ToneSetContext(ctx);
}

/**
 *  starts audio processing in the window when called from a user interaction (such as mousePressed()). Only necessary when not starting p5.sound nodes with the start() method.
 *  @function userStartAudio
 *  @example
 *  <div>
 *  <code>
 *  let started = false;
 *  
 *  function setup() {
 *    createCanvas(400, 400)
 *    sound = new p5.Oscillator();
 *    noiseSrc = new p5.Noise('pink');
 *    //"starts" sound sources though they will not be audible because they weren't started from a user interaction,
 *    noiseSrc.start();
 *    sound.start();
 *  }
 *  
 *  function draw() {
 *    background(220)
 *    text("click to start and stop audio with ge", width/2, height/2)
 *  }
 *  
 *  function mousePressed() {
 *    if (!started) {
 *      //resumes playback of all previously 'started' nodes
 *      userStartAudio();
 *      started = true;
 *    }
 *    else {
 *      //pauses audio processing, sort of like a global mute 
 *      userStopAudio();
 *      started = false;
 *    }
 *  }
 *  </code>
 *  </div>
 */
function userStartAudio() {
    return ToneStart();
}

/**
 *  stops audio processing in the browser window.
 *  @function userStopAudio
 *  @example
 *  <div>
 *  <code>
 *  let started = false;
 *  
 *  function setup() {
 *    createCanvas(400, 400)
 *    sound = new p5.Oscillator();
 *    noiseSrc = new p5.Noise('pink');
 *    //"starts" sound sources though they will not be audible because they weren't started from a user interaction,
 *    noiseSrc.start();
 *    sound.start();
 *  }
 *  
 *  function draw() {
 *    background(220)
 *    text("click to start and stop audio with ge", width/2, height/2)
 *  }
 *  
 *  function mousePressed() {
 *    if (!started) {
 *      //resumes playback of all previously 'started' nodes
 *      userStartAudio();
 *      started = true;
 *    }
 *    else {
 *      //pauses audio processing, sort of like a global mute 
 *      userStopAudio();
 *      started = false;
 *    }
 *  }
 *  </code>
 *  </div>
 */
function userStopAudio() {
    return ensureContext().suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
