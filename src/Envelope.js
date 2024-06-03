import * as Tone from "tone";

class Envelope {
  constructor(a, d, s, r) {
    this.attack = a || 0.1;
    this.decay = d || 0.2;
    this.sustain = s || 0.5;
    this.release = r || 0.8;

    this.envelope = new Tone.AmplitudeEnvelope({
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release,
    }).toDestination();
  }

  play() {
    this.envelope.triggerAttackRelease();
  }

  connect(destination) {
    this.envelope.connect(Object.values(destination)[0].input);
  }

  disconnect() {
    this.envelope.disconnect(Tone.Context.destination);
  }
}

export default Envelope;