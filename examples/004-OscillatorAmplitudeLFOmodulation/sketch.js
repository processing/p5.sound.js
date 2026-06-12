let osc, lfo;

function setup() {
  describe(
    "a sketch that demonstrates amplitude modulation with an LFO and sine tone"
  );
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(startSound);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);

  osc = new p5.Oscillator("sine");
  lfo = new p5.Oscillator(1);
  lfo.disconnect();
  osc.amp(lfo);
}

function startSound() {
  lfo.start();
  osc.start();
}

function draw() {
  background(220);
  text("click to play sound", 0, height / 2 - 20, 100);
  text("control lfo with mouseX position", 0, height / 2, 100);

  let freq = map(mouseX, 0, width, 0, 10);
  lfo.freq(freq);
}
