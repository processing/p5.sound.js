/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Generate a gain node to use for mixing and main volume.
 * @class Gain
 * @constructor
 * @extends p5soundNode
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
 *   background(220);
 *   gain = new p5.Gain(0.74);
 *   osc = new p5.Oscillator();
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
 *   osc.play();
 * }
 * 
 * function draw() {
 *   let level = map(mouseX, 0, width, 0, 1);
 *   gain.amp(level);
 * }
 * </code>
 * </div>
 */
class Gain extends p5soundNode {
  constructor(value = 1) {
    super();
    this.node = new ToneGain(value).toDestination();
  }
}

export default Gain;