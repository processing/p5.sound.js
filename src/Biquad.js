import * as Tone from "tone";

class Biquad {
  constructor() {
    this.biquad= new Tone.BiquadFilter(400, "lowpass").toDestination();
  }

  set(f) {
    this.biquad.frequency.value = f;
  }

  freq(f) {
    this.biquad.frequency.value = f;
  }
  
  connect(destination) {
    this.biquad.connect(Object.values(destination)[0].input);
  }

  disconnect() {
    this.biquad.disconnect(Tone.Context.destination);
  }
}

export default Biquad;