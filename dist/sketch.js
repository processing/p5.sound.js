

let soundSource, cnv, filter;

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

  delay = new Biquad(0.5, 0.4);
  soundSource.loop();  
}

function playSound() {
  soundSource.play();
}

function draw() {
  background(220);
  f = map(mouseX, 0, width, 0, 8000);
  delay.freq(f);
}

