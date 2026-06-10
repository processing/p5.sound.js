let osc, playing, freq, amp;
let scale = [261.6, 311.1, 349.2, 370, 392, 466.2]

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sawtooth');
}

function draw() {
  background(220)
  freq = scale[floor(map(mouseX, 0, width, 0, 5))];
  
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  if (playing == true) {
    osc.freq(freq);
    osc.amp(amp);
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  osc.start();
  playing = true;
}