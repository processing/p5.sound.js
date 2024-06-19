import * as Tone from "tone";

/**
 * Generate an amplitude envelope.
 * @class Envelope
 * @constructor
 * @param {Number} [a] - attack time
 * @param {Number} [d] - decay time
 * @param {Number} [s] - sustain time
 * @param {Number} [r] - release time
 * @example
 * <div>
 * <code>
 * </code>
 * </div>
 */

class Envelope {
  constructor(a = 0.1, d = 0.12, s = 0.1, r = 0.2) {
    this.attack = a;
    this.decay = d;
    this.sustain = s;
    this.release = r;

    this.envelope = new Tone.AmplitudeEnvelope({
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release,
    }).toDestination();
  }

  play() {
    this.envelope.triggerAttackRelease(this.sustain);
  }

  getNode() {
    return this.envelope;
  }

  connect(destination) {
    this.envelope.connect(destination.getNode());
  }

  disconnect() {
    this.envelope.disconnect(Tone.Context.destination);
  }
}

export default Envelope;