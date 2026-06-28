/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { clamp } from "../core/Utils.js";
import { BiquadFilter as ToneBiquadFilter} from "tone/build/esm/component/filter/BiquadFilter.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Filter the frequency range of a sound.
 * @class Biquad
 * @constructor
 * @extends p5soundNode
 * @param {Number} [cutoff] cutoff frequency of the filter, a value between 0 and 24000.
 * @param {String} [type] filter type. Options: "lowpass", 
 *                        "highpass", "bandpass", "lowshelf",
 *                        "highshelf", "notch", "allpass", 
 *                        "peaking"
 * @example
 * <div>
 * <code>
 * let fft, noise, filterEffect;
 *
 * function setup() {
 *   let cnv = createCanvas(100,100);
 *   cnv.mousePressed(makeNoise);
 *   fill(255, 0, 255);
 * 
 *   filterEffect = new p5.BandPass();
 *   noise = new p5.Noise();
 *   noise.disconnect();
 *   noise.connect(filterEffect);
 *   
 *   fft = new p5.FFT(128);
 *   filterEffect.connect(fft);
 * }
 * 
 * function draw() {
 *   background(220);
 * 
 *   // set the BandPass frequency based on mouseX
 *   let freq = map(mouseX, 0, width, 20, 10000);
 *   freq = constrain(freq, 0, 22050);
 *   filterEffect.freq(freq);
 *   // give the filter a narrow band (lower res = wider bandpass)
 *   filterEffect.res(20);
 * 
 *   // draw filtered spectrum
 *   let spectrum = fft.analyze();
 *   
 *   noStroke();
 *   fill(0, 0, 0);
 *   for (let i = 0; i < spectrum.length; i++) {
 *     let x = map(i, 0, spectrum.length, 0, width);     
 *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
 *     rect(x, height, width / spectrum.length, h )
 *   }
 *   if (!noise.started) {
 *     text('click and drag to change filter\'s center frequency', 10, 20, width - 20);
 *   } else {
 *     text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
 *   }
 * }
 * 
 * function makeNoise() {
 *   noise.start();
 *   noise.amp(0.9, 0.1);
 * }
 * 
 * function mouseReleased() {
 *   noise.amp(0, 0.1);
 * }
 * </code>
 * </div>
 */
class Biquad extends p5soundNode {
  constructor(c = 800, t = "lowpass") {
    super();
    this.type = t;
    this.cutoff = c;
    this.node = new ToneBiquadFilter(this.cutoff, this.type)
    const toneInput  = this.node.input.input ?? this.node.input;
    const toneOutput = this.node.output.output ?? this.node.output;
    this.input.connect(toneInput);
    toneOutput.connect(this.output);
  }
  
  /**
   * Controls either width of a bandpass frequency, or the resonance of a low/highpass cutoff frequency.
   * @method res
   * @for Biquad
   * @param {Number} resonance resonance of the filter. A number between 0 and 100. Values closer to 100 can cause the filter to self-oscillate and become loud!
   * @example
   * <div>
   * <code>
   * let fft, noise, filterEffect;
   *
   *  function setup() {
   *    let cnv = createCanvas(100,100);
   *    textAlign(CENTER);
   *    textWrap(WORD);
   *    textSize(10);
   *    describe('a sketch to help to visualize and study the effects of different filter types.');
   *    cnv.mousePressed(makeNoise);
   *    fill(255, 0, 255);
   *  
   *    filterEffect = new p5.BandPass(8000);
   *    noise = new p5.Noise();
   *    noise.disconnect();
   *    noise.connect(filterEffect);
   *    
   *    fft = new p5.FFT(128);
   *    filterEffect.connect(fft);
   *  }
   *  
   *  function draw() {
   *    background(220);
   *  
   *    // set the BandPass resonance based on mouseX
   *    let resAmt = map(mouseX, 0, width, 0, 99);
   *    filterEffect.res(resAmt);
   *  
   *    // draw filtered spectrum
   *    let spectrum = fft.analyze();
   *    
   *    noStroke();
   *    fill(0, 0, 0);
   *    for (let i = 0; i < spectrum.length; i++) {
   *      let x = map(i, 0, spectrum.length, 0, width);     
   *      let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *      rect(x, height, width / spectrum.length, h )
   *    }
   *    if (!noise.started) {
   *      text('click and drag the mouse to change filter\'s resonance',0, 20, width);
   *    } else {
   *      text('Resonance: ' + round(resAmt), width/2, height/2);
   *    }
   *  }
   *  
   *  function makeNoise() {
   *    noise.start();
   *    noise.amp(0.9, 0.1);
   *  }
   *  
   *  function mouseReleased() {
   *    noise.amp(0, 0.1);
   *  }
   * </code>
   * </div>
   */
  res(r) {
    this.node.Q.value = r;
  }

  /**
   * The gain of the filter in dB units. p5.Filter.gain() controls the gain parameter of a Biquad Filter node
   * @method gain
   * @for Biquad
   * @param {Number} gain gain value in dB units. The gain is only used for lowshelf, highshelf, and peaking filters.
   * @example
   * <div>
   * <code>
   * let fft, noise, filterEffect;
   *
   * function setup() {
   *   let cnv = createCanvas(100,100);
   *   cnv.mousePressed(makeNoise);
   *   fill(255, 0, 255);
   *   
   *   filterEffect = new p5.Biquad(8000, "highshelf");
   *   noise = new p5.Noise();
   *   noise.disconnect();
   *   noise.connect(filterEffect);
   *   
   *   fft = new p5.FFT(128);
   *   filterEffect.connect(fft);
   * }
   * 
   * function draw() {
   *   background(220);
   * 
   *   // set the BandPass frequency based on mouseX
   *   let freq = map(mouseX, 0, width, 20, 10000);
   *   freq = constrain(freq, 0, 22050);
   *   filterEffect.freq(freq);
   * 
   *   // set the gain amount of the highshelf filter in decibals
   *   let gainAmt = map(mouseY, 0, height, -12, 12);
   *   filterEffect.gain(gainAmt);
   * 
   *   // draw filtered spectrum
   *   let spectrum = fft.analyze();
   *   
   *   noStroke();
   *   fill(0, 0, 0);
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   *   
   *   if (!noise.started) {
   *     text('click and drag to change filter\'s center frequency', 10, 20, width - 20);
   *   } else {
   *     fill(255);
   *     text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
   *     text('Gain: ' + round(gainAmt)+'dB', 20, 50, width);
   *   }
   * }
   * 
   * function makeNoise() {
   *   noise.start();
   *   noise.amp(0.9, 0.1);
   * }
   * 
   * function mouseReleased() {
   *   noise.amp(0, 0.1);
   * }
   * </code>
   * </div>
   */
  gain(g) {
    this.node.gain.value = g;
  }

  /**
   * Set the type of the filter.
   * @method setType
   * @for Biquad
   * @param {String} type type of the filter. Options: "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", and "peaking." 
   * @example
   * <div>
   * <code>
   * let types = ['lowpass', 'bandpass', 'highpass', 'allpass'];
   * let currentType = 'lowpass';
   * let typeIndex = 0;
   * let filterText = 'Filter Type: ' + currentType;;
   * 
   * function setup(){
   *   createCanvas(400,400);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   describe('a sketch to help to visualize and study the effects of different filter types.');
   *   //for analyzing the sound 
   *   fft = new p5.FFT(256);
   * 
   *   noiseSrc = new p5.Noise('white');
   *   //filter type defaults to 'lowpass'
   *   audioFilter = new p5.Biquad();
   *   noiseSrc.disconnect();
   *   noiseSrc.connect(audioFilter);
   *   audioFilter.connect(fft);
   * }
   * 
   * function draw(){
   *   background(220);
   *   let spectrum = fft.analyze();
   *   
   *   noStroke();
   *   fill(0, 0, 0);
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.025, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   * 
   *   //change the center frequency of the filter
   *   centerFreq = map(mouseX, 0, width, 0, 18000)
   *   audioFilter.freq(centerFreq);
   *   
   *   text('click to play', 0, 20, width, 20);
   *   text('Frequency: ' + centerFreq.toFixed(0), 0, 30, width, 20);
   *   text(filterText, 0, 40, width, 20);
   * }
   * 
   * function mousePressed() {
   *   noiseSrc.start();
   *   typeIndex = (typeIndex + 1) % types.length;
   *   currentType = types[typeIndex];
   *   //change the type of the filter
   *   audioFilter.setType(currentType);
   *   filterText = 'Filter Type: ' + currentType;
   * }
   * </code>
   * </div>
   */
  setType(t) {
    this.node.type = t;
  }

  /**
   * Set the cutoff frequency of the filter.
   * @method freq
   * @for Biquad
   * @param {Number} cutoffFrequency the cutoff frequency of the filter.
   * @example
   * <div>
   * <code>
   * let fft, noise, filterEffect;
   * 
   *  function setup() {
   *    let cnv = createCanvas(100,100);
   *    cnv.mousePressed(makeNoise);
   *    fill(255, 0, 255);
   *  
   *    filterEffect = new p5.BandPass();
   *    noise = new p5.Noise();
   *    noise.disconnect();
   *    noise.connect(filterEffect);
   *    
   *    fft = new p5.FFT(128);
   *    filterEffect.connect(fft);
   *  }
   *  
   *  function draw() {
   *    background(220);
   *  
   *    // set the BandPass frequency based on mouseX
   *    let freq = map(mouseX, 0, width, 20, 10000);
   *    freq = constrain(freq, 0, 22050);
   *    filterEffect.freq(freq);
   *    // give the filter a narrow band (lower res = wider bandpass)
   *    filterEffect.res(50);
   *  
   *    // draw filtered spectrum
   *    let spectrum = fft.analyze();
   *    
   *    noStroke();
   *    fill(0, 0, 0);
   *    for (let i = 0; i < spectrum.length; i++) {
   *      let x = map(i, 0, spectrum.length, 0, width);     
   *      let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *      rect(x, height, width / spectrum.length, h )
   *    }
   *    if (!noise.started) {
   *      text('click and drag to change filter\'s center frequency', 10, 20, width - 20);
   *    } else {
   *      text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
   *    }
   *  }
   *  
   *  function makeNoise() {
   *    noise.start();
   *    noise.amp(0.9, 0.1);
   *  }
   *  
   *  function mouseReleased() {
   *    noise.amp(0, 0.1);
   *  }
   * </code>
   * </div>
   */
  freq(f) {
    this.node.frequency.value = clamp(f, 0, 22050);
  }
}

/**
 * Creates a Lowpass Biquad filter. A shorthand or explicit way of defining a lowpass audio filter.
 * @class LowPass
 * @constructor
 * @extends Biquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 * @example
 * <div>
 * <code>
 * let fft, noise, filterEffect;
 *
 * function setup() {
 *   let cnv = createCanvas(100,100);
 *   cnv.mousePressed(makeNoise);
 *   fill(255, 0, 255);
 * 
 *   //creates a LowPass filter
 *   filterEffect = new p5.LowPass();
 *   noise = new p5.Noise();
 *   noise.disconnect();
 *   noise.connect(filterEffect);
 *   
 *   fft = new p5.FFT(128);
 *   filterEffect.connect(fft);
 * }
 * 
 * function draw() {
 *   background(220);
 * 
 *   // set the BandPass frequency based on mouseX
 *   let freq = map(mouseX, 0, width, 20, 10000);
 *   freq = constrain(freq, 0, 22050);
 *   filterEffect.freq(freq);
 * 
 *   // draw filtered spectrum
 *   let spectrum = fft.analyze();
 *   
 *   noStroke();
 *   fill(0, 0, 0);
 *   for (let i = 0; i < spectrum.length; i++) {
 *     let x = map(i, 0, spectrum.length, 0, width);     
 *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
 *     rect(x, height, width / spectrum.length, h )
 *   }
 *   if (!noise.started) {
 *     text('click and drag to change filter\'s center frequency', 10, 20, width - 20);
 *   } else {
 *     fill(255);
 *     text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
 *   }
 * }
 * 
 * function makeNoise() {
 *   noise.start();
 *   noise.amp(0.9, 0.1);
 * }
 * 
 * function mouseReleased() {
 *   noise.amp(0, 0.1);
 * }
 * </code>
 * </div>
 */
class LowPass extends Biquad {
  constructor(frequency) {
    super(frequency);
    this.node.type = "lowpass";
  }
}

/**
 * Creates a Highpass Biquad filter. A shorthand or explicit way of defining a highpass audio filter.
 * @class HighPass
 * @constructor
 * @extends Biquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 * @example
 * <div>
 * <code>
 * let fft, noise, filterEffect;
 *
 * function setup() {
 *   let cnv = createCanvas(100,100);
 *   cnv.mousePressed(makeNoise);
 *   fill(255, 0, 255);
 * 
 *   //creates a HighPass filter
 *   filterEffect = new p5.HighPass();
 *   noise = new p5.Noise();
 *   noise.disconnect();
 *   noise.connect(filterEffect);
 *   
 *   fft = new p5.FFT(128);
 *   filterEffect.connect(fft);
 * }
 * 
 * function draw() {
 *   background(220);
 * 
 *   // set the BandPass frequency based on mouseX
 *   let freq = map(mouseX, 0, width, 20, 10000);
 *   freq = constrain(freq, 0, 22050);
 *   filterEffect.freq(freq);
 * 
 *   // draw filtered spectrum
 *   let spectrum = fft.analyze();
 *   
 *   noStroke();
 *   fill(0, 0, 0);
 *   for (let i = 0; i < spectrum.length; i++) {
 *     let x = map(i, 0, spectrum.length, 0, width);     
 *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
 *     rect(x, height, width / spectrum.length, h )
 *   }
 *   if (!noise.started) {
 *     text('click and drag to change filter\'s center frequency', 10, 20, width - 20);
 *   } else {
 *     fill(255);
 *     text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
 *   }
 * }
 * 
 * function makeNoise() {
 *   noise.start();
 *   noise.amp(0.9, 0.1);
 * }
 * 
 * function mouseReleased() {
 *   noise.amp(0, 0.1);
 * }
 * </code>
 * </div>
 */
class HighPass extends Biquad {
  constructor(frequency) {
    super(frequency);
    this.node.type = "highpass";
  }
}

/**
 * Creates a Bandpass Biquad filter. A shorthand or explicit way of defining a bandpass audio filter.
 * @class BandPass
 * @constructor
 * @extends Biquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 * @example
 * <div>
 * <code>
 * let fft, noise, filterEffect;
 *
 * function setup() {
 *   let cnv = createCanvas(100,100);
 *   cnv.mousePressed(makeNoise);
 *   fill(255, 0, 255);
 * 
 *   //creates a BandPass filter
 *   filterEffect = new p5.BandPass();
 *   noise = new p5.Noise();
 *   noise.disconnect();
 *   noise.connect(filterEffect);
 *   
 *   fft = new p5.FFT(128);
 *   filterEffect.connect(fft);
 * }
 * 
 * function draw() {
 *   background(220);
 * 
 *   // set the BandPass frequency based on mouseX
 *   let freq = map(mouseX, 0, width, 20, 10000);
 *   freq = constrain(freq, 0, 22050);
 *   filterEffect.freq(freq);
 * 
 *   // draw filtered spectrum
 *   let spectrum = fft.analyze();
 *   
 *   noStroke();
 *   fill(0, 0, 0);
 *   for (let i = 0; i < spectrum.length; i++) {
 *     let x = map(i, 0, spectrum.length, 0, width);     
 *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
 *     rect(x, height, width / spectrum.length, h )
 *   }
 *   if (!noise.started) {
 *     text('click and drag to change filter\'s center frequency', 10, 20, width - 20);
 *   } else {
 *     fill(255);
 *     text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
 *   }
 * }
 * 
 * function makeNoise() {
 *   noise.start();
 *   noise.amp(0.9, 0.1);
 * }
 * 
 * function mouseReleased() {
 *   noise.amp(0, 0.1);
 * }
 * </code>
 * </div>
 */
class BandPass extends Biquad {
  constructor(frequency) {
    super(frequency);
    this.node.type = "bandpass";
  }
}

export default Biquad;
export { LowPass, HighPass, BandPass };