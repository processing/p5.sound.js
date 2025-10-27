/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Generic methods for p5 sound source nodes
 * @class p5soundSource
 * @constructor
 * @extends p5soundNode
 */
class p5soundSource extends p5soundNode {
  constructor() {
    super();
  }
  /**
   * Starts the p5 sound source.
   * @method start
   * @for p5soundSource
   */
  start() {
    this.node.start();
  }
  
  /**
   * Stops the p5 sound source.
   * @method stop
   * @for p5soundSource
   */
  stop() {
    this.node.stop();
  }
}

export { p5soundSource };