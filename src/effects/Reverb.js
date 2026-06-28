/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Reverb as ToneReverb } from "tone/build/esm/effect/Reverb.js";
import { p5soundMixEffect } from "../core/p5soundMixEffect.js";

/**
 * Add reverb to a sound.
 * 
 * Reverb is an effect that is used commonly in electronic sound production. It makes input sound like it is in an actual space. Large spaces have longer decay times
 * @class Reverb
 * @constructor
 * @extends p5soundMixEffect
 * @param {Number} [decayTime] Set the decay time of the reverb
 * @example
 * <div>
 * <code>
 * let sample, reverb;
 * 
 * async function setup() {
 *   sample = await loadSound("../../sounds/drums.mp3");
 *   sample.loop(true);
 *   let cnv = createCanvas(100, 100);
 *   describe("a sketch that plays processes an audio file with a reverb effect.");
 *   cnv.mousePressed(playSound);
 *   
 *   reverb = new p5.Reverb(3);
 *   sample.disconnect();
 *   sample.connect(reverb);
 *   
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 * }
 * 
 * function playSound() {
 *   if (!sample.isPlaying()) {
 *     sample.play();
 *   }
 *   else {
 *     sample.stop();
 *   }
 * }
 * 
 * function draw() {
 *   background(220);
 *   text("click to play sound, move mouse to change wet/dry mix", 0, 20, width);
 *   
 *   let dryWet = map(mouseX, 0, width, 0, 1);
 *   text("wet: " + (constrain(round(dryWet * 100), 0, 100)) + "%", width / 2, 80);
 *   reverb.wet(dryWet);
 * }
 * </code>
 * </div>
 */
class Reverb extends p5soundMixEffect {
  constructor(decayTime) {
    super();
    this.decayTime = decayTime || 10;
    this.node = new ToneReverb(this.decayTime);
    const toneInput  = this.node.input.input ?? this.node.input;
    const toneOutput = this.node.output.output ?? this.node.output;
    this.input.connect(toneInput);
    toneOutput.connect(this.output);
  }

  /**
   * Set the decay time of the reverb. A longer decay time makes the input sound more cavernous.
   * @method set
   * @for Reverb
   * @param {Number} time Decay time of the reverb in seconds.
   * @example
   * <div>
   * <code>
   * let sample, reverb
   * let randomTime = 0;
   * 
   * async function setup() {
   *   sample = await loadSound("../../sounds/drums.mp3");
   *   sample.loop(true);
   *   let cnv = createCanvas(100, 100);
   *   describe("a sketch that plays processes an audio file with a reverb effect.");
   *   cnv.mousePressed(playSound);
   *   
   *   reverb = new p5.Reverb(3);
   *   sample.disconnect();
   *   sample.connect(reverb);
   *   
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   * }
   * 
   * function playSound() {
   *   if (!sample.isPlaying()) {
   *     sample.play();
   *     randomTime = random(0.1, 3);
   *     reverb.set(randomTime);
   *   }
   *   else {
   *     randomTime = random(0.1, 8);
   *     reverb.set(randomTime);
   *   }
   * }
   * 
   * function draw() {
   *   background(220);
   *   text("click to play sound and change the decay time", 0, 20, width);
   *   text("Decay Time: " + randomTime.toFixed(2), width / 2, 80);
   * }
   * </code>
   * </div>
   */
  set(t) {
    this.node.decay = t;
  }
}

export default Reverb;