/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";

/**
 * This is the primary or "base" class for p5.sound.js nodes.
 * 
 * It allows p5.sound.js audio sources and effects to connect to one another. It also allows you to modify their volumes. 
 * @class p5soundNode
 * @constructor
 */
class p5soundNode {
  constructor() {
    this.node = null;
  }

  /**
   * Adjust the amplitude of the p5 sound node. 
   * 
   * Amplitude is another way of saying "volume" or "loudness."
   * @method amp
   * @for p5soundNode
   * @param {Number} amplitude Set the amplitude between 0 and 1.0. Or, pass in an object such as an oscillator to modulate amplitude with an audio signal.
   * @example
   * <div>
   * <code>
   * let osc, lfo;
   * let cnv;
   * 
   * function setup() {
   *   describe("a sketch that demonstrates amplitude modulation with an LFO and sine tone");
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startSound);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   
   *   osc = new p5.Oscillator('sine');
   *   lfo = new p5.Oscillator(1);
   *   lfo.disconnect();
   *   osc.amp(lfo);
   * }
   * 
   * function startSound() {
   *   lfo.start();
   *   osc.start();
   * }
   * 
   * function draw(){
   *   background(220);
   *   text('click to play sound', 0, height/2 - 20, 100);
   *   text('control lfo with mouseX position', 0, height/2, 100);
   * 
   *   let freq = map(mouseX, 0, width, 0, 10);
   *   lfo.freq(freq);
   * }
   * </code>
   * </div>
   */
  amp(value, p = 0.1) {
    if (typeof value === "object") {
      value.getNode().connect(this.node.volume);
      return;
    }
    let dbValue = ToneGainToDb(value);
    this.node.volume.rampTo(dbValue, p);
  }

  /**
   * Connects audio nodes together.  
   * 
   * You can connect a node to multiple destinations simultaneously by calling this method multiple times.
   * @method connect
   * @for p5soundNode
   * @param {Object} destination The node you would like to connect to.
   * @example
   * <div>
   * <code>
   * let osc, delay;
   * let cnv;
   * 
   * function setup() {
   *   describe("a sketch that demonstrates how to connect an audio source node to an effect node");
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startSound);
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
   * function startSound() {
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
  connect(destination) {
    if(typeof destination.getNode === 'function') {
      this.node.connect(destination.getNode());
    } else {
      this.node.connect(destination);
    }
  }
  
  /**
   * Disconnect an audio node from the main output.
   * 
   * You may want to disconnect your audio source from the main output before you connect it to another effect. It is used in many of the p5.sound.js examples.
   * @method disconnect
   * @for p5soundNode
   */
  disconnect() {
    this.node.disconnect(ToneContext.destination);
  }

  /**
   * A private function that is called when an audio source tries to connect to this node.  
   * @method getNode
   * @for p5soundNode
   */
  getNode() {
    return this.node;
  }
}

export { p5soundNode };
