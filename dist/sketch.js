let osc;
let cnv;

function setup() {
    cnv = createCanvas(400, 400);
    cnv.mousePressed(playSound);
    background(220);
    osc = new Oscillator();
    osc.setType('square');
    osc.freq(540);
}

function playSound() {
    osc.start();
}

function draw() {
    background(220);
    osc.freq(map(mouseX, 0, width, 100, 1000));
}