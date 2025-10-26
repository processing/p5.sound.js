/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "./p5soundNode.js";
import { clamp } from './Utils.js';

/**
 * Generic dry/wet mix method for p5 effect nodes
 * @class p5soundMixEffect
 * @constructor
 * @extends p5soundNode
 */
class p5soundMixEffect extends p5soundNode {
  constructor() {
    super();
    this.node = null;
  }
  /**
   * Set the wet/dry mix of the effect.
   * @method wet
   * @for p5soundMixEffect
   * @param {Number} amount Between 0 (dry) and 1 (wet)
   * @example
   * <div>
   * <code>
   * let osc, del
   *
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   background(220);
   *   osc = new p5.Oscillator();
   *   osc.disconnect();
   *   del = new p5.Delay();
   *   osc.connect(del);
   *   del.delayTime(0.25);
   *   del.feedback(0.5);
   *   del.wet(0.5);
   * }
   *
   * function mousePressed() {
   *   osc.start();
   * }
   *
   * function draw() {
   *   del.delayTime(map(mouseX, 0, width, 0.01, 0.5));
   *   del.wet(map(mouseY, 0, height, 0.1, 0.9));
   *   background(220);
   *   textAlign(CENTER);
   *   textSize(9);
   *   text('delay dry/wet: ' + del.wet().toFixed(2), width / 2, height / 2);
   * }
   * </code>
   * </div>
   */
  wet(amount) {
    if (typeof amount !== 'undefined') {
      this.node.wet.value = clamp(amount, 0, 1);
      return this;
    }
    return this.node.wet.value;
  }
}

export { p5soundMixEffect };