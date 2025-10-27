/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Noise as ToneNoise } from "tone/build/esm/source/Noise";
import { p5soundSource } from "../core/p5soundSource";

/**
 * Generate a buffer with random values.
 * @class Noise
 * @constructor
 * @extends p5soundSource
 * @param {String} [type] - the type of noise (white, pink, brown)
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
class Noise extends p5soundSource {
  constructor(type) {
    super();
    if (typeof type === "undefined") {
      type = "white";
    }
    this.node = new ToneNoise().toDestination();
    this.node.type = type;
  }
  /**
   * @method type
   * @for Noise
   * @param {String} type - the type of noise (white, pink, brown) 
   */
  type(t) {
    this.node.type = t;
  }
}

export default Noise;
