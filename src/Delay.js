import * as Tone from "tone";
import { clamp } from './Utils';

/**
 * A delay effect with parameters for feedback, and delay time.
 * @class Delay
 * @constructor
 * @param {Number} [delayTime] delay time
 * @param {Number} [feedback] feedback amount
 * @example
 * <div>
 * <code>
 * let osc;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 * 
 *   osc = new Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new Delay(0.12, 0.7);
 *   
 *   osc.disconnect();
 *   osc.connect(delay);
 * 
 *   cnv.mousePressed(oscStart);
 *   describe('Tap to play a square wave with delay effect.');
 * }
 * 
 * function oscStart() {
 *   osc.start();
 * }
 * 
 * </code>
 * </div>
 * function mouseReleased() {
 *   osc.stop();
 * }
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