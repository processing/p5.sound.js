/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Generic methods for p5 sound nodes that GENERATE sound. 
 * @class p5soundSource
 * @constructor
 * @extends p5soundNode
 */
class p5soundSource extends p5soundNode {
  constructor() {
    super();
    this.started = false;
  }
  /**
   * Starts the p5 sound source.
   * 
   * Should be called from a user interaction such as MousePressed() in order to adhere to the browser's autoplay policy.
   * @method start
   * @for p5soundSource
   * @example
   * <div>
   * <code>
   * let osc, delay;
   * let cnv;
   * 
   * function setup() {
   *   describe("a sketch that demonstrates how to connect an audio source node to an effect node");
   *   createCanvas(100, 100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   
   *   osc = new p5.Oscillator('sine');
   *   delay = new p5.Delay(0.120, 0.65);
   *   //disconnect the oscillator from the speakers before connecting to the delay effect!
   *   osc.disconnect();
   *   //connect the oscillator to the delay effect.
   *   osc.connect(delay);
   * }
   * 
   * function mousePressed() {
   *   osc.start();
   * }
   * 
   * function draw(){
   *   background(220);
   *   text('click to play sound', 0, height/2 - 20, 100);
   *   text('control oscillator frequency with mouseX position', 0, height/2, 100);
   * 
   *   let freq = map(mouseX, 0, width, 800, 1600);
   *   osc.freq(freq);
   * }
   * </code>
   * </div>
   */
  start() {
    this.node.start();
    this.started = true;
  }
  
  /**
   * Stops the p5 sound source.
   * @method stop
   * @for p5soundSource
   * @example
   * <div>
   * <code>
   * let osc, delay;
   * let cnv;
   * let isPlaying = false;
   * 
   * function setup() {
   *   describe("a sketch that demonstrates how to stop and start an audio source node");
   *   createCanvas(100, 100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   
   *   osc = new p5.Oscillator('sine', 800);
   *   delay = new p5.Delay(0.120, 0.65);
   *   //disconnect the oscillator from the speakers before connecting to the delay effect!
   *   osc.disconnect();
   *   //connect the oscillator to the delay effect.
   *   osc.connect(delay);
   * }
   * 
   * function mousePressed() {
   *   if (!isPlaying) {
   *     osc.start();
   *     isPlaying = true; 
   *   }
   *   else {
   *     osc.stop();
   *     isPlaying = false;
   *   }
   * }
   * 
   * function draw(){
   *   background(220);
   *   text('click to stop and start the sound', 0, height/2 - 20, 100);
   * }
   * </code>
   * </div>
   */
  stop() {
    this.node.stop();
    this.started = false;
  }
}

export { p5soundSource };