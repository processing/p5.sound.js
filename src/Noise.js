import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { Noise as ToneNoise } from "tone/build/esm/source/Noise.js";

/**
 * Generate a buffer with random values.
 * @class Noise
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
 *   noise = new p5.Noise(noiseType);
 *   env = new p5.Envelope(0.01, 0.1, 0.15, 0.5);
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
class Noise {
  constructor(type) {
    if (typeof type === "undefined") {
      type = "white";
    }
    this.noise = new ToneNoise().toDestination();
    this.noise.type = type;
  }
  /**
   * @method type
   * @for Noise
   * @param {String} type - the type of noise (white, pink, brown) 
   */
  type(t) {
    this.noise.type = t;
  }

  /**
   * Adjust the amplitude of the noise source.
   * @method amp
   * @for Noise
   * @param {Number} amplitude Set the amplitude between 0 and 1.0. Or, pass in an object such as an oscillator to modulate amplitude with an audio signal. 
   */
  amp(value, p = 0.1) {
    if (typeof value === "object") {
      value.getNode().connect(this.noise.volume);
      return;
    }
    let dbValue = ToneGainToDb(value);
    this.noise.volume.rampTo(dbValue, p);
  }

  /**
   * Starts the noise source.
   * @method start
   * @for Noise
   */
  start() {
    this.noise.start();
  }
  
  /**
   * Stops the noise source.
   * @method stop
   * @for Noise
   */
  stop() {
    this.noise.stop();
  }

  connect(destination) {
    this.noise.connect(destination.getNode());
  }

  disconnect() {
    this.noise.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.noise;
  }
}

export default Noise;
