/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { FFT as ToneFFT } from "tone/build/esm/component/analysis/FFT.js";
import { Waveform as ToneWaveform } from "tone/build/esm/component/analysis/Waveform.js";
import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import {P5SoundAnalyzerNode} from "../core/P5SoundAnalyzerNode";

/**
 * Analyze the frequency spectrum and waveform of sounds.
 * @class P5SoundFFT
 * @constructor
 * @param {Number} [fftSize] P5SoundFFT analysis size. Must be a power of two between 16 and 1024. Defaults to 32.
 * @example
 * <div>
 * <code>
 * let osc;
 *
 * function setup(){
 *   let cnv = createCanvas(100,100);
 *   cnv.mouseClicked(togglePlay);
 *   fft = new p5.P5SoundFFT(32);
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
// TODO: Separate FFT and Waveform (separate PR)
export class P5SoundFFT extends P5SoundAnalyzerNode
{
    constructor(fftSize = 32)
    {
        super();

        this._fftSize = fftSize;

        this._toneFFTNode = new ToneFFT
        (
            {
                size: this._fftSize,
                normalRange: true,
            }
        );

        this._samples = new ToneWaveform();

        this._thruNode = new ToneGain();
        this._thruNode.connect(this._toneFFTNode, this._samples);

        this.configureInput(this._thruNode);
    }

    isP5SoundFFT = true;
    
    /**
     * Returns the frequency spectrum of the input signal.
     * @method analysis
     * @for P5SoundFFT
     * @returns {Array} Array of amplitude values from 0 to 1.
     */
    get analysis() { return this._toneFFTNode.getValue(); }
    
    /**
     * Returns an array of sample values from the input audio.
     * @method waveform
     * @for P5SoundFFT
     * @return {Array} Array of sample values from -1 to -1.
     */
    get waveform() { return this._samples.getValue(); }
}