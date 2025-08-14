/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Reverb as ToneReverb } from "tone/build/esm/effect/Reverb.js";
import { P5SoundMixEffectNode } from "../core/P5SoundMixEffectNode.js";

/**
 * Add reverb to a sound.
 * @class P5SoundReverb
 * @constructor
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
 *   noise = new p5.P5SoundNoise();
 *   env = new p5.P5SoundEnvelope();
 *   reverb = new p5.P5SoundReverb();
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
export class P5SoundReverb extends P5SoundMixEffectNode
{
  constructor(decayTime = 1)
  {
    super();

    this.decayTime = decayTime;

    this._toneReverbNode = new ToneReverb(this.decayTime);

    this.configureWetIO(this._toneReverbNode, this._toneReverbNode);
  }

  isP5SoundReverb = true;
   /**
   * Set the decay time of the reverb.
   * @method set
   * @for Reverb
   * @param {Number} time Decay time of the reverb in seconds.
   */
  set(t) {
    this._toneReverbNode.decay = t;
  }
  
  // get decayTime() { return this._toneReverbNode.decayTime; }
  // /**
  //  * Set the decay time of the reverb.
  //  * @method set
  //  * @for P5SoundReverb
  //  * @param {Number} time Decay time of the reverb in seconds.
  //  */
  // set decayTime(time) { this._toneReverbNode.decay = time; }
}

export default P5SoundReverb;