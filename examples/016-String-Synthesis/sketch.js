///kind of Karplus-Strong string synthesis using p5.sound.js

let noise, lowPass, hiPass, delay, env, gain, damper, delay2, fft;

let frequencies = [440.000, 880.000, 1760.000, 523.251, 1046.502, 587.330, 1174.659, 659.255, 1318.510, 783.991, 1567.982, 880.000, 1760.000];

function setup() {
  let cnv = createCanvas(400, 400);
  background(220);
  textAlign(CENTER);
  textSize(9);
  text('click to pluck', width/2, height/2);
  noise = new p5.Noise('white');
  env = new p5.Envelope(0);
  lowPass = new p5.Biquad(2500, 'lowpass');
  hiPass = new p5.Biquad(55, 'highpass');
  delay = new p5.Delay(0.0005, 0.9);
  gain = new p5.Gain(0.5);
  delay2 = new p5.Delay(0.1, 0.74);
  noise.disconnect();
  noise.connect(hiPass);
  hiPass.disconnect();
  hiPass.connect(env);
  env.disconnect();
  env.connect(delay);
  delay.disconnect();
  delay.connect(lowPass);
  
  lowPass.connect(delay2);

  cnv.mousePressed(pluckStart);
  cnv.mouseReleased(pluckStop);
  cnv.mouseOut(pluckStop);
  describe('A sketch that synthesizes string sounds.');
}

function pluckStart() {
  background(255, 0, 255);
  text('release to trigger decay', width/2, height/2);
  let pitch = (1000 / random(frequencies)) * 0.001; 
  delay.delayTime(pitch, 0);  
  noise.start();
  env.triggerAttack();
}

function pluckStop() {
  background(220);
  text('click to pluck', width/2, height/2);
  env.triggerRelease();
} 
