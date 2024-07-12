let osc, lfo;
let cnv;

function setup() {
  cnv = createCanvas(100, 100);
  cnv.mousePressed(startSound);
  background(220);
  
  osc = new Oscillator('sine');
  lfo = new Oscillator(1);
  lfo.disconnect();
  osc.amp(lfo);
}

function startSound() {
  lfo.start();
  osc.start();
}