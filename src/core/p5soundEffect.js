/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "../core/p5soundNode.js";
import { clamp } from '../Utils';

/**
 * Generate a buffer with random values.
 * @class p5soundEffect
 * @constructor
 * @extends p5soundNode
 * @example
 * <div>
 * <code>
 * let noise, env, cnv;
 * let types = ['white', 'pink', 'brown'];
 * let noiseType = 'brown';
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   textAlign(CENTER);
 *   cnv.mousePressed(start);
 *   noise = new p5.Noise(noiseType);
 *   env = new p5.Envelope(0.01, 0.1, 0.15, 0.5);
 *   noise.disconnect();
 *   noise.connect(env);
 *   noise.start();
 * }
 * 
 * function start() {
 *   noiseType = random(types);
 *   noise.type(noiseType);
 *   env.play();
 * }
 * 
 * function draw() {
 *   background(noiseType);
 *   text('tap to play', width/2, 20);
 *   let txt = 'type: ' + noiseType;
 *   text(txt, width/2, 40);
 * }
 * </code>
 * </div>
 */
class p5soundEffect extends p5soundNode {
  constructor() {
    super();
    this.node = null;
  }
  /**
   * Set the wet/dry mix of the effect.
   * @method wet
   * @for p5soundEffect
   * @param {Number} amount Between 0 (dry) and 1 (wet)
   */
  wet(amount) {
    if (typeof amount !== 'undefined') {
      this.node.wet.value = clamp(amount, 0, 1);
      return this;
    }
    return this.node.wet.value;
  }
}

export { p5soundEffect };