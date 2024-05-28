import * as Tone from "tone";

class Delay {
  constructor() {
    this.delay= new Tone.PingPongDelay("4n", 0.2).toDestination();
  }

  delayTime(t) {
    this.delay.delayTime.value = t;
  }

  feedback(f) {
    this.delay.feedback.value = f;
  }

  connect(destination) {
    this.delay.connect(Object.values(destination)[0].input);
  }

  disconnect() {
    this.delay.disconnect(Tone.Context.destination);
  }
}

export default Delay;