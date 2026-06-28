let sample, reverb
let randomTime = 0;

async function setup() {
  sample = await loadSound("../../sounds/drums.mp3");
  sample.loop(true);
  let cnv = createCanvas(100, 100);
  describe("a sketch that plays processes an audio file with a reverb effect.");
  cnv.mousePressed(playSound);
  
  reverb = new p5.Reverb(3);
  sample.disconnect();
  sample.connect(reverb);
  
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
}

function playSound() {
  if (!sample.isPlaying()) {
    sample.play();
    randomTime = random(0.1, 3);
    reverb.set(randomTime);
  }
  else {
    randomTime = random(0.1, 8);
    reverb.set(randomTime);
  }
}

function draw() {
  background(220);
  text("click to play sound and change the decay time", 0, 20, width);
  text("Decay Time: " + randomTime.toFixed(2), width / 2, 80);
}
