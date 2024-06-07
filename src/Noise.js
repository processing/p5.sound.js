import * as Tone from "tone";

class Noise {
  constructor(type) {
    if (typeof type === "undefined") {
      type = "white";
    }
    this.noise = new Tone.Noise().toDestination();
    this.noise.type = type;
  }

  type(t) {
    this.noise.type = t;
  }
  
  getNode() {
    return this.noise;
  }

  connect(destination) {
    this.noise.connect(destination.getNode());
  }

  disconnect() {
    this.noise.disconnect(Tone.Context.destination);
  }

  start() {
    this.noise.start();
  }

  stop() {
    this.noise.stop();
  }
}

export default Noise;