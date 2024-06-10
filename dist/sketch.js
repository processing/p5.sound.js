let sound, amp, cnv;
let osc;
let delay;
function preload() {
  //replace this sound with something local with rights to distribute
  sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
}

function setup() {
  cnv = createCanvas(100, 100);
  cnv.mousePressed(playSound);
  amp = new Amplitude();
  //console.log(amp);
   //osc = new SinOsc();
 delay = new Delay();
   console.log(delay);
   
  
 
  //osc.connect(amp);
  //sound.disconnect();
  
}

function playSound() {
   //osc.start();

  sound.connect(delay);
  delay.connect(amp);
  
  sound.play();
  //sound.connect(amp);
}

function draw() {
  let level = amp.getLevel();
  level = map(level, 0, 0.5, 0, 255);
fill(level, 0, 0);
let dtime = map(mouseX, 0, width, 0, 1);
   console.log(dtime);

   delay.delayTime(dtime);
   let f = map(mouseY, 0, height, 0, .9);
   delay.feedback(f);
   background(level, 0, 0);
   
 }