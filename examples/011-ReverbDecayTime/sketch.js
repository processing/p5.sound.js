let noise, osc, env, reverb;
let randomTime = 0;

function setup() {
  describe("a sketch that plays a quick burst of noise through a reverb effect when clicked. each time the decay time of the reverb is changed.");
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playSound);
  
  noise = new p5.Noise();
  env = new p5.Envelope(0, 0.1);
  reverb = new p5.Reverb();
  noise.disconnect();
  noise.connect(env);
  env.disconnect();
  env.connect(reverb);
  
  
  textAlign(CENTER);
}

function playSound() {
  noise.start();
  randomTime = random(0.1, 3);
  reverb.set(randomTime);
  env.play();
}

function draw() {
  background(220);
  text("click to play", width / 2, 20);
  text("decay " + round(randomTime, 2), width / 2, 40);
}
