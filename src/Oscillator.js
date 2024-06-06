import * as Tone from "tone";

class Oscillator {
  constructor(frequency, type) {
    //this.osc.type = "sine";
    if (frequency && typeof frequency === "number") {
      this.frequency = frequency;
      console.log('i received a number for freq');
    } else if (typeof frequency === "undefined"){
      this.frequency = 440;
      //console.log('i didnt receive a number so i set oscillator to 440');
    }
    if (typeof type === "string") {
      this.type = type;
      console.log('i received a string for type');
    }
    if (typeof type === "undefined") {
      this.type = "sine";
    } 
    this.osc = new Tone.Oscillator().toDestination();
    this.osc.frequency.value = this.frequency;
    this.osc.type = this.type;
    this.osc.volume.value = -10;
  }

  freq(f) {
    this.osc.frequency.value = f;
  }

  setType(t) {
    this.osc.type = t;
  }

  connect(destination) {
    this.osc.connect(destination.getNode());
  }

  volume(v) {
    this.osc.volume.value = v;
  }

  disconnect() {
    this.osc.disconnect(Tone.Context.destination);
  }

  start() {
    this.osc.start();
  }

  stop() {
    this.osc.stop();
  }
}

class SawOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "sawtooth";
  }
}

class SqrOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "square";
  }
}

class TriOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "triangle"
  }
}

class SinOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};