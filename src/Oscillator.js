import * as Tone from "tone";

class Oscillator {
  constructor(freq, type) {
    this.osc= new Tone.Oscillator().toDestination();
    if (typeof freq === "number") {
      this.osc.frequency.value = freq;
      console.log('i received a number for freq');
    } else {
      this.osc.frequency.value = 440;
      //console.log('i didnt receive a number so i set oscillator to 440');
    }
    if (typeof type === "string") {
      this.osc.type = type;
      console.log('i received a string for type');
    }
    if (type === "undefined") {
      this.osc.type = "sine";
      console.log('i received a string for type')
    }
    this.osc.volume.value = -20;
  }

  freq(f) {
    this.osc.frequency.value = f;
  }

  setType(t) {
    this.osc.type = t;
  }
  
  connect(destination) {
    //handle if destination is Amplitude (input is Analyser not GainNode)
    console.log(Object.values(destination)[0].input.constructor.name);
    if (Object.values(destination)[0].input.constructor.name === "Gain" || Object.values(destination)[0].input.constructor.name === "StereoPannerNode")  {
      this.osc.connect(Object.values(destination)[0].input);
    }
    else {
      this.osc.connect(Object.values(destination)[0].input.input);
    }
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
  constructor() {
    super(this.osc.type = "sawtooth"); 
    console.log(this.osc.type);
  }
}

class SqrOsc extends Oscillator {
  constructor() {
    super(this.osc.type = "square");
    console.log('SqrOsc');
  }
}

class TriOsc extends Oscillator {
  constructor() {
    super(this.osc.type = "triangle");
  }
}

class SinOsc extends Oscillator {
  constructor() {
    super(this.osc.type = "sine");
  }
}

export default Oscillator;
export { SinOsc, TriOsc, SawOsc, SqrOsc };