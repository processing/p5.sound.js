/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { P5SoundEffectNode } from "../core/P5SoundEffectNode.js";
import { P5SoundParameter } from "../../P5SoundParameter.js";
import { Panner as TonePanner} from "tone/build/esm/component/channel/Panner.js";

/**
 * A panning effect.
 * @class P5SoundPanner
 * @constructor
 * @example
 * <div>
 * <code>
 * let panner, lfo, soundfile, cnv;
 * 
 * function preload() {
 *   soundfile = loadSound('/assets/beat.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   background(220);
 *   cnv.mousePressed(startSound);
 *   
 *   panner = new p5.P5SoundPanner();
 *   lfo = new p5.P5SoundOscillator(1);
 *   //disconnect lfo from speakers because we don't want to hear it!
 *   lfo.disconnect();
 *   panner.pan(lfo);
 * 
 *   soundfile.loop();
 *   soundfile.disconnect();
 *   soundfile.connect(panner);
 *   
 * }
 * 
 * function startSound() {
 *   lfo.start();
 *   soundfile.start();
 * }
 * </code>
 * </div>
 */
export class P5SoundPanner extends P5SoundEffectNode
{
  constructor(panAmount = 0)
  {
    super();

    this._tonePannerNode = new TonePanner();

    this._pan = new P5SoundParameter(this._tonePannerNode.pan, panAmount);

    this.configureInput(this._tonePannerNode);
    this.configureOutput(this._tonePannerNode);
  }

  isP5SoundPanner = true;

  get pan() { return this._pan.parameter; }

  /**
   * Pan a sound source left or right.
   * @method pan
   * @for P5SoundPanner
   * @param {Number, Object}  panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or an audio rate signal such as an LFO.
   */
  set pan(panAmount) { this._pan.value = panAmount; }
}
