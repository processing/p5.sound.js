
let sound, amp, cnv;
let osc;
let delay;
let filter;
let gain;
let env;
function preload() {
  //replace this sound with something local with rights to distribute
  sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
  //sound = loadSound("assets/el jefe.mp3");
}

function setup() {
  cnv = createCanvas(100, 100);
  cnv.mousePressed(playSound);
  env = new Envelope(0.0);
  gain = new Gain();
  gain.disconnect();
  amp = new Amplitude();
  filter = new Biquad(4000, "lowpass");
  //filter.disconnect();
  
  //console.log(amp);
   //osc = new SinOsc();
   sound.disconnect();
   sound.connect(env);
  delay = new Delay();
  env.connect(delay);
  delay.connect(amp);
  //filter.disconnect();
  //filter.connect(gain);
  //gain.connect(delay);
  //delay.connect(gain);
   //console.log(delay);
   
  
 
  //osc.connect(amp);
  //sound.disconnect();
  
}

function playSound() {
   //osc.start();
   //delay.disconnect();
   //sound.disconnect();
  
  //gain.disconnect();
  //delay.connect(filter);
  //filter.connect(gain);
  //gain.connect(delay);
  //delay.connect(amp)
  
  sound.play();
  env.play();
  //sound.connect(amp);
}

function draw() {
   let level = amp.getLevel();
   level = map(level, 0, 0.1, 0, 255);
   fill(level, 0, 0);
   let dtime = map(mouseX, 0, width, 0, 1);
   delay.delayTime(dtime);
   let f = map(mouseY, 0, height, 0, .9);
   delay.feedback(f);
   background(level, 0, 0);
 }