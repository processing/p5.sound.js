import { Gain as ToneGain } from "tone";

/**
 * Generate a gain node to use for mixing and main volume.
 * @class Gain
 * @constructor
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
 * 
 *   gain = new Gain(0.74);
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
 *   soundFile.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   let level = map(mouseX, 0, width, 0, 1);
 *   gain.amp(level);
 * }
 * </code>
 * </div>
 */
class Gain {
  constructor(value = 1) {
    this.gain = new ToneGain(value).toDestination();
  }

  /**
   * Adjust the amplitude of the soundfile.
   * @method amp
   * @for Gain
   * @param {Number} amplitude amplitude value between 0 and 1.
   */
  amp(value) {
    this.gain.gain.rampTo(value, 0.1);
  }

  connect(destination) {
    this.gain.connect(destination.getNode());
  }

  disconnect() {
    this.gain.disconnect(Tone.Context.destination);
  }

  getNode() {
    return this.gain;
  }
}

export default Gain;