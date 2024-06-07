let noise, env, reverb;
let randomTime = 0;
  
function setup() {
   let cnv = createCanvas(100, 100);
   cnv.mousePressed(playSound);
   noise = new Noise();
   env = new Envelope(0.01, 0.0, 0.1, 1.2);
   reverb = new Reverb(2000);
   noise.disconnect();
   noise.connect(env);
   env.disconnect();
   env.connect(reverb);
   noise.start();
   textAlign(CENTER);
   text('click to play', width/2, 20);
}

function playSound() {
   randomTime = random(0.1, 3);
   reverb.set(randomTime);
   env.play();
}

function draw() {
   background(220);
   text('click to play', width/2, 20);
   text('decay ' + round(randomTime, 2), width/2, 40);
}