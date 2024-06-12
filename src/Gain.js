import * as Tone from "tone";

/**
 * Generate a gain node.
 * @class Gain
 * @constructor
 * 
 */
class Gain {
  constructor(a) {
    //proof constructor so that if you give string it will set type but if you give number it will set cutoff, if you give both it will set both
    this.gain = new Tone.Gain(1).toDestination();
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