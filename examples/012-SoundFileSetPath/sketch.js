//this sketch demonstrates how to change the path of a sound file that was loaded in with loadSound()
let soundSource, cnv, btn;

async function setup() {
  describe(
    "a sketch that says click to play sound. there is a button that says load sound. when you click the button, the path of the sound file player changes and the new sound plays.");
  cnv = createCanvas(100, 100);
  soundSource = await loadSound("https://tonejs.github.io/audio/berklee/gong_1.mp3");
  cnv.mousePressed(playSound);
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  text("click to play sound or the button to load a new sound", 0, 20, 100);
  btn = createButton("New Sound");
  btn.position(6, 65);
  btn.mousePressed(setNewPath);
  soundSource.loop();
}

function playSound() {
  soundSource.play();
}

function setNewPath() {
  background(220);
  text("a new sound was loaded", 0, 20, 100);
  soundSource.setPath(    "https://tonejs.github.io/audio/berklee/gong_2.mp3",
    playSound
  );
}
