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