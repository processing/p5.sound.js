/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";

/**
 * Generic methods for p5.sound.js nodes
 * @class p5soundNode
 * @constructor
 */
class p5soundNode {
  constructor() {
    this.node = null;
  }

  /**
   * Adjust the amplitude of the p5 sound node.
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

  connect(destination) {
    if(typeof destination.getNode === 'function') {
      this.node.connect(destination.getNode());
    } else {
      this.node.connect(destination);
    }
  }
  
  disconnect() {
    this.node.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.node;
  }
}

export { p5soundNode };
