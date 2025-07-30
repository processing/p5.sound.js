/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { FeedbackDelay as ToneFeedbackDelay } from "tone/build/esm/effect/FeedbackDelay.js";
import { P5SoundParameter } from "../P5SoundParameter.js";
import { P5SoundMixEffectNode } from "../P5SoundMixEffectNode.js";

/**
 * A delay effect with parameters for feedback, and delay time.
 * @class P5SoundDelay
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
 *   osc = new p5.P5SoundOscillator('square');
 *   osc.amp(0.5);
 *   delay = new p5.P5SoundDelay(0.12, 0.7);
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
export class P5SoundDelay extends P5SoundMixEffectNode
{
  constructor(delayTime = 0.250, feedback = 0.2)
  {
    super();

    this._delayNode = new ToneFeedbackDelay();

    this._delayTime = new P5SoundParameter(this._delayNode.delayTime, delayTime);
    this._feedback = new P5SoundParameter(this._delayNode.feedback, feedback);

    this.configureMixIO(this._delayNode, this._delayNode);
  }

  /**
   * Set the delay time in seconds.
   * @method delayTime
   * @for P5SoundDelay
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
   *   osc = new p5.P5SoundOscillator('sawtooth');
   *   osc.amp(0.74);
   *   env = new p5.Envelope(0.01);
   *   delay = new p5.P5SoundDelay(0.12, 0.7);
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
  get delayTime() { return this._delayTime; }
  set delayTime(value) { this._delayTime.value = value; }

  get feedback() { return this._feedback; }
  /**
   * The amount of feedback in the delay line.
   * @method feedback
   * @for P5SoundDelay
   * @param {number} feedbackAmount A number between 0 and 0.99.
   */
  set feedback(feedbackAmount) { this._feedback.value = feedbackAmount; }
}