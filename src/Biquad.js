import * as Tone from "tone";

class Biquad {
  constructor(c, t) {
    //proof constructor so that if you give string it will set type but if you give number it will set cutoff, if you give both it will set both
    this.type = t;
    this.cutoff = c;
    this.biquad= new Tone.BiquadFilter(this.cutoff, this.type).toDestination();
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