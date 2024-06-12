import * as Tone from "tone";
import { clamp } from './Utils';

/**
 * A delay effect with parameters for feedback, and delay time.
 * @class Delay
 * @constructor
 * @param {Number} [d] - delay time
 * @param {Number} [f] - feedback amount
 */
class Delay {
  constructor(d = 0.250, f = 0.2)  {
    this.d = d;
    this.f = f;
    this.delay = new Tone.FeedbackDelay(this.d, this.f).toDestination();
  }

  delayTime(value) {
    if (value !== undefined) {
      this.delay.delayTime.rampTo(clamp(value, 0, 1), 0.1);
    }
    return this.delay.delayTime.value;
  }

  feedback(value) {
    if (value !== undefined) {
      this.delay.feedback.rampTo(clamp(value, 0, 1), 0.1);
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