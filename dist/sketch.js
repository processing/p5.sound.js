

let soundSource, cnv, filter;
let started = false;

let rate = 0;

function preload() {
  soundSource = loadSound('assets/eljefe.mp3');
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
  
  delay = new Delay(0.5, 0.4);
  soundSource.disconnect();
  soundSource.connect(delay);
  soundSource.loop();
  soundSource.play(); 
  let context = getAudioContext();
  console.log(context); 
}

function playSound() {
  if (!started) {
    userStartAudio();
    started = true;
  }
  else {
    userStopAudio();
    started = false;
  }
  
}


