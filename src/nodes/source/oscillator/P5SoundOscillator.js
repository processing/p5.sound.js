/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Oscillator as ToneOscillator } from "tone/build/esm/source/oscillator/Oscillator.js";
import { P5SoundUtils } from "../../../P5SoundUtils.js";
import { P5SoundParameter } from "../../../P5SoundParameter.js";
import { P5SoundStartableSourceNode } from "../../core/P5SoundStartableSourceNode.js";

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
export class P5SoundOscillator extends P5SoundStartableSourceNode
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

    this._toneOscillatorNode = new ToneOscillator();

    this._frequency = new P5SoundParameter(this._toneOscillatorNode.frequency, frequency);
    this._detune = new P5SoundParameter(this._toneOscillatorNode.detune, detune);
    this._type = type;
    this.gain = 0.5;

    this._toneOscillatorNode.type = this._type;

    this.configureStartableNode(this._toneOscillatorNode);
    this.configureOutput(this._toneOscillatorNode);
  }

  isP5SoundOscillator = true;

  get frequency()
  {
    return this._frequency;
  }

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
        P5SoundUtils.clamp(value, 0, 24000), 0
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
    this._toneOscillatorNode.phase = phase;
  }

  get detune()
  {
    return this._detune;
  }

  set detune(value)
  {
    this._detune.value = value;
  }

  get type()
  {
    return this._type;
  }

  /**
   * Sets the type of the oscillator.
   * @method setType
   * @for P5SoundOscillator
   * @param {String} type type of the oscillator. Options:
   *                 'sine' (default), 'triangle',
   *                 'sawtooth', 'square'
   */
  set type(type)
  {
    this._type = type;
    this._toneOscillatorNode.type = type;
  }
}