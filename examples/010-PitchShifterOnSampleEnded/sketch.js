let cnv, soundFile, pitchShifter;
let shifts = [-1, 1, 2, -2, 8, 4];
 
async function setup() {
  describe('a sketch that loops a sample of a guitar note, each time the note is played the pitch is shifted');
  cnv = createCanvas(100, 100);
  soundFile = await loadSound('assets/gtrSample.mp3');
  cnv.mousePressed(startSound);
  background(220);
  textAlign(CENTER);
  textSize(9);
  textWrap(WORD)
  text('click to play sound', width/2, height/2);
  pitchShifter = new p5.PitchShifter();
  soundFile.disconnect();
  soundFile.connect(pitchShifter);
  //soundFile.loop()
  //change the pitch and retrigger sample when done playing
  soundFile.onended(changePitch);
}

function startSound () {
  soundFile.play();
}
 
function changePitch () {
  let pitchValue = random(shifts);
  background(220);
  text(`soundfile finished playing and pitch has shifted to ${pitchValue}!`, 0, 20, 100);
  pitchShifter.shift(pitchValue);
  //soundFile.play();
}
