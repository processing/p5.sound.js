/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Oscillator as ToneOscillator } from "tone/build/esm/source/oscillator/Oscillator.js";
import { clamp } from "../../../Utils";
import { P5SoundParameter } from "../P5SoundParameter.js";
import { P5SoundSourceNode } from "../P5SoundSourceNode.js";

/** 
 * Generate Sine, Triangle, Square and Sawtooth waveforms.
 * @class P5SoundOscillator
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
 *   describe("a sketch that demonstrates the frequency and amplitude parameters of an oscillator.");
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playOscillator);
 *   osc = new p5.P5SoundOscillator();
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
export class P5SoundOscillator extends P5SoundSourceNode
{
  constructor(frequency = 440, type = "sine", detune = 0)
  {
    super();

    // If only the type is entered?
    if (typeof frequency === "string" && typeof type === "string")
    {
      let f = frequency;
      frequency = 440;
      type = f;
    }

    // If the type and frequency are reversed?
    if (typeof frequency === "string" && typeof type === "number")
    {
      let t = type;
      let f = frequency;
      type = f;
      frequency = t;
    }

    this._oscillatorNode = new ToneOscillator();

    this._frequency = new P5SoundParameter(this._oscillatorNode.frequency, frequency);
    this._detune = new P5SoundParameter(this._oscillatorNode.detune, detune);
    this._type = type;
    this.gain = 0.5;

    this._oscillatorNode.type = this._type;

    this.configureOutput(this._oscillatorNode);
  }

  isP5SoundOscillator = true;

  get frequency() { return this._frequency; }
  /**
   * Adjusts the frequency of the oscillator.
   * @method frequency
   * @for P5SoundOscillator
   * @param {Number} value frequency of the oscillator in Hz (cycles per second).
   */
  set frequency(value)
  {
    this._frequency.rampTo
    (
        clamp(value, 0, 24000), 0
    );
  }

  /**
   * Adjusts the phase of the oscillator.
   * @method phase
   * @for P5SoundOscillator
   * @param {Number} phase phase of the oscillator in degrees (0-360). 
   */
  phase(phase)
  {
    this._oscillatorNode.phase = phase;
  }

  get detune() { return this._detune; }
  set detune(value) { this._detune.value = value; }

  get type() { return this._type; }
  /**
   * Sets the type of the oscillator. 
   * @method setType
   * @for P5SoundOscillator
   * @param {String} type type of the oscillator. Options:
   *                 'sine' (default), 'triangle',
   *                 'sawtooth', 'square'
   */
  set type(value)
  {
    this._type = type;
    this._oscillatorNode.type = type;
  }

  /**
   * Starts the oscillator. Usually from user gesture.
   * @method start
   * @for P5SoundOscillator
   * @example
   * <div>
   * <code>
   * let osc;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startOscillator);
   *   osc = new p5.P5SoundOscillator();
   * }
   * 
   * function startOscillator() {
   *   osc.start();
   * }
   * </code>
   * </div>
   */
  start()
  {
    this._oscillatorNode.start();
  }

  /**
   * Stops the oscillator.
   * @method stop
   * @for P5SoundOscillator
   */
  stop()
  {
    this._oscillatorNode.stop();
  }
}

/**
 * Creates a sawtooth oscillator.
 * @class P5SoundSawOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundSawOsc extends P5SoundOscillator
{
  constructor(frequency)
  {
    super(frequency);
    this._oscillatorNode.type = "sawtooth";
  }
}

/**
 * Creates a square oscillator.
 * @class P5SoundSqrOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundSqrOsc extends P5SoundOscillator
{
  constructor(frequency)
  {
    super(frequency);
    this._oscillatorNode.type = "square";
  }
}

/**
 * Creates a triangle oscillator.
 * @class P5SoundTriOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundTriOsc extends P5SoundOscillator
{
  constructor(frequency)
  {
    super(frequency);
    this._oscillatorNode.type = "triangle"
  }
}

/**
 * Creates a sine oscillator.
 * @class P5SoundSinOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundSinOsc extends P5SoundOscillator
{
  constructor(frequency)
  {
    super(frequency);
    this._oscillatorNode.type = "sine"
  }
}