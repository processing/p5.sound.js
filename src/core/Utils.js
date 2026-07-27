/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { polyfillAudioListener } from "./audioListenerPolyfill.js";
import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

let audioContext = null;

/**
   * A private function used to constrain values to a range and prevent boundary violations. 
   * @private
   * @function clamp
*/
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 *  Get the window's audio context. For patching p5.sound.js into other JavaScript sound libraries. 
 *  @function getAudioContext
 *  @return {AudioContext} the audio context
 *  @example
 *  <div>
 *  <code>
 *  let synth, ctx
 *  
 *  function setup() {
 *    createCanvas(400, 400);
 *    //get the p5.sound.js Audio Context
 *    ctx = getAudioContext()
 *    //set the Tone.js Audio Context to match the p5.sound.js context
 *    Tone.setContext(ctx)
 *    //create a new MembraneSynth from the Tone.js library
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
    if (!audioContext) {
        audioContext = ToneGetContext().rawContext;
        //polyfillAudioListener(audioContext);
        //ToneSetContext(audioContext);
    }
    return audioContext;
}

/**
 *  Sets the AudioContext to a specified context to enable cross library compatibility.
 *  @function setAudioContext
 *  @param {AudioContext} the desired AudioContext.
 *  @example
 *  <div>
 *  <code>
 *  let synth, ctx
 *  
 *  function setup() {
 *    createCanvas(400, 400);
 *    //get the p5.sound.js Audio Context
 *    ctx = getAudioContext()
 *    //set the Tone.js Audio Context to match the p5.sound.js context
 *    Tone.setContext(ctx)
 *    //create a new MembraneSynth from the Tone.js library
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
function setAudioContext(context) {
    audioContext = context;
    polyfillAudioListener(audioContext);
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
    ToneStart();
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
    const context = audioContext || ToneGetContext();
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
