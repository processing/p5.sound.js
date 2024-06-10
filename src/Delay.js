import * as Tone from "tone";

class Delay {
  constructor(d, f) {
    if (typeof d === "undefined") {
      d = 0.250;
    }
    if (typeof f === "undefined") {
      f = 0.2;
    }
    this.d = d;
    this.f = f;
    this.delay = new Tone.FeedbackDelay(this.d, this.f).toDestination();
  }

  delayTime(value) {
    if (value !== undefined) {
      this.delay.delayTime.value = value;
    }
    return this.delay.delayTime.value;
  }

  feedback(value) {
    if (value !== undefined) {
      this.delay.feedback.value = value;
    }
    return this.delay.feedback.value;
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