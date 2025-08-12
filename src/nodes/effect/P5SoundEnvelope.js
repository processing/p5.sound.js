/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { AmplitudeEnvelope as ToneAmplitudeEnvelope } from "tone/build/esm/component/envelope/AmplitudeEnvelope.js";
import { P5SoundEffectNode } from "../core/P5SoundEffectNode.js";

/**
 * Generate an amplitude envelope.
 * @class P5SoundEnvelope
 * @constructor
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
export class P5SoundEnvelope extends P5SoundEffectNode
{
  constructor(attack = 0.1, decay = 0.12, sustain = 0.1, release = 0.2)
  {
    super();

    this._attack = attack;
    this._attackLevel = 1;
    this._decay = decay;
    this._sustain = sustain;
    this._release = release;

    this._toneAmplitudeEnvelopeNode = new ToneAmplitudeEnvelope
    (
      {
        attack: this._attack,
        decay: this._decay,
        sustain: this._sustain,
        release: this._release,
      }
    );

    this.configureInput(this._toneAmplitudeEnvelopeNode);
    this.configureOutput(this._toneAmplitudeEnvelopeNode);
  }

  isP5SoundEnvelope = true;

  /**
   * Trigger the envelope and release it after the sustain time.
   * @method play
   * @for P5SoundEnvelope
   */
  play()
  {
    this._toneAmplitudeEnvelopeNode.triggerAttackRelease(this.sustainTime);
  }

  /**
   * Trigger the Attack, and Decay portion of the P5SoundEnvelope. Similar to holding
   * down a key on a piano, but it will hold the sustain level until you let go.
   * @method triggerAttack
   * @for P5SoundEnvelope
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
   *   osc = new p5.P5SoundOscillator();
   *   osc.disconnect();
   *   env = new p5.P5SoundEnvelope();
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

  triggerAttack()
  {
    this._toneAmplitudeEnvelopeNode.triggerAttack();
  }
  /**
   * Trigger the Release of the envelope. Similar to releasing the key on 
   * a piano and letting the sound fade according to the release level and 
   * release time. 
   * @method triggerRelease
   * @for P5SoundEnvelope
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
   *   osc = new p5.P5SoundOscillator();
   *   osc.disconnect();
   *   env = new p5.P5SoundEnvelope();
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
  triggerRelease()
  {
    this._toneAmplitudeEnvelopeNode.triggerRelease();
  }

  /**
   * Sets the attack, decay, sustain, and release times of the envelope.
   * @method setADSR
   * @for P5SoundEnvelope
   * @param {Number} attack how quickly the envelope reaches the maximum level
   * @param {Number} decay how quickly the envelope reaches the sustain level
   * @param {Number} sustain how long the envelope stays at the decay level
   * @param {Number} release how quickly the envelope fades out after the sustain level
   */
  setADSR(attack, decay, sustain, release)
  {
    this.attackTime = attack;
    this.decayTime = decay;
    this.sustainTime = sustain;
    this.releaseTime = release;
  }

  get attackTime() { return this._toneAmplitudeEnvelopeNode.attack; }
  /**
   * Sets the attack time of the envelope.
   * @method attackTime
   * @for P5SoundEnvelope
   * @param {Number} value the attack time in seconds
   */
  set attackTime(value) { this._toneAmplitudeEnvelopeNode.attack = value; }

  get decayTime() { return this._toneAmplitudeEnvelopeNode.decay; }
  /**
   * Sets the decay time of the envelope.
   * @method decayTime
   * @for P5SoundEnvelope
   * @param {Number} value the decay time in seconds
   */
  set decayTime(value) { this._toneAmplitudeEnvelopeNode.decay = value; }

  get sustainTime() { return this._toneAmplitudeEnvelopeNode.sustain; }
  /**
   * Sets the sustain time of the envelope.
   * @method sustainTime
   * @for P5SoundEnvelope
   * @param {Number} value the sustain time in seconds
   */
  set sustainTime(value) { this._toneAmplitudeEnvelopeNode.sustain = value; }

  get releaseTime() { return this._toneAmplitudeEnvelopeNode.release; }
  /**
   * Sets the release time of the envelope.
   * @method attackTime
   * @for P5SoundEnvelope
   * @param {Number} value the release time in seconds
   */
  set releaseTime(value) { this._toneAmplitudeEnvelopeNode.release = value; }

}