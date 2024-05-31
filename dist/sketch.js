let osc;
let cnv;

function setup() {
    cnv = createCanvas(400, 400);
    cnv.mousePressed(playSound);
    background(220);
    //osc = new Oscillator();
    osc = new SawOsc();
    //console.log('osc', osc);
    //osc.setType('square');
}

function playSound() {
    osc.start();
}

function draw() {
    background(220);
    osc.freq(map(mouseX, 0, width, 100, 1000));
}