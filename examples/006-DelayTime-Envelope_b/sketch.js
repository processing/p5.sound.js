let osc, osc2, os3, delay, env, ampy, started = false;
let lfo1, lfo2, lfo3;
function setup() {
  let cnv = createCanvas(400, 400);
  background(220);
  textAlign(CENTER);
  textSize(13);
  text('click and drag mouse', width/2, 150);
  lfo1 = new p5.Oscillator('sine', 0.1);
  lfo2 = new p5.Oscillator('sine', 0.3);
  lfo3 = new p5.Oscillator('sine', 0.4);
  lfo1.disconnect();
  lfo2.disconnect();
  lfo3.disconnect();
  osc = new p5.Oscillator('sawtooth');
  osc.amp(lfo1);
  osc2 = new p5.Oscillator('sawtooth');
  osc2.amp(lfo2);
  osc3 = new p5.Oscillator('sawtooth');
  osc3.amp(lfo3);
  env = new p5.Envelope(0.01);
  delay = new p5.Delay(0.12, 0.7);
  ampy = new p5.Amplitude();
  osc.disconnect();
  osc.connect(env);
  osc2.disconnect();
  osc2.connect(env);
  osc3.disconnect();
  osc3.connect(env);
  env.disconnect();
  env.connect(delay);
  delay.connect(ampy);
  cnv.mousePressed(oscStart);
  cnv.mouseReleased(oscStop);
  cnv.mouseOut(oscStop);
  describe('Click and release or hold, to play a square wave with delay effect.');
}

function oscStart() {
  osc3.start();
  osc2.start();
  osc.start();
  lfo3.start();
  lfo2.start();
  lfo1.start();
  env.triggerAttack();
  started = true;
}

function oscStop() {
  
  
  env.triggerRelease();
  started = false;
} 

  
function draw() {
  background(220)
  let pitch = map(mouseY, height, 0, 440, 880)
  osc.freq(pitch)
  osc2.freq((pitch / 2) - 1)
  osc2.freq((pitch * 2) + 3)
  let dtime = map(mouseX, 0, width, 0.1, 0.5);
  delay.delayTime(dtime);
  push();
  noStroke();
  fill(240, 255, 240);
  circle(width/2, height/2, map(ampy.getLevel() * 9, 0, 1, 45, 100 ) + 85)
  pop();
  if(!started) {
    text('click and drag mouse', width/2, 150);
    
  }
  else {
    text('release to hear delay', width/2, 150);
  }
  
}