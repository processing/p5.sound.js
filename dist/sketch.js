
let osc, lfo;
let cnv;

function setup() {
  cnv = createCanvas(100, 100);
  cnv.mousePressed(startSound);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  
  osc = new Oscillator('sine');
  lfo = new Oscillator(1);
  lfo.disconnect();
  osc.amp(lfo);
  lfo.start();
  osc.start();
}

function startSound() {
  userStartAudio();
}

function draw(){
  background(220);
  text('click to play sound', 0, height/2 - 20, 100);
  text('control lfo with mouseX position', 0, height/2, 100);

  let freq = map(mouseX, 0, width, 0, 10);
  lfo.freq(freq);
}