let osc;
let delay;
let reverb;
let biquad;
let panner;
let amplitude;
let delayTime = 1.02;
let mysound;
let haha;
let cnv;

function preload() {
    mysound = loadSound("https://tonejs.github.io/audio/casio/A1.mp3");
}

function setup() {
    cnv = createCanvas(400, 400);
    cnv.mousePressed(playSound);
    background(220);
    let button = createButton('click me');
    button.position(0, 100);
    button.mousePressed(playSound);
    amplitude = new Amplitude();
    panner = new Panner();
    //osc = new SoundFile();
    osc = new Oscillator();
    //osc.type("brown");
    //osc.freq("C5");
    delay = new Delay();
    reverb = new Reverb();
    delay.delayTime(delayTime);
    osc.disconnect();
    osc.connect(panner);
    biquad = new Biquad();
    panner.connect(biquad);
    delay.disconnect();
    biquad.set(10000);
    delay.connect(biquad);
    biquad.connect(reverb);
    reverb.connect(amplitude);
    //amplitude.connect(osc);
    //osc.disconnect();
    //mysound.disconnect();
    //mysound.connect(reverb);
    //osc.connect(amplitude);
    //console.log(amplitude);
    //console.log(reverb);
    //console.log(delay);
}

function playSound() {
    //haha.start();
    //console.log(mysound);
    mysound.disconnect();
    mysound.connect(reverb);
    mysound.start();
    osc.start();
}

function draw() {
    background(220);
    let color = map(amplitude.getLevel(), 0, 0.1, 0, 255);
    //console.log(amplitude.getLevel());
    fill(color, 0, 0);
    ellipse(mouseX, mouseY, 50, 50);
    osc.freq(map(mouseX, 0, width, 100, 1000));
    panner.pan(map(mouseX, 0, width, -1, 1));
}