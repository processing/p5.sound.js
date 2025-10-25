/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Reverb as ToneReverb } from "tone/build/esm/effect/Reverb.js";
import { p5soundMixEffect } from "../core/p5soundMixEffect.js";

/**
 * Add reverb to a sound.
 * @class Reverb
 * @constructor
 * @extends p5soundMixEffect
 * @param {Number} [decayTime] Set the decay time of the reverb
 * @example
 * <div>
 * <code>
 * let noise, osc, env, reverb;
 * let randomTime = 0;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   noise = new p5.Noise();
 *   env = new p5.Envelope();
 *   reverb = new p5.Reverb();
 *   noise.disconnect();
 *   noise.connect(env);
 *   env.disconnect();
 *   env.connect(reverb);
 *   noise.start();
 *   textAlign(CENTER);
 * }
 * 
 * function playSound() {
 *  randomTime = random(0.1, 3);
 *  reverb.set(randomTime); 
 *  env.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   text('click to play', width/2, 20);
 *   text('decay ' + round(randomTime, 2), width/2, 40);
 *   describe('Click to play a sound with a random decay time.');
 * }
 * </code>
 * </div>
 */
class Reverb extends p5soundMixEffect {
  constructor(decayTime) {
    super();
    this.decayTime = decayTime || 1;
    this.node = new ToneReverb(this.decayTime).toDestination();
  }

  /**
   * Set the decay time of the reverb.
   * @method set
   * @for Reverb
   * @param {Number} time Decay time of the reverb in seconds.
   */
  set(t) {
    this.node.decay = t;
  }
}

export default Reverb;