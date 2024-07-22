import { Panner as TonePanner } from "tone";
import { clamp } from './Utils';

/**
 * A panning effect.
 * @class Panner
 * @constructor
 * @example
 * <div>
 * <code>
 * let panner, lfo, soundfile, cnv;
 * 
 * function preload() {
 *   soundfile = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   background(220);
 *   cnv.mousePressed(startSound);
 *   
 *   panner = new Panner();
 *   lfo = new Oscillator(1);
 *   //disconnect lfo from speakers because we don't want to hear it!
 *   lfo.disconnect();
 *   panner.pan(lfo);
 * 
 *   soundfile.loop();
 *   soundfile.disconnect();
 *   soundfile.connect(panner);
 *   
 * }
 * 
 * function startSound() {
 *   lfo.start();
 *   soundfile.start();
 * }
 * </code>
 * </div>
 */
class Panner {
  constructor() {
    this.panner= new TonePanner(0).toDestination();
  }
  
  /**
   * Pan a sound source left or right.
   * @method pan
   * @for Panner
   * @param {Number, Object}  panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or a an audio rate signal such as an LFO.
   */
  pan(p) {
    if (typeof p === "object") {
      p.getNode().connect(this.panner.pan);
      return;
    }
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