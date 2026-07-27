/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

/**
   * A private function used to constrain values to a range and prevent boundary violations. 
   * @private
   * @function clamp
*/
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * A private accessor for the Tone.js Context that the p5.sound.js node graph
 * is built on. Its cross-browser compatibility fixes are what let p5.sound.js
 * behave the same in Chrome, Firefox and Safari without polyfills.
 *
 * This is deliberately not the same thing as getAudioContext(): nodes need the
 * Tone.js Context (its destination and listener are Tone.js objects), while
 * sketches need the plain AudioContext that Web Audio code expects.
 * @private
 * @function getToneContext
 */
function getToneContext() {
    return ToneGetContext();
}

/**
 *  Get the window's audio context. For patching p5.sound.js into other JavaScript sound libraries.
 *
 *  Returns the plain AudioContext that p5.sound.js plays through, so ordinary
 *  Web Audio code such as `ctx.createGain().connect(ctx.destination)` works
 *  against it.
 *
 *  To use Tone.js alongside p5.sound.js, reach for p5.Tone rather than sharing
 *  this context with a separately loaded copy of Tone.js. Two copies of Tone.js
 *  cannot share an audio graph no matter which context they are handed, because
 *  each bundles its own standardized-audio-context whose type checks reject the
 *  other's nodes.
 *  @function getAudioContext
 *  @return {AudioContext} the audio context
 *  @example
 *  <div>
 *  <code>
 *  let synth, rev
 *
 *  function setup() {
 *    createCanvas(400, 400);
 *    //create a new MembraneSynth using the Tone.js library bundled with p5.sound
 *    synth = new p5.Tone.MembraneSynth();
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
    return ToneGetContext().rawContext;
}

/**
 *  Sets the audio context to a specified context to enable cross library compatibility.
 *
 *  Accepts an AudioContext, an OfflineAudioContext, or a Tone.js Context.
 *  Plain contexts are wrapped in a Tone.js Context first, so every
 *  p5.sound.js node keeps its cross-browser compatibility fixes. Call this
 *  before creating any p5.sound.js node — nodes made earlier stay on the
 *  previous context.
 *  Note that a context supplied here loses the compatibility fixes p5.sound.js
 *  normally provides, so some features may behave differently between browsers.
 *  In Firefox, for example, an AudioContext made with `new AudioContext()` has
 *  no AudioListener parameters, which p5.Panner3D relies on.
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
function setAudioContext(context) {
    ToneSetContext(context);
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
    // Tone's Context has no suspend(); suspend the context it manages.
    return ToneGetContext().rawContext.suspend();
}

export { clamp, getAudioContext, getToneContext, setAudioContext, userStartAudio, userStopAudio };
