let osc, env;

function setup() {
  let cnv = createCanvas(100, 100);
  background(220);
  cnv.mousePressed(playSound);
  cnv.mouseReleased(stopSound);
  cnv.mouseOut(stopSound);
  textAlign(CENTER);
  textWrap(WORD)
  textSize(10);
  text('tap to trigger attack', 0, 40, 100);

  osc = new p5.Oscillator();
  osc.disconnect();
  env = new p5.Envelope();
  osc.connect(env);
}

function playSound() {
  background(0, 255, 255);
  text('release to trigger release', 0, 40, 100);
  osc.start();
  env.attackTime(random(0.00, 0.25));
  env.triggerAttack(0.5);
}

function stopSound() {
  background(220);
  text('tap to trigger attack', 0, 40, 100);
  env.releaseTime(random(0.1, 0.3));
  env.triggerRelease();
}