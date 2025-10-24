/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { p5soundSource } from "../core/p5soundSource.js";
import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { gainToDb as ToneGainToDb } from "tone/build/esm/core/type/Conversions.js";
import { Oscillator as ToneOscillator } from "tone/build/esm/source/oscillator/Oscillator.js";
import { clamp } from "../Utils";

/** 
 * Generate Sine, Triangle, Square and Sawtooth waveforms.
 * @class Oscillator
 * @constructor
 * @extends p5soundSource
 * @param {Number} [frequency] frequency defaults to 440Hz
 * @param {String} [type] type of oscillator. Options:
 *                        'sine' (default), 'triangle',
 *                        'sawtooth', 'square'
 * @example
 * <div>
 * <code>
 * let osc, playing, freq, amp;
 *
 * function setup() {
 *   describe("a sketch that demonstrates the frequency and amplitude parameters of an oscillator.");
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playOscillator);
 *   osc = new p5.Oscillator();
 * }
 *
 * function draw() {
 *   background(220)
 *   freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
 *   //amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
 *   text('tap to play', 20, 20);
 *   text('freq: ' + freq, 20, 40);
 *   //text('amp: ' + amp, 20, 60);
 *
 *   if (playing) {
 *     // smooth the transitions by 0.1 seconds
 *     osc.freq(freq);
 *     //osc.amp(amp);
 *   }
 * }
 *
 * function playOscillator() {
 *   // starting an oscillator on a user gesture will enable audio
 *   // in browsers that have a strict autoplay policy.
 *   osc.start();
 *   playing = true;
 * }
 *
 * function mouseReleased() {
 *   // ramp amplitude to 0 over 0.5 seconds
 *   //osc.amp(0, 0.5);
 *   playing = false;
 * }
 * </code> 
 * </div>
 */
class Oscillator extends p5soundSource {
  constructor(frequency = 440, type = "sine") {
    super();
    if (typeof frequency === "string" && typeof type === "string") {
      let f = frequency;
      frequency = 440;
      type = f;
    }
    if (typeof frequency === "string" && typeof type === "number") {
      let t = type;
      let f = frequency;
      type = f;
      frequency = t;
    }
    
    this.frequency = frequency;
    this.type = type;
    this.node = new ToneOscillator().toDestination;
    this.node.frequency.value = this.frequency;
    this.node.type = this.type;
    this.node.volume.value = -6;
  }

  /**
   * Adjusts the frequency of the oscillator.
   * @method freq
   * @for Oscillator
   * @param {Number} frequency frequency of the oscillator in Hz (cycles per second).
   * @param {Number} [rampTime] the time in seconds it takes to ramp to the new frequency (defaults to 0). 
   */
  freq(f, p = 0) {
    this.node.frequency.rampTo(clamp(f, 0, 24000), p);
  }

  /**
   * Adjusts the phase of the oscillator.
   * @method phase
   * @for Oscillator
   * @param {Number} phase phase of the oscillator in degrees (0-360). 
   */
  phase(p) {
    this.node.phase = p;
  }

  /**
   * Sets the type of the oscillator. 
   * @method setType
   * @for Oscillator
   * @param {String} type type of the oscillator. Options:
   *                 'sine' (default), 'triangle',
   *                 'sawtooth', 'square'
   */
  setType(t) {
    this.node.type = t;
  }
}

/**
 * Creates a sawtooth oscillator.
 * @class SawOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class SawOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "sawtooth";
  }
}

/**
 * Creates a square oscillator.
 * @class SqrOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class SqrOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "square";
  }
}

/**
 * Creates a triangle oscillator.
 * @class TriOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class TriOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "triangle"
  }
}

/**
 * Creates a sine oscillator.
 * @class SinOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class SinOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};