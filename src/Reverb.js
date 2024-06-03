import * as Tone from "tone";

class Reverb {
  constructor() {
    this.reverb= new Tone.Reverb("1").toDestination();
  }

  set(t) {
    this.reverb.decay.value = t;
  }

  getNode() {
    return this.reverb;
  }

  connect(destination) {
    this.reverb.connect(destination.getNode());
  }

  disconnect() {
    this.reverb.disconnect(Tone.Context.destination);
  }
}

export default Reverb;