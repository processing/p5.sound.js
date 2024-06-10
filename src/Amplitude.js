import * as Tone from "tone";
/**
 * Creates an Amplitude object for getting loudness.
 * @class Amplitude
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
 *   amp = new Amplitude();
 *   sound.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   let level = amp.getLevel();
 *   level = map(level, 0, 0.5, 0, 255);
 *   fill(level, 0, 0);
 * }
 * 
 * 
 */
class Amplitude {
  constructor() {
    this.amplitude = new Tone.Meter({normalRange:true});
  }

  setInput(input) {
    if (Object.values(input)[0].input.constructor.name === "GainNode") {
      this.input.connect(Object.values(input)[0].input);
    }
    else {
      console.log("input is not a GainNode")
    }
    this.amplitude.connect(Object.values(input)[0].input);
  }

  getNode() {
    return this.amplitude;
  }

  connect(destination) {
    this.amplitude.connect(destination.getNode());
  }
  
  getLevel() {
    return this.amplitude.getValue();
  }
}

export default Amplitude;