/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { clamp } from "./Utils";
import { BiquadFilter as ToneBiquadFilter} from "tone/build/esm/component/filter/BiquadFilter.js";

/**
 * Filter the frequency range of a sound.
 * @class p5.Biquad
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
 *   noise = new Noise('white');
 *   env = new Envelope(0);
 *   lowPass = new Biquad(1200, 'lowpass');
 *   hiPass = new Biquad(55, 'highpass');
 *   delay = new Delay(0.0005, 0.97);
 *   gain = new Gain(0.5);
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
class Biquad {
  constructor(c = 800, t = "lowpass") {
    this.type = t;
    this.cutoff = c;
    this.biquad = new ToneBiquadFilter(this.cutoff, this.type).toDestination();
  }
  
  /**
   * The filter's resonance factor.
   * @method res
   * @for Biquad
   * @param {Number} resonance resonance of the filter. A number between 0 and 100.
   */
  res(r) {
    this.biquad.Q.value = r;
  }

  /**
   * The gain of the filter in dB units.
   * @method gain
   * @for Biquad
   * @param {Number} gain gain value in dB units. The gain is only used for lowshelf, highshelf, and peaking filters.
   */
  gain(g) {
    this.biquad.gain.value = g;
  }

  /**
   * Set the type of the filter.
   * @method setType
   * @for Biquad
   * @param {String} type type of the filter. Options: "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking" 
   */
  setType(t) {
    this.biquad.type = t;
  }

  /**
   * Set the cutoff frequency of the filter.
   * @method freq
   * @for Biquad
   * @param {Number} cutoffFrequency the cutoff frequency of the filter.
   */
  freq(f) {
    this.biquad.frequency.value = clamp(f, 0, 24000);
  }

  connect(destination) {
    this.biquad.connect(destination.getNode());
  }

  disconnect() {
    this.biquad.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.biquad;
  }
}

export default Biquad;