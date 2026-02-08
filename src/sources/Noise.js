/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Noise as ToneNoise } from "tone/build/esm/source/Noise";
import { p5soundSource } from "../core/p5soundSource";

/**
 * Generate a static noise source.
 * 
 * Noise is a useful tool in sound synthesis. It can emulate ocean or wind sounds. It can also be used to create percussive or other musical sounds when connected to other sound effects like filters and envelopes. There are several types of noise which differ in perceived "brightness."
 * @class Noise
 * @constructor
 * @extends p5soundSource
 * @param {String} [type] the type of noise (white, pink, brown)
 * @example
 * <div>
 * <code>
 * let noise, filt, cnv;
 *
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   textAlign(CENTER);
 *   textWrap(WORD)
 *   cnv.mousePressed(startNoise);
 *   noise = new p5.Noise('white');
 *   filt = new p5.Biquad(900, 'lowpass');
 *   noise.disconnect();
 *   noise.connect(filt);
 * }
 *  
 * function startNoise() {
 *   noise.start();
 * }
 *
 * function draw() {
 *   background('cyan');
 *   text('click to hear the ocean', 0, 20, 100);
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
   * Changes the type of noise function.
   * 
   * White noise is brighter and more "full spectrum" while 'pink' and 'brown' noise is a bit darker.
   * @method type
   * @for Noise
   * @param {String} type the type of noise (white, pink, brown)
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
   * </div>
   * </code>
   */
  type(t) {
    this.node.type = t;
  }  
}

export default Noise;
