import * as Tone from "tone";

class Noise {
  constructor(type) {
    this.noise= new Tone.Noise().toDestination();
    this.noise.type = "pink";
    this.noise.volume.value = -10;
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