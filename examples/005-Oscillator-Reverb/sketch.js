let osc, reverb;
let playing = false;

function setup() {
  let cnv = createCanvas(100, 100);
  background(220);
  cnv.mousePressed(playSound);
  osc = new p5.Oscillator();
  reverb = new p5.Reverb();
  osc.disconnect();
  osc.connect(reverb);
  textAlign(CENTER);
  text('click to play', width/2, 20);
}

function playSound() {
  if (!playing) {
    osc.start();
    playing = true;
  } 
  else {
    osc.stop();
    playing = false;
  }
}

function draw() { 
  osc.freq(map(mouseX, 0, width, 100, 1000));
}