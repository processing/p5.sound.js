import * as Tone from "tone";
const clamp = (val, min =0, max =1) => Math.min(Math.max(val, min), max);

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
      this.delay.delayTime.rampTo(clamp(value), 0.1);
    }
    return this.delay.delayTime.value;
  }

  feedback(value) {
    if (value !== undefined) {
      this.delay.feedback.rampTo(clamp(value), 0.1);
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