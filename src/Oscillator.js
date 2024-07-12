import * as Tone from "tone";
import { clamp } from "./Utils";

/** 
 * Generate Sine, Triangle, Square and Sawtooth waveforms.
 * @class Oscillator
 * @constructor
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
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playOscillator);
 *   osc = new Oscillator();
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
class Oscillator {
  constructor(frequency = 440, type = "sine") {
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
    this.osc = new Tone.Oscillator().toDestination();
    this.osc.frequency.value = this.frequency;
    this.osc.type = this.type;
    this.osc.volume.value = -6;
  }

  /**
   * Adjusts the frequency of the oscillator.
   * @method freq
   * @for Oscillator
   * @param {Number} frequency frequency of the oscillator in Hz (cycles per second). 
   */
  freq(f) {
    this.osc.frequency.value = clamp(f, 0, 24000);
  }

  /**
   * Adjusts the phase of the oscillator.
   * @method phase
   * @for Oscillator
   * @param {Number} phase phase of the oscillator in degrees (0-360). 
   */
  phase(p) {
    this.osc.phase = p;
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
    this.osc.type = t;
  }

  /**
   * Adjust the amplitude of the Oscillator.
   * @method amp
   * @for Oscillator
   * @param {Number} amplitude Set the amplitude between 0 and 1.0. Or, pass in an object such as an oscillator to modulate amplitude with an audio signal.
   * @example
   * <div>
   * <code>
   * let osc, lfo;
   * let cnv;
   * 
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startSound);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   
   *   osc = new Oscillator('sine');
   *   lfo = new Oscillator(1);
   *   lfo.disconnect();
   *   osc.amp(lfo);
   * }
   * 
   * function startSound() {
   *   lfo.start();
   *   osc.start();
   * }
   * 
   * function draw(){
   *   background(220);
   *   text('click to play sound', 0, height/2 - 20, 100);
   *   text('control lfo with mouseX position', 0, height/2, 100);
   * 
   *   let freq = map(mouseX, 0, width, 0, 10);
   *   lfo.freq(freq);
   * }
   * </code>
   * </div>
   */
  amp(value) {
    //if value is an object (i.e. audio signal such as an LFO), connect it to the oscillator's volume
    if (typeof value === "object") {
      value.getNode().connect(this.osc.volume);
      return;
    }
    let dbValue = Tone.gainToDb(value);
    this.osc.volume.value = dbValue;
  }

  /**
   * Starts the oscillator. Usually from user gesture.
   * @method start
   * @for Oscillator
   * @example
   * <div>
   * <code>
   * let osc;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startOscillator);
   *   osc = new Oscillator();
   * }
   * 
   * function startOscillator() {
   *   osc.start();
   * }
   * </code>
   * </div>
   */
  start() {
    this.osc.start();
  }

  /**
   * Stops the oscillator.
   * @method stop
   * @for Oscillator
   */
  stop() {
    this.osc.stop();
  }

  connect(destination) {
    this.osc.connect(destination.getNode());
  }

  disconnect() {
    this.osc.disconnect(Tone.Context.destination);
  }

  getNode() {
    return this.osc;
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
    this.osc.type = "sawtooth";
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
    this.osc.type = "square";
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
    this.osc.type = "triangle"
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
    this.osc.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};