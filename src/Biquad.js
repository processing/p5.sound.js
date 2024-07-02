import * as Tone from "tone";

/**
 * Filter the frequency range of a sound.
 * @class Biquad
 * @constructor
 * @param {Number} [cutoff] cutoff frequency of the filter
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

  res(r) {
    this.biquad.Q.value = r;
  }

  gain(g) {
    this.biquad.gain.value = g;
  }

  setType(t) {
    this.biquad.type = t;
  }

  set(f) {
    this.biquad.frequency.value = f;
  }

  freq(f) {
    this.biquad.frequency.value = f;
  }
  
  getNode() {
    return this.biquad;
  }

  connect(destination) {
    this.biquad.connect(destination.getNode());
  }

  disconnect() {
    this.biquad.disconnect(Tone.Context.destination);
  }
}

export default Biquad;