import { Noise as ToneNoise, Context as ToneContext } from "tone";

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
 *   noise = new Noise(noiseType);
 *   env = new Envelope(0.01, 0.1, 0.15, 0.5);
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
   * @param {String} t - the type of noise (white, pink, brown) 
   */
  type(t) {
    this.noise.type = t;
  }

  /**
   * Starts the noise source.
   * @method stop
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