/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { P5SoundEffectNode } from "../P5SoundEffectNode.js";
import { P5SoundParameter } from "../P5SoundParameter.js";

/**
 * Generate a gain node to use for mixing and main volume.
 * @class P5SoundGain
 * @constructor
 * @example
 * <div>
 * <code>
 * let cnv, soundFile, osc, gain;
 * 
 * function preload() {
 *   soundFile = loadSound('assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 * 
 *   gain = new p5.P5SoundGain(0.74);
 *   osc = new p5.P5SoundOscillator();
 *   osc.amp(0.74);
 *   osc.disconnect();
 *   soundFile.loop();
 *   soundFile.disconnect();
 * 
 *   //connect both sound sources to gain node
 *   soundFile.connect(gain);
 *   osc.connect(gain);
 * }
 * 
 * function playSound() {
 *   soundFile.play();
 *   soundFile.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   let level = map(mouseX, 0, width, 0, 1);
 *   gain.amp(level);
 * }
 * </code>
 * </div>
 */
export class P5SoundGain extends P5SoundEffectNode
{
  constructor(gainValue = 1)
  {
    super();

    this._gainNode = new ToneGain(gainValue);

    this._gain = new P5SoundParameter(this._gainNode.gain);

    this.configureInput(this._gainNode);
    this.configureOutput(this._gainNode);
  }

  isP5SoundGain = true;

  get gain() { return this._gain; }
  set gain(value) { this._gain.value = value; }
}