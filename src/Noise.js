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
  
  connect(destination) {
    this.noise.connect(Object.values(destination)[0].input);
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