let sound;
let amp;

async function setup() {
  sound = await loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
  let cnv = createCanvas(400, 400);
  cnv.mousePressed(startSound);
  textAlign(CENTER);
  fill(255);

  amp = new p5.Amplitude();
  sound.connect(amp);
  describe('The color of the background changes based on the amplitude of the sound.');
}
 
function startSound() {
  sound.play();
}
 
function draw() {
  let level = amp.getLevel();
  level = map(level, 0, 0.2, 0, 255);
  background(level, 0, 0);
  text('click to play', width/2, height/2);
}