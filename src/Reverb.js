import { Reverb as ToneReverb } from "tone";

/**
 * Add reverb to a sound by specifying duration and decay.
 * @class Reverb
 * @constructor
 * @param {Number} [decayTime] Set the decay time of the reverb
 * @example
 * <div>
 * <code>
 * let noise, osc, env, reverb;
 * let randomTime = 0;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   noise = new Noise();
 *   env = new Envelope();
 *   reverb = new Reverb();
 *   noise.disconnect();
 *   noise.connect(env);
 *   env.disconnect();
 *   env.connect(reverb);
 *   noise.start();
 *   textAlign(CENTER);
 * }
 * 
 * function playSound() {
 *  randomTime = random(0.1, 3);
 *  reverb.set(randomTime); 
 *  env.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   text('click to play', width/2, 20);
 *   text('decay ' + round(randomTime, 2), width/2, 40);
 *   describe('Click to play a sound with a random decay time.');
 * }
 * </code>
 * </div>
 */
class Reverb {
  constructor(decayTime) {
    this.decayTime = decayTime || 1;
    this.reverb = new ToneReverb(this.decayTime).toDestination();
  }

  /**
   * Set the decay time of the reverb.
   * @method set
   * @for Reverb
   * @param {Number} time Decay time of the reverb
   */
  set(t) {
    this.reverb.decay = t;
  }

  connect(destination) {
    this.reverb.connect(destination.getNode());
  }
  
  disconnect() {
    this.reverb.disconnect(Tone.Context.destination);
  }

  getNode() {
    return this.reverb;
  }
}

export default Reverb;