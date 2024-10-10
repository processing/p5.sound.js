/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { FFT as ToneFFT } from "tone/build/esm/component/analysis/FFT.js";
import { Waveform as ToneWaveform } from "tone/build/esm/component/analysis/Waveform.js";
import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";

/**
 * Analyze the frequency spectrum and waveform of sounds.
 * @class p5.FFT
 * @constructor
 * @param {Number} [fftSize] FFT anaylsis size. Must be a power of two between 16 and 1024. Defaults to 32.
 * @example
 * <div>
 * <code>
 * let osc;
 *
 * function setup(){
 *   let cnv = createCanvas(100,100);
 *   cnv.mouseClicked(togglePlay);
 *   fft = new p5.FFT(32);
 *   osc = new p5.TriOsc(440);
 *   osc.connect(fft);
 * }
 * 
 * function draw(){
 *   background(220);
 *   let spectrum = fft.analyze();
 *   noStroke();
 *   fill(255, 0, 0);
 * 
 *   for (let i = 0; i < spectrum.length; i++) {
 *     let x = map(i, 0, spectrum.length, 0, width);     
 *     let h = -height + map(spectrum[i], 0, 0.1, height, 0);
 *     rect(x, height, width / spectrum.length, h )
 *   }
 * 
 *   let waveform = fft.waveform();
 *   noFill();
 *   beginShape();
 *   stroke(20);
 *   
 *   for (let i = 0; i < waveform.length; i++){
 *     let x = map(i, 0, waveform.length, 0, width);
 *     let y = map( waveform[i], -1, 1, 0, height);
 *     vertex(x,y);
 *   }
 *   endShape();
 *   
 *   textAlign(CENTER);
 *   text('tap to play', width/2, 20);
 *   osc.freq(map(mouseX, 0, width, 100, 2000));
 *   describe('The sketch displays the frequency spectrum and waveform of the sound that plays.');
 * }
 * 
 * function togglePlay() {
 *   osc.start();
 * }
 * </code>
 * </div>
 */
class FFT {
    constructor(fftSize = 32) {
        this.fftSize = fftSize;
        this.analyzer = new ToneFFT({
            size: this.fftSize,
            normalRange: true,
        });
        this.samples = new ToneWaveform();
        //creates a single gain node to connect to for the analyzer and waveform
        this.gain = new ToneGain(1);
        this.gain.connect(this.analyzer);
        this.gain.connect(this.samples);
    }

    //return the gain node which is the parent node to the analyzer and waveform
    getNode() {    
        return this.gain;
    }
    
    /**
     * Returns the frequency spectrum of the input signal.
     * @method analyze
     * @for FFT
     * @returns {Array} Array of amplitude values from 0 to 1.
     */
    analyze() {
        return this.analyzer.getValue();
    }
    
    /**
     * Returns an array of sample values from the input audio.
     * @method waveform
     * @for FFT
     * @return {Array} Array of sample values from -1 to -1.
     */
    waveform() {
        return this.samples.getValue();
    }
}

export default FFT;