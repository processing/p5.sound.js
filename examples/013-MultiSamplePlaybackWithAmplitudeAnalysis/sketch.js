//what if we want a beginning middle and end

let samples = [];
let delay;
let started = false;
let filter;
let cnv;
let button;
let ampy;
let timer;

let paths = [
  "assets/sample_0.mp3",
  "assets/sample_1.mp3",
  "assets/sample_2.mp3",
  "assets/sample_3.mp3",
  "assets/sample_4.mp3",
  "assets/sample_5.mp3",
  "assets/sample_6.mp3",
  "assets/sample_7.mp3",
  "assets/sample_8.mp3",
  "assets/sample_9.mp3",
  "assets/sample_10.mp3",
  "assets/sample_11.mp3",
  "assets/sample_12.mp3",
];
let counter = 0;

function preload() {
  //creates a sound file player "foreach" path
  paths.forEach((path) => {
    let sound = loadSound(path);
    //push soundfile players into array called samples
    samples.push(sound);
  });
}

function setup() {
  cnv = createCanvas(400, 400);
  background(0, 0, 255);
  cnv.mousePressed(startSound);
  textAlign(CENTER);
  fill(220)
  text('click to play', width/2, 20);
  //vary the frameRate to create variations in sample triggers
  //frameRate(10 + random(-4, 10));
  ampy = new p5.Amplitude();
  delay = new p5.Delay();
  delay.delayTime(0.256);
  delay.feedback(0.6);
  filter = new p5.Biquad();

  samples.forEach((sound) => {
    sound.amp(0.2);
    sound.disconnect();
    sound.connect(filter);
  });

  filter.disconnect();
  filter.connect(delay);
  delay.connect(ampy);
  ampy.smooth(0.9)
}

function draw() {
  let frequency = constrain(map(mouseX, 0, width, 400, 1200), 600, 20000);
  let resonance = map(mouseY, height, 0, 5, 15);
  filter.res(resonance);
  filter.freq(frequency);
  if (started) {
    counter += 1;
    if (counter % 100 == 0) {
      samples[0].play();
    }
    if (counter % 10 == 0 && random() > 0.2) {
      let s = random(samples);
      s.play();
    }
    background(0, 0, map(mouseX, 0, width, 0, 255));
    fill(255, 0, 20)
    noStroke();
    circle(width/2, height/2, ampy.getLevel() * 250 + 130);
  }
  
  
}

function startSound() {
  if (!started) {
    started = true;
  } else {
    started = false;
  }
}
