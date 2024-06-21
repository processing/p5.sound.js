let osc, delay, env;
  
function setup() {
  let cnv = createCanvas(100, 100);
  background(220);
  textAlign(CENTER);
  textSize(9);
  text('click and drag mouse', width/2, height/2);

  osc = new Oscillator('sawtooth');
  osc.amp(0.74);
  env = new Envelope(0.01);
  delay = new Delay(0.12, 0.7);
  
  osc.disconnect();
  osc.connect(env);
  env.disconnect();
  env.connect(delay);

  cnv.mousePressed(oscStart);
  cnv.mouseReleased(oscStop);
  cnv.mouseOut(oscStop);
  describe('Tap to play a square wave with delay effect.');
}

function oscStart() {
  background(0, 255, 255);
  text('release to hear delay', width/2, height/2);
  osc.start();
  env.triggerAttack();
}

function oscStop() {
  background(220);
  text('click and drag mouse', width/2, height/2);
  env.triggerRelease();
} 
  
function draw() {
  
  let dtime = map(mouseX, 0, width, 0.1, 0.5);
  delay.delayTime(dtime);
}