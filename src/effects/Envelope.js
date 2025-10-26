/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { AmplitudeEnvelope as ToneAmplitudeEnvelope } from "tone/build/esm/component/envelope/AmplitudeEnvelope.js";
import { p5soundNode } from "../core/p5soundNode";

/**
 * Generate an amplitude envelope.
 * @class Envelope
 * @constructor
 * @extends p5soundNode
 * @param {Number} [attack] how quickly the envelope reaches the maximum level
 * @param {Number} [decay] how quickly the envelope reaches the sustain level
 * @param {Number} [sustain] how long the envelope stays at the decay level
 * @param {Number} [release] how quickly the envelope fades out after the sustain level
 * @example
 * <div>
 * <code>
 * console.log('do an example here');
 * </code>
 * </div>
 */
class Envelope extends p5soundSource {
  constructor(a = 0.1, d = 0.12, s = 0.1, r = 0.2) {
    super();
    this.attack = a;
    this.attackLevel = 1;
    this.decay = d;
    this.sustain = s;
    this.release = r;

    this.node = new ToneAmplitudeEnvelope({
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release,
    }).toDestination();
  }

  /**
   * Trigger the envelope and release it after the sustain time.
   * @method play
   * @for Envelope
   */
  play() {
    this.node.triggerAttackRelease(this.sustain);
  }

  /**
   * Trigger the Attack, and Decay portion of the Envelope. Similar to holding
   * down a key on a piano, but it will hold the sustain level until you let go.
   * @method triggerAttack
   * @for Envelope
   * @example
   * <div>
   * <code>
   * let osc, env;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   cnv.mousePressed(playSound);
   *   cnv.mouseReleased(stopSound);
   *   textAlign(CENTER);
   *   textSize(10);
   *   text('tap to triggerAttack', width/2, height/2);
   * 
   *   osc = new p5.Oscillator();
   *   osc.disconnect();
   *   env = new p5.Envelope();
   *   osc.connect(env);
   * }
   * 
   * function playSound() {
   *   background(0, 255, 255);
   *   text('release to release', width/2, height/2);
   *   osc.start();
   *   env.attackTime(random(0.00, 0.25));
   *   env.triggerAttack(0.5);
   * }
   * 
   * function stopSound() {
   *   background(220);
   *   text('tap to triggerAttack', width/2, height/2);
   *   env.releaseTime(random(0.1, 0.3));
   *   env.triggerRelease();
   * }
   * </code>
   * </div>
   */

  triggerAttack() {
    this.node.triggerAttack();
  }
  /**
   * Trigger the Release of the envelope. Similar to releasing the key on 
   * a piano and letting the sound fade according to the release level and 
   * release time. 
   * @method triggerRelease
   * @for Envelope
   * @example
   * <div>
   * <code>
   * let osc, env;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   cnv.mousePressed(playSound);
   *   cnv.mouseReleased(stopSound);
   *   textAlign(CENTER);
   *   textSize(10);
   *   text('tap to triggerAttack', width/2, height/2);
   * 
   *   osc = new p5.Oscillator();
   *   osc.disconnect();
   *   env = new p5.Envelope();
   *   osc.connect(env);
   * }
   * 
   * function playSound() {
   *   background(0, 255, 255);
   *   text('release to release', width/2, height/2);
   *   osc.start();
   *   env.attackTime(random(0.00, 0.25));
   *   env.triggerAttack(0.5);
   * }
   * 
   * function stopSound() {
   *   background(220);
   *   text('tap to triggerAttack', width/2, height/2);
   *   env.releaseTime(random(0.1, 0.3));
   *   env.triggerRelease();
   * }
   * </code>
   * </div>
   */
  triggerRelease() {
    this.node.triggerRelease();
  }

  /**
   * @method setInput
   * @for Envelope
   * @param {Object} unit A p5.sound Object 
   */
  setInput(input) {
    input.getNode().connect(this.node);
  }

  /**
   * Sets the attack, decay, sustain, and release times of the envelope.
   * @method setADSR
   * @for Envelope
   * @param {Number} attack how quickly the envelope reaches the maximum level
   * @param {Number} decay how quickly the envelope reaches the sustain level
   * @param {Number} sustain how long the envelope stays at the decay level
   * @param {Number} release how quickly the envelope fades out after the sustain level
   */
  setADSR(a, d, s, r) {
    this.node.attack = a;
    this.node.decay = d;
    this.node.sustain = s;
    this.node.release = r;
  }

  /**
   * Sets the release time of the envelope.
   * @method releaseTime
   * @for Envelope
   * @param {Number} releaseTime the release time in seconds 
   */
  releaseTime(value) {
    this.node.release = value;
  }

  /**
   * Sets the attack time of the envelope.
   * @method attackTime
   * @for Envelope
   * @param {Number} attackTime the attack time in seconds 
   */
  attackTime(value) {
    this.node.attack = value;
  }
}

export default Envelope;