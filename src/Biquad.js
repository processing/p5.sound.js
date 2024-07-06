import * as Tone from "tone";
import { clamp } from "./Utils";

/**
 * Filter the frequency range of a sound.
 * @class Biquad
 * @constructor
 * @param {Number} [cutoff] cutoff frequency of the filter, a value between 0 and 24000.
 * @param {String} [type] filter type. Options: "lowpass", 
 *                        "highpass", "bandpass", "lowshelf",
 *                        "highshelf", "notch", "allpass", 
 *                        "peaking"
 */
class Biquad {
  constructor(c = 800, t = "lowpass") {
    this.type = t;
    this.cutoff = c;
    this.biquad= new Tone.BiquadFilter(this.cutoff, this.type).toDestination();
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
    this.biquad.disconnect(Tone.Context.destination);
  }

  getNode() {
    return this.biquad;
  }
}

export default Biquad;