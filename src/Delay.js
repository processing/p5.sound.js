import * as Tone from "tone";

class Delay {
  constructor() {
    this.delay= new Tone.FeedbackDelay(0.250, 0.2).toDestination();
  }

  delayTime(t) {
    this.delay.delayTime.value = t;
  }

  feedback(f) {
    this.delay.feedback.value = f;
  }

  connect(destination) {
    this.delay.connect(destination.getNode());
  }
  
  getNode() {
    return this.delay;
  }

  disconnect() {
    this.delay.disconnect(Tone.Context.destination);
  }
}

export default Delay;