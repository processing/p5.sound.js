let fft, noise, envelope;

function setup() {
  let cnv = createCanvas(100,100);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  cnv.mousePressed(makeNoise);
  fill(255, 0, 255);

  envelope = new p5.Envelope();
  noise = new p5.Noise();
  noise.disconnect();
  noise.connect(envelope);

  fft = new p5.FFT(128);
  envelope.connect(fft);
}

function draw() {
  background(220);

  // draw the audio spectrum
  let spectrum = fft.analyze();
  noStroke();
  fill(0, 0, 0);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);     
    let h = -height + map(spectrum[i], 0, 0.02, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  text('click to play an enveloped noise burst', 10, 20, width - 20);
}

function makeNoise() {
  noise.start();
  envelope.play();
}