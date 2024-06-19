import * as Tone from "tone";
import { clamp } from './Utils';

/**
 * A panning effect.
 * @class Panner
 * @constructor
 * @example
 * <div>
 * <code>
 * </code>
 * </div>
 */
class Panner {
  constructor() {
    this.panner= new Tone.Panner(0).toDestination();
  }
  
  pan(p) {
    this.panner.pan.rampTo(clamp(p, -1, 1), 0.01);
  }

  getNode() {
    return this.panner;
  }

  connect(destination) {
    this.panner.connect(destination.getNode());
  }

  disconnect() {
    this.panner.disconnect(Tone.Context.destination);
  }
}

export default Panner;