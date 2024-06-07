import * as Tone from "tone";

class Envelope {
  constructor(a, d, s, r) {
    this.attack = a || 0.0;
    this.decay = d || 0.12;
    this.sustain = s || 0.1;
    this.release = r || 0.2;

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