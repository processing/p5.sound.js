let osc;
let cnv;
let mic; 
let meter;
let delay;
let env;

function setup() {
    cnv = createCanvas(400, 400);
    cnv.mousePressed(playSound);
    background(220);
    osc = new Oscillator();
    env = new Envelope(0.1, 0.1, 0.4, 0.1);
    delay = new Delay();
    //osc = new SawOsc();
    //console.log('osc', osc);
    //osc.setType('square');
    mic = new AudioIn();
    meter = new Amplitude();
    mic.disconnect();
    mic.connect(meter);
    mic.connect(delay);
    osc.disconnect();
    console.log(env);
    console.log(delay);
    osc.connect(env);
    env.connect(meter);
    env.connect(delay);
}

function playSound() {
    //mic.start();
    osc.start();
}

function draw() {
    background(220);
    color = map(meter.getLevel(), 0, 1, 0, 255);
    //console.log(meter.getLevel());
    osc.freq(map(mouseX, 0, width, 100, 1000));
    fill(color);
    ellipse(width/2, height/2, 100, 100);
}