/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { p5soundSource } from "../core/p5soundSource.js";
import { Oscillator as ToneOscillator } from "tone/build/esm/source/oscillator/Oscillator.js";
import { clamp } from "../core/Utils.js";
import { Frequency } from "tone/build/esm/core/type/Frequency.js";


/** 
 * Generates a consistent tone, sometimes referred to as a pitch.
 * 
 * A building block of sound design, this oscillator can produce the following "waveforms": Sine, Triangle, Square and Sawtooth. A repeating waveform produces a perceived pitch beginning at around 20 times a second, with additional textural or harmonic content dependent on the type of waveform you choose.
 * @class Oscillator
 * @constructor
 * @extends p5soundSource
 * @param {Number} [frequency] defaults to 440Hz, or 440 'cycles per second.' represents the pitch of the tone. Acts as a 'control-rate' or 'low frequency oscillator' (LFO) at values between 0 and 20. Creates a tone between 20 and about 20,000 Hertz depending on how well you can hear!
 * @param {String} [type] type of waveform:
 *                        'sine' (default), 'triangle',
 *                        'sawtooth', 'square'
 * @example
 * <div>
 * <code>
 * let osc, playing, freq, amp;
 *
 * function setup() {
 *   describe("a sketch that demonstrates the frequency and amplitude parameters of an oscillator.");
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playOscillator);
 *   osc = new p5.Oscillator();
 * }
 *
 * function draw() {
 *   background(220)
 *   freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
 *   amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
 *   text('tap to play', 20, 20);
 *   text('freq: ' + freq, 20, 40);
 *   text('amp: ' + amp, 20, 60);
 *
 *   if (playing) {
 *     //smooth the frequency transition over 0.1 seconds
 *     osc.freq(freq, 0.1);
 *     osc.amp(amp);
 *   }
 * }
 *
 * function playOscillator() {
 *   // starting an oscillator on a user interaction like mousePressed() will enable audio in browsers that have a strict autoplay policy (most browsers).
 *   osc.start();
 *   playing = true;
 * }
 *
 * function mouseReleased() {
 *   //lower volume to 0 over 0.1 seconds
 *   osc.amp(0, 0.1);
 *   playing = false;
 * }
 * </code> 
 * </div>
 */


// new p5.Osillator(400, "triangle")
// new p5.Oscillator("triangle", 400)
//act as enum

//if one of inputs is a number we know the other is a type
//if on of the types is a string like"sawtooth" the other is the frequency
//
//assume first is frequency
//string in list of types ['sine', 'sawtooth', 'square', 'triangle']
class Oscillator extends p5soundSource {
  constructor(frequency = 440, type = "sine") {
    super();
    // if (typeof frequency === "string" && typeof type === "string") {
    //   let f = frequency;
    //   frequency = 440;
    //   type = f;
    // }
    // if (typeof frequency === "string" && typeof type === "number") {
    //   let t = type;
    //   let f = frequency;
    //   type = f;
    //   frequency = t;
    // }
    // if (typeof type == number)
    this.frequency = frequency;
    this.type = type;
    this.node = new ToneOscillator().connect(this.output);
    this.node.frequency.value = this.frequency;
    this.node.type = this.type;
    this.node.volume.value = -6;
  }

  /**
   * Adjusts the frequency of the oscillator.
   * 
   * Frequency is measured int Hertz (Hz) and determines the amount of cycles a waveform (square, sawtooth, etc...) will repeat in a second. The amount of repetitions results in a change of perceived 'pitch.' You can lookup corresponding frequency values for 'notes' if you would like to play a scale. For example, 'middle C' on the keyboard has a frequency of 261.63 Hz. You can also use note names such as C4, D4, C#4 (for octaves in range of -4 to 11).  
   * @method freq
   * @for Oscillator
   * @param {Number} frequency frequency of the oscillator in Hz (cycles per second). used to change 'pitch' or 'notes.'
   * @param {Number} [rampTime] the time in seconds it takes to ramp to a new frequency value (defaults to 0).
   * @example
   * <div>
   * <code>
   * 
   * </code>
   * </div>
   */
  freq(f, rampTime = 0) {
    if (typeof f === "number") {
      this.node.frequency.rampTo(clamp(f, 0, 24000), rampTime);
    }
    else if (typeof f === "string") {
      let hz = clamp(Frequency(f).toFrequency(), 0, 24000);
      this.node.frequency.rampTo(hz, rampTime);
    }
    else {
      console.warn("Oscillator.freq(): argument must be a number (Hz) or a note name string (e.g. 'C4')");
      return;
    }
  }

  /**
   * Adjusts the phase of the oscillator. Effectively, this changes the starting point of waveform.
   * 
   * You might want to adjust the phase of an oscillator in more advanced sound design scenarios when layering multiple oscillators at different offsets to produce a particular instrument or timbre.
   * @method phase
   * @for Oscillator
   * @param {Number} phase phase of the oscillator in degrees (0-360).
   * @example
   * <div>
   * <code>
   * 
   */
  phase(p) {
    this.node.phase = p;
  }

  /**
   * Sets the type of the oscillator. 
   * @method setType
   * @for Oscillator
   * @param {String} type type of the oscillator. Options:
   *                 'sine' (default), 'triangle',
   *                 'sawtooth', 'square'
   * @example
   * <div>
   * <code>
   * let waveShapes = ['sine', 'sawtooth', 'square', 'triangle'];
   * let currentWaveShape;
   *  
   * function setup() {
   *   createCanvas(100, 100);
   *   textAlign(CENTER);
   *   currentWaveShape = random(waveShapes)
   *   osc = new p5.Oscillator(currentWaveShape);
   *   //create an envelope to stop the oscillator after a second or so. 
   *   env = new p5.Envelope(0.01, 0.1, 0.45, 0.5);
   *   osc.disconnect();
   *   osc.connect(env);
   * }
   *  
   * function mousePressed() {
   *   osc.start();
   *   env.play();
   *   currentWaveShape = random(waveShapes);
   *   osc.setType(currentWaveShape);
   * }
   *  
   * function draw() {
   *   background(220);
   *   text('tap to play', width/2, 20);
   *   let txt = 'type: ' + currentWaveShape;
   *   text(txt, width/2, 40);
   * }
   */
  setType(t) {
    this.node.type = t;
  }
}

/**
 * Creates a sawtooth oscillator.
 * @class SawOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 * * @example
 * <div>
 * <code>
 * function setup() {
 *   describe("a sketch that creates an oscillator with a sawtooth wave shape");
 *   createCanvas(100, 100);
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 *   osc = new p5.SinOsc;
 * }
 * 
 * function mousePressed() {
 *   osc.start();
 * }
 * 
 * function draw(){
 *   background(220);
 *   text('click to hear a sawtooth wave shape', 0, 10, 100);
 * }
 * </code>
 * </div>
 */
class SawOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "sawtooth";
  }
}

/**
 * Creates a square oscillator.
 * @class SqrOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 * * @example
 * <div>
 * <code>
 * function setup() {
 *   describe("a sketch that creates an oscillator with a square wave shape");
 *   createCanvas(100, 100);
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 *   osc = new p5.SqrOsc(440);
 * }
 * 
 * function mousePressed() {
 *   osc.start();
 * }
 * 
 * function draw(){
 *   background(220);
 *   text('click to hear a square wave shape', 0, 10, 100);
 * }
 * </code>
 * </div>
 */
class SqrOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "square";
  }
}

/**
 * Creates a triangle oscillator.
 * @class TriOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 * * @example
 * <div>
 * <code>
 * function setup() {
 *   describe("a sketch that creates an oscillator with a triangle wave shape");
 *   createCanvas(100, 100);
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 *   osc = new p5.TriOsc(440);
 * }
 * 
 * function mousePressed() {
 *   osc.start();
 * }
 * 
 * function draw(){
 *   background(220);
 *   text('click to hear a triangle wave shape', 0, 10, 100);
 * }
 * </code>
 * </div>
 */
class TriOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "triangle"
  }
}

/**
 * Creates a sine oscillator.
 * @class SinOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 * @example
 * <div>
 * <code>
 * function setup() {
 *   describe("a sketch that creates an oscillator with a sine wave shape");
 *   createCanvas(100, 100);
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 *   osc = new p5.SinOsc;
 * }
 * 
 * function mousePressed() {
 *   osc.start();
 * }
 * 
 * function draw(){
 *   background(220);
 *   text('click to hear a sinusoidal wave shape', 0, 10, 100);
 * }
 * </code>
 * </div>
 */
class SinOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.node.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};