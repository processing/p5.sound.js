let panner, lfo, soundfile, cnv;

function preload() {
  soundfile = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
}

function setup() {
  describe('a sketch that pans a sound source using an LFO.');
  cnv = createCanvas(100, 100);
  background(220);
  cnv.mousePressed(startSound);
  
  panner = new Panner();
  lfo = new Oscillator(1);
  //disconnect lfo from speakers because we don't want to hear it!
  lfo.disconnect();
  panner.pan(lfo);

  soundfile.loop();
  soundfile.disconnect();
  soundfile.connect(panner);
  
}

function startSound() {
  lfo.start();
  soundfile.start();
}