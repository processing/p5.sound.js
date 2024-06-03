let osc;
let cnv;
let mic; 
let meter;
let delay;
let env;
let pan;
let fft;

function setup() {
    cnv = createCanvas(400, 400);
    fft = new FFT();
    cnv.mousePressed(playSound);
    background(220);
    pan = new Panner();
    osc = new Oscillator();
    //env = new Envelope(0.1, 0.1, 1.0, 0.1);
    //delay = new Delay();
    //osc = new SawOsc();
    //console.log('osc', osc);
    //osc.setType('square');
    //mic = new AudioIn();
    //meter = new Amplitude();
    
    //mic.disconnect();
    //mic.connect(meter);
    //mic.connect(delay);
    //osc.disconnect();
    //console.log(fft);
    //osc.connect(fft);
    //env.connect(meter);
    //env.connect(delay);
    
}

function playSound() {
    //mic.start();
    osc.start();
    //env.play();
    //console.log('play');
}

function draw() {
    background(220);
    //color = map(meter.getLevel(), 0, 1, 0, 255);
    //osc.freq(map(mouseX, 0, width, 100, 1000));
    //fill(color);
    //ellipse(width/2, height/2, 100, 100);
    let spectrum = fft.analyze();
    console.log(spectrum);
    for (let i = 0; i < spectrum.length; i++) {
        rect(0 + i * 10, spectrum[i] * 100, 10, spectrum[i]);
    }
}