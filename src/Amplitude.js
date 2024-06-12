import * as Tone from "tone";

/**
 * Get the current volume of a sound.
 * @class Amplitude
 * @constructor
 * @example
 * <div>
 * <code>
 * let sound, amp, cnv;
 *   
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   textAlign(CENTER);
 *   fill(255);
 *   amp = new Amplitude();
 *   sound.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   let level = amp.getLevel();
 *   level = map(level, 0, 0.2, 0, 255);
 *   background(level, 0, 0);
 *   text('tap to play', width/2, 20);
 *   describe('The color of the background changes based on the amplitude of the sound.');
 * }
 * </code>
 * </div>
 */
class Amplitude {
  constructor() {
    this.amplitude = new Tone.Meter({normalRange:true});
  }

  /**
   * Connect an  to the amplitude object.
   * @method setInput
   * @for Amplitude
   * @param {Object} input - An object that has audio output.
   */
  setInput(input) {
    input.getNode().connect(this.amplitude);
  }

  getNode() {
    return this.amplitude;
  }

  connect(destination) {
    this.amplitude.connect(destination.getNode());
  }

  /**
   * Connect an input to the amplitude object.
   * @method getLevel
   * @for Amplitude
   * @return {Number} Amplitude level (volume) of a sound.
   */
  getLevel() {
    return this.amplitude.getValue();
  }
}

export default Amplitude;