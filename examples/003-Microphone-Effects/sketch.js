let mic, delay, filty;
let micStarted = false;

function setup() {
  describe('a sketch that accesses the user\'s microphone and connects it to a delay line and filter effect.')
  let cnv = createCanvas(400, 400);
  cnv.mousePressed(startMic);
  background(220);
  
  mic = new p5.AudioIn();
  delay = new p5.Delay(0.74, 0.1);
  filty = new p5.Biquad(600, "bandpass");
  
  mic.disconnect();
  mic.connect(delay);
  delay.disconnect();
  delay.connect(filty);
  
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  
}

function startMic() {
  if (!micStarted) {
      mic.start();
      micStarted = true;
  }
  else {
    mic.stop();
    micStarted = false;
  }

}

function draw() {
  text('click to open mic, watch out for feedback', 0 , 200, 400);
  text('move the mouse to change the delay time', 0 , 220, 400);
  d = map(mouseX, 0, width, 0.1, 0.5);
  delay.delayTime(d);
}