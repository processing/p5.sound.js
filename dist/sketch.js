let player;

function preload() {
  player = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
}

function setup() {
  describe('A sketch that pauses and resumes sound file playback.');
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playSound);
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  background(220);
  text('click to play', 0, 20, 100);
  
  player.loop();
}

function playSound() {
  if (!player.isPlaying()) {
    console.log(player.isPlaying());
    player.play();
    background(220);
    text('click to pause', 0, 20, 100);
  }
  else {
    console.log(player.isPlaying())
    player.pause();
    background(220);
    text('click to play', 0, 20, 100);
  }
}