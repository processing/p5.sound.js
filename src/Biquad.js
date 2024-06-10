import * as Tone from "tone";

class Biquad {
  constructor() {
    //proof constructor so that if you give string it will set type but if you give number it will set cutoff, if you give both it will set both
    this.biquad= new Tone.BiquadFilter(400, "lowpass").toDestination();
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