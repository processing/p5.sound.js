let noise, env, cnv;
let types = ['white', 'pink', 'brown'];
let noiseType = 'brown';

function setup() {
  cnv = createCanvas(100, 100);
  textAlign(CENTER);
  cnv.mousePressed(start);
  noise = new Noise(noiseType);
  env = new Envelope(0.01, 0.1, 0.15, 0.5);
  noise.disconnect();
  noise.connect(env);
  noise.start();
}

function start() {
  noiseType = random(types);
  noise.type(noiseType);
  env.play();
}

function draw() {
  background(noiseType);
  text('tap to play', width/2, 20);
  let txt = 'type: ' + noiseType;
  text(txt, width/2, 40);
}