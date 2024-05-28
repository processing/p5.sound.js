import * as Tone from "tone";

class Reverb {
  constructor() {
    this.reverb= new Tone.Reverb("1").toDestination();
  }

  set(t) {
    this.reverb.decay.value = t;
  }

  connect(destination) {
    this.reverb.connect(Object.values(destination)[0].input);
  }

  disconnect() {
    this.reverb.disconnect(Tone.Context.destination);
  }
}

export default Reverb;