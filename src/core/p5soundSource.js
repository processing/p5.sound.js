/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "../core/p5soundNode.js";
import { Effect as ToneEffect } from "tone/build/esm/effect/Effect.js";

/**
 * Generate a buffer with random values.
 * @class p5soundSource
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