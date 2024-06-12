let sound, amp, cnv;
  
function preload() {
   //replace this sound with something local with rights to distribute
   sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
}

function setup() {
   cnv = createCanvas(100, 100);
   cnv.mousePressed(playSound);
   fill(255);
   textAlign(CENTER);
   amp = new Amplitude();
   sound.connect(amp);
}

function playSound() {
   sound.play();
}

function draw() {
   let level = amp.getLevel();
   level = map(level, 0, 0.2, 0, 255);
   background(level, 0, 0);
   
   text('tap to play', width/2, 20);
   describe('The color of the background changes based on the amplitude of the sound.');
}