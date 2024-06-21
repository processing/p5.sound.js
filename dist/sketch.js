let player;

function preload() {
  player = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
}

function setup() {
  describe('A sketch that calculates and displays the length of a sound file using number of samples and sample rate.');
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playSound);
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  player.loop();
  
  //text(info, 0, 20, 100);
}

function playSound() {
  if (!player.isPlaying()) {
    console.log(player.isPlaying());
    player.play();
  }
  else {
    console.log(player.isPlaying())
    player.pause();
  }
  
  
}

function draw() {
  frameRate(10);
  background(220);
  

} 