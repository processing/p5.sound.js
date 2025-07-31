/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { BiquadFilter as ToneBiquadFilter} from "tone/build/esm/component/filter/BiquadFilter.js";
import { P5SoundEffectNode } from "../../core/P5SoundEffectNode.js";
import { P5SoundParameter } from "../../../P5SoundParameter.js";

/**
 * Filter the frequency range of a sound.
 * @class P5SoundBiquad
 * @constructor
 * @param {Number} [cutoff] cutoff frequency of the filter, a value between 0 and 24000.
 * @param {String} [type] filter type. Options: "lowpass", 
 *                        "highpass", "bandpass", "lowshelf",
 *                        "highshelf", "notch", "allpass", 
 *                        "peaking"
 * @example
 * <div>
 * <code>
 * ///kind of Karplus-Strong string synthesis using p5.sound.js
 * 
 * let noise, lowPass, hiPass, delay, env, gain;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   textSize(9);
 *   text('click and drag mouse', width/2, height/2);
 *   
 *   noise = new p5.P5SoundNoise('white');
 *   env = new p5.P5SoundEnvelope(0);
 *   lowPass = new p5.P5SoundBiquad(1200, 'lowpass');
 *   hiPass = new p5.P5SoundBiquad(55, 'highpass');
 *   delay = new p5.P5SoundDelay(0.0005, 0.97);
 *   gain = new p5.P5SoundGain(0.5);
 *   noise.disconnect();
 *   noise.connect(hiPass);
 *   hiPass.disconnect();
 *   hiPass.connect(env);
 *   env.disconnect();
 *   env.connect(lowPass);
 *   lowPass.disconnect();
 *   lowPass.connect(delay);
 * 
 *   cnv.mousePressed(pluckStart);
 *   cnv.mouseReleased(pluckStop);
 *   cnv.mouseOut(pluckStop);
 *   describe('A sketch that synthesizes string sounds.');
 * }
 * 
 * function pluckStart() {
 *   background(0, 255, 255);
 *   text('release to trigger decay', width/2, height/2);
 *   let dtime = map(mouseX, 0, width, 0.009, 0.001);
 *   delay.delayTime(dtime, 0);
 *   noise.start();
 *   env.triggerAttack();
 * }
 * 
 * function pluckStop() {
 *   background(220);
 *   text('click to pluck', width/2, height/2);
 *   env.triggerRelease();
 * }
 * </code>
 * </div>
 */
export class P5SoundBiquad extends P5SoundEffectNode
{
  constructor(frequency = 800, type = "lowpass")
  {
    super();

    this._toneBiquadNode = new ToneBiquadFilter();

    this._q = new P5SoundParameter(this._toneBiquadNode.q);
    this._filterGain = new P5SoundParameter(this._toneBiquadNode.gain);
    this._frequency = new P5SoundParameter(this._toneBiquadNode.frequency, frequency);

    this.type = type;

    this.configureInput(this._toneBiquadNode);
    this.configureOutput(this._toneBiquadNode);
  }

  isP5SoundBiquad = true;

  get q() { return this._q.parameter; }
  set q(value) { this._q.value = value; }

  /**
   * The filter's resonance factor.
   * @method res
   * @for P5SoundBiquad
   * @param {Number} resonance resonance of the filter. A number between 0 and 100.
   */
  set res(resonance) { this.q = resonance; }

  get type() { return this._type; }
  set type(value)
  {
    this._type = value;
    this._toneBiquadNode.type = value;
  }

  get filterGain() { return this._filterGain; }
  /**
   * The gain of the filter in dB units.
   * @method gain
   * @for P5SoundBiquad
   * @param {Number} gain gain value in dB units. The gain is only used for lowshelf, highshelf, and peaking filters.
   */
  set filterGain(gain) { this._filterGain.value = gain; }

  get frequency() { return this._frequency.parameter; }
  /**
   * Set the cutoff frequency of the filter.
   * @method freq
   * @for P5SoundBiquad
   * @param {Number} cutoffFrequency the cutoff frequency of the filter.
   */
  set frequency(cutoffFrequency) { this._frequency.value = cutoffFrequency; }
}