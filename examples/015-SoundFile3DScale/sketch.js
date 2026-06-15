let player, measure;

async function setup() {
  player = await loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
  describe('A sketch that pauses and resumes sound file playback.');
  let cnv = createCanvas(100, 100, WEBGL);
  measure = new p5.Amplitude();
  player.connect(measure);
  cnv.mousePressed(playSound);
  //text('click to play', 0, 20, 100);
}

function draw() {
  background(220)
  orbitControl();
  let amplitude = measure.getLevel() * 1000;
  // Draw the box.
  let angle = createVector(1, 1, 0);
  rotate(1, angle);
  box(amplitude, amplitude, amplitude);
}
function playSound() {
    player.play();
    //background(220);
    //text('click to pause', 0, 20, 100); 
}