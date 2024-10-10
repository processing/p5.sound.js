/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { gainToDb as ToneGainToDb } from "tone/build/esm/core/type/Conversions.js";
import { FeedbackDelay as ToneFeedbackDelay } from "tone/build/esm/effect/FeedbackDelay.js";
import { clamp } from './Utils';

/**
 * A delay effect with parameters for feedback, and delay time.
 * @class p5.Delay
 * @constructor
 * @param {Number} [delayTime] The delay time in seconds between 0 and 1. Defaults to 0.250.
 * @param {Number} [feedback] The amount of feedback in the delay line between 0 and 1. Defaults to 0.2.
 * @example
 * <div>
 * <code>
 * let osc;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 * 
 *   osc = new p5.Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new p5.Delay(0.12, 0.7);
 *   
 *   osc.disconnect();
 *   osc.connect(delay);
 * 
 *   cnv.mousePressed(oscStart);
 *   describe('Tap to play a square wave with delay effect.');
 * }
 * 
 * function oscStart() {
 *   osc.start();
 * }
 * 
 * </code>
 * </div>
 * function mouseReleased() {
 *   osc.stop();
 * }
 */
class Delay {
  constructor(d = 0.250, f = 0.2)  {
    this.d = d;
    this.f = f;
    this.delay = new ToneFeedbackDelay(this.d, this.f).toDestination();
  }

  /**
   * Set the delay time in seconds.
   * @method delayTime
   * @for Delay
   * @param {Number} delayTime The delay time in seconds. 
   * @param {Number} [rampTime] The time in seconds it takes to ramp to the new delay time. 
   *                            By default it is 0.1 seconds. Setting it to 0 will change 
   *                            the delay time immediately and demonstrate legacy behavior.
   * @example
   * <div>
   * <code>
   * let osc, delay, env;
   *
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   textAlign(CENTER);
   *   textSize(9);
   *   text('click and drag mouse', width/2, height/2);
   * 
   *   osc = new p5.Oscillator('sawtooth');
   *   osc.amp(0.74);
   *   env = new p5.Envelope(0.01);
   *   delay = new p5.Delay(0.12, 0.7);
   *   
   *   osc.disconnect();
   *   osc.connect(env);
   *   env.disconnect();
   *   env.connect(delay);
   * 
   *   cnv.mousePressed(oscStart);
   *   cnv.mouseReleased(oscStop);
   *   cnv.mouseOut(oscStop);
   *   describe('Tap to play a square wave with delay effect.');
   * }
   * 
   * function oscStart() {
   *   background(0, 255, 255);
   *   text('release to hear delay', width/2, height/2);
   *   osc.start();
   *   env.triggerAttack();
   * }
   * 
   * function oscStop() {
   *   background(220);
   *   text('click and drag mouse', width/2, height/2);
   *   env.triggerRelease();
   * } 
   *   
   * function draw() {
   *   
   *   let dtime = map(mouseX, 0, width, 0.1, 0.5);
   *   delay.delayTime(dtime);
   * }
   */
  delayTime(value, rampTime = 0.1) {
    //legacy behavior
    if (rampTime == 0) {
      this.delay.delayTime.value = clamp(value, 0, 1);
      return;
    }
    //new tape emulation behavior
    this.delay.delayTime.rampTo(clamp(value, 0, 1), rampTime);
  }

  /**
   * The amount of feedback in the delay line.
   * @method feedback
   * @for Delay
   * @param {number} feedbackAmount A number between 0 and 0.99.
   */
  feedback(value) {
    this.delay.feedback.rampTo(clamp(value, 0, 0.99), 0.1);
  }

  /**
   * Process an input signal with a delay effect.
   * @method process
   * @for Delay
   * @param {Object} unit A p5.sound source such as an Oscillator, Soundfile, or AudioIn object. 
   * @param {Number} delayTime The amount of delay in seconds. A number between 0 and 1.
   * @param {Number} feedback The amount of feedback. A number between 0 and 1.
   */
  process(input, delayTime, feedback) { 
    this.delay.delayTime.value = delayTime;
    this.delay.feedback.value = feedback;
    input.getNode().connect(this.delay);
  }

  /**
   * Adjust the amplitude of the delay effect.
   * @method amp
   * @for Delay
   * @param {Number} amplitudeAmount An amplitude value between 0 and 1.
   */
  amp(value) {
    let dbValue = ToneGainToDb(value);
    this.delay.volume.rampTo(dbValue, 0.1);
  }

  getNode() {
    return this.delay;
  }

  connect(destination) {
    this.delay.connect(destination.getNode());
  }

  disconnect() {
    this.delay.disconnect(ToneContext.destination);
  }
}

export default Delay;