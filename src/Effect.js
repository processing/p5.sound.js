import * as Tone from "tone";

//eventually it would be nice to have this be used as a base class for all effects
class Effect {
  constructor() {
    
  }

  getNode() {
    return this.gain;
  }

  connect(destination) {
    this.gain.connect(destination.getNode());
  }

  disconnect() {
    this.gain.disconnect(Tone.Context.destination);
  }
}

export default Gain;