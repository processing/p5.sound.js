let noiseGen, env;
let types = ['white', 'pink', 'brown'];
let noiseType = 'brown';
 
function setup() {
  let cnv = createCanvas(100, 100);
  textAlign(CENTER);
  cnv.mousePressed(startSound);
  noiseGen = new p5.Noise(noiseType);
  env = new p5.Envelope(0.01, 0.1, 0.45, 0.5);
  noiseGen.disconnect();
  noiseGen.connect(env);
}
 
function startSound() {
  noiseType = random(types);
  noiseGen.type(noiseType);
  noiseGen.amp(0.2);
  noiseGen.start();
  env.play();
}
 
function draw() {
  background(noiseType);
  text('tap to play', width/2, 20);
  let txt = 'type: ' + noiseType;
  text(txt, width/2, 40);
}