let cnv, pitchShifter;
 
async function setup() {
  describe('a sketch that pitches the microphone input up an octave');
  createCanvas(100, 100);
  background(220);
  textAlign(CENTER);
  textSize(9);
  textWrap(WORD)
  text('click to play sound', width/2, height/2);
  mic = new p5.AudioIn();
  pitchShifter = new p5.PitchShifter(12);
  mic.disconnect();
  mic.connect(pitchShifter);
}

function mousePressed () {
  mic.start();
  //shift the input audio up a random number of semitones
  pitchShifter.shift(round(random(1, 12)));
}
