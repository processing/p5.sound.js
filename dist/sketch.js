let soundSource, cnv, btn;

function preload() {
  soundSource = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
}

function setup() {
  describe(
    'a sketch that says click to play sound. there is a button that says load sound. when you click the button, the path of the sound file player changes and the new sound plays.');
  cnv = createCanvas(100, 100);
  cnv.mousePressed(playSound);
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  text('click to play sound or the button to load a new sound', 0, 20, 100);
  btn = createButton('New Sound');
  btn.mousePressed(setNewPath);
  soundSource.loop();  
}

function playSound() {
  soundSource.play();
}

function setNewPath() {
  background(220);
  text('a new sound was loaded', 0, 20, 100);
  soundSource.setPath('https://tonejs.github.io/audio/berklee/gong_2.mp3', playSound); 
}

