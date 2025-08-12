/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Noise as ToneNoise } from "tone/build/esm/source/Noise.js";
import { P5SoundStartableSourceNode } from "../core/P5SoundStartableSourceNode.js";

/**
 * Generate a buffer with random values.
 * @class P5SoundNoise
 * @constructor
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
 *   noise = new p5.P5SoundNoise(noiseType);
 *   env = new p5.P5SoundEnvelope(0.01, 0.1, 0.15, 0.5);
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
export class P5SoundNoise extends P5SoundStartableSourceNode
{
  constructor(type = "white")
  {
    super();

    this._toneNoiseNode = new ToneNoise();
    this.type = type;

    this.configureStartableNode(this._toneNoiseNode);
    this.configureOutput(this._toneNoiseNode);
  }

  isP5SoundNoise = true;

  get type() { return this._toneNoiseNode.type; }
  /**
   * @method type
   * @for P5SoundNoise
   * @param {String} type - the type of noise (white, pink, brown) 
   */
  set type(type) { this._toneNoiseNode.type = type; }
}
