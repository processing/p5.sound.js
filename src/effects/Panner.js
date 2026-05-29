  /**
   *  @module p5.sound
   *  @submodule p5.sound
   *  @for p5.sound
   */

  import { Panner as TonePanner} from "tone/build/esm/component/channel/Panner.js";
  import { clamp } from '../core/Utils.js';
  import { p5soundNode } from "../core/p5soundNode.js";

  /**
   * A panning effect. Moves the sound from left to right using a value between -1 and 1.
   * @class Panner
   * @constructor
   * @extends p5soundNode
   * @param {Number} [panAmount] defaults to 0, accepts values between -1 and 1 representing the pan position of the sound source between the left and right speaker channels.
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
   *   createCanvas(100, 100);
   *   describe("a sketch that pans a sound source to the left speaker channel")
   *   background(220);
   *   panner = new p5.Panner(-1);
   *   soundfile.loop();
   *   soundfile.disconnect();
   *   soundfile.connect(panner);
   * }
   * 
   * function mousePressed() {
   *   soundfile.start();
   * }
   * </code>
   * </div>
   */
  class Panner extends p5soundNode {
    constructor(amount = 0) {
      super();
      this.node = new TonePanner(amount);
      const toneInput  = this.node.input.input ?? this.node.input;
      const toneOutput = this.node.output.output ?? this.node.output;
      this.input.connect(toneInput);
      toneOutput.connect(this.output);
    }
    
    /**
     * Pan a sound source left or right with a value or signal.
     * @method pan
     * @for Panner
     * @param {Number, Object} panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or an audio rate signal such as an LFO.
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
     *   createCanvas(100, 100);
     *   describe("a sketch that pans a sound source between the left and right speaker channels");
     *   background(220);
     *   panner = new p5.Panner();
     *   lfo = new p5.Oscillator(1);
     *   //disconnect lfo from speakers because we don't want to hear it!
     *   lfo.disconnect();
     * 
     *   //connect the panner to an LFO to control the panning effect
     *   panner.pan(lfo);
     * 
     *   soundfile.loop();
     *   soundfile.disconnect();
     *   soundfile.connect(panner);
     * }
     * 
     * function mousePressed() {
     *   lfo.start();
     *   soundfile.start();
     * }
     * </code>
     * </div>
     */
    pan(amount) {
      if (typeof amount === "object") {
        amount.output.connect(this.node.pan.input);
        return;
      }
      this.node.pan.rampTo(clamp(amount, -1, 1), 0.01);
    }
  }

  export default Panner;
