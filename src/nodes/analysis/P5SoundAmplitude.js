/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Meter as ToneMeter } from "tone/build/esm/component/analysis/Meter.js";
import {P5SoundAnalyzerNode} from "../core/P5SoundAnalyzerNode";

/**
 * Get the current volume of a sound.
 * @class Amplitude
 * @constructor
 * @param {Number} [smoothing] Smooth the amplitude analysis by averaging with the last analysis frame. 0.0 is no time averaging with the last analysis frame.
 * @example
 * <div>
 * <code>
 * let sound, amp, cnv;
 *   
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   sound = loadSound('/assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   textAlign(CENTER);
 *   fill(255);
 *   amp = new p5.Amplitude();
 *   sound.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   let level = amp.getLevel();
 *   level = map(level, 0, 0.2, 0, 255);
 *   background(level, 0, 0);
 *   text('tap to play', width/2, 20);
 *   describe('The color of the background changes based on the amplitude of the sound.');
 * }
 * </code>
 * </div>
 */
export class P5SoundAmplitude extends P5SoundAnalyzerNode
{
  constructor(smoothing = 0)
  {
    super();

    this._toneMeterNode = new ToneMeter( { normalRange:true, smoothing:smoothing } );

    this.configureInput(this._toneMeterNode);
  }

  /**
   * Get the current amplitude value of a sound.
   * @method getLevel
   * @for Amplitude
   * @return {Number} Amplitude level (volume) of a sound.
   */
  get level() { return this._toneMeterNode.getValue(); }

  get smooth() { return this._toneMeterNode.smoothing; }
  /**
   * Set the current amplitude value of a sound.
   * @method smooth
   * @for Amplitude
   * @param {Number} value Amplitude analysis by averaging with the last analysis frame. Off by default.
   */
  set smooth(value) { this._toneMeterNode.smoothing = value; }
}