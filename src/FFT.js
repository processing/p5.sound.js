import * as Tone from "tone";

/*
fft example
let osc;

function setup(){
    let cnv = createCanvas(100,100);
    cnv.mouseClicked(togglePlay);
    fft = new FFT(32);
    osc = new TriOsc(440);
    osc.connect(fft);
  }
  
  function draw(){
    background(220);
    let spectrum = fft.analyze();
    
    noStroke();
    fill(255, 0, 0);
    for (let i = 0; i< spectrum.length; i++){
      let x = map(i, 0, spectrum.length, 0, width);
      
      let h = -height + map(spectrum[i], 0, .1, height, 0);
      rect(x, height, width / spectrum.length, h )
    }
  
    let waveform = fft.samples();
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
        let x = map(i, 0, waveform.length, 0, width);
        let y = map( waveform[i], -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();
    
    text('tap to play', 20, 20);
    osc.freq(map(mouseX, 0, width, 100, 2000));
  }
  
  function togglePlay() {
    osc.start();
  }
*/
class FFT {
    constructor(fftSize) {
        if (fftSize === undefined) {
            fftSize = 32;
        }
        this.fftSize = fftSize;
        this.analyzer = new Tone.FFT({
            size: fftSize,
            normalRange: true,
        });
        this.waveform = new Tone.Waveform();
        //creates a single gain node for the analyzer and waveform
        this.gain = new Tone.Gain(1);
        this.gain.connect(this.analyzer);
        this.gain.connect(this.waveform);
    }

    //return the gain node which is the parent node to the analyzer and waveform
    getNode() {    
        return this.gain;
    }
    
    analyze() {
        return this.analyzer.getValue();
    }
    
    //previously called the 'waveform()' method in p5.sound, changed to 'samples()' because Waveform() is a class in Tone.js
    samples() {
        return this.waveform.getValue();
    }
}

export default FFT;