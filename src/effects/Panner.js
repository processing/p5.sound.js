/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Panner as TonePanner} from "tone/build/esm/component/channel/Panner.js";
import { clamp } from '../core/Utils.js';
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * A panning effect.
 * @class Panner
 * @constructor
 * @extends p5soundNode
 * @example
 * <div>
 * <code>
 * let panner, lfo, soundfile, cnv;
 * 
 * function preload() {
 *   soundfile = loadSound('/assets/beat.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   background(220);
 *   cnv.mousePressed(startSound);
 *   
 *   panner = new p5.Panner();
 *   lfo = new p5.Oscillator(1);
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
class Panner extends p5soundNode {
  constructor() {
    super();
    this.node = new TonePanner(0).toDestination();
  }
  
  /**
   * Pan a sound source left or right.
   * @method pan
   * @for Panner
   * @param {Number, Object} panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or an audio rate signal such as an LFO.
   */
  pan(amount) {
    if (typeof amount === "object") {
      amount.getNode().connect(this.node.pan);
      return;
    }
    this.node.pan.rampTo(clamp(amount, -1, 1), 0.01);
  }
}

export default Panner;
