/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { p5soundMixEffect } from "../core/p5soundMixEffect.js";
import { resolveInput } from "../core/p5soundNode.js";
import { Distortion as ToneDistortion } from "tone/build/esm/effect/Distortion.js";
import { clamp } from '../core/Utils.js';

/**
 * A distortion effect that uses a waveshaper to add harmonics to a sound.
 * Keeps the same methods as p5.Distortion in the original p5.sound library
 * (process, set, getAmount, getOversample) so older sketches keep working.
 * @class Distortion
 * @constructor
 * @extends p5soundMixEffect
 * @param {Number} [amount] Unbounded distortion amount, normal values range from 0-1. Defaults to 0.25.
 * @param {String} [oversample] 'none', '2x' (default), or '4x'.
 * @example
 * <div>
 * <code>
 * let osc, distortion;
 *
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 *
 *   osc = new p5.Oscillator('sine');
 *   osc.amp(0.5);
 *   distortion = new p5.Distortion(0.8);
 *
 *   osc.disconnect();
 *   osc.connect(distortion);
 *
 *   cnv.mousePressed(oscStart);
 *   cnv.mouseReleased(oscStop);
 *   describe('Tap to play a sine wave with a distortion effect.');
 * }
 *
 * function oscStart() {
 *   osc.start();
 * }
 *
 * function oscStop() {
 *   osc.stop();
 * }
 * </code>
 * </div>
 */
class Distortion extends p5soundMixEffect {
  constructor(amount = 0.25, oversample = '2x') {
    super();
    if (typeof amount !== 'number') {
      throw new Error('amount must be a number');
    }
    if (typeof oversample !== 'string') {
      throw new Error('oversample must be a String');
    }
    this.node = new ToneDistortion(clamp(amount, 0, 1));
    this.node.oversample = oversample;
    this.input.connect(resolveInput(this.node));
    this.node.connect(this.output);
  }

  /**
   * Process a sound source, optionally specify amount and oversample values.
   * @method process
   * @for Distortion
   * @param {Object} unit A p5.sound source such as an Oscillator, Soundfile, or AudioIn object.
   * @param {Number} [amount] Unbounded distortion amount, normal values range from 0-1.
   * @param {String} [oversample] 'none', '2x', or '4x'.
   */
  process(input, amount, oversample) {
    this.set(amount, oversample);
    this.setInput(input);
  }

  /**
   * Set the amount and oversample of the waveshaper distortion.
   * @method set
   * @for Distortion
   * @param {Number} [amount] Unbounded distortion amount, normal values range from 0-1.
   * @param {String} [oversample] 'none', '2x', or '4x'.
   */
  set(amount, oversample) {
    if (typeof amount === 'number') {
      this.node.distortion = clamp(amount, 0, 1);
    }
    if (oversample) {
      this.node.oversample = oversample;
    }
  }

  /**
   * Return the distortion amount, typically between 0-1.
   * @method getAmount
   * @for Distortion
   * @return {Number} Unbounded distortion amount, normal values range from 0-1.
   */
  getAmount() {
    return this.node.distortion;
  }

  /**
   * Return the oversampling.
   * @method getOversample
   * @for Distortion
   * @return {String} Oversample can either be 'none', '2x', or '4x'.
   */
  getOversample() {
    return this.node.oversample;
  }
}

export default Distortion;
