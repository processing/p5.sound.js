///kind of Karplus-Strong string synthesis using p5.sound.js
//TODO: implement damping
//click and hold to simulate a string pluck, move the mouse to change filter resonance and cutoff. release mouse to trigger decay.

let noise, lowPass, hiPass, delay, env, gain, damper, delay2, fft;

let plucked = false;

let frequencies = [440.000, 880.000, 220.00, 110];

function setup() {
  let cnv = createCanvas(400, 400);
  background(220);
  textAlign(CENTER);
  textSize(15);
  strokeWeight(.1);
  text('click to pluck', width/2, height/2);
  noise = new p5.Noise('pink');
  env = new p5.Envelope(0);
  lowPass = new p5.Biquad(2500, 'lowpass');
  hiPass = new p5.Biquad(55, 'highpass');
  delay = new p5.Delay(0.0005, 0.9);
  gain = new p5.Gain(0.5);
  delay2 = new p5.Delay(0.1, 0.74);
  
  noise.disconnect(); //disconnect from speakers
  noise.connect(hiPass); //connects to the highpass filter
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
  
  fft = new p5.FFT(32);
  delay2.connect(fft)
}

function pluckStart() {
  
  plucked = true;
  
  let pitch = (1000 / random(frequencies)) * 0.001; 
  delay.delayTime(pitch, 0);  
  noise.start();
  env.triggerAttack();
}

function pluckStop() {
  plucked = false;
  
  env.triggerRelease();
} 

function draw() {
  background(220)
    
  let spectrum = fft.analyze();
  
  fill(255, 0, 0);

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(266);
  strokeWeight(2)
  
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i] * 3, -1, 1, 0, height);
    vertex(y,x);
  }
  endShape();
  
  
  stroke(20);
  strokeWeight(1)
  fill (20)
  strokeWeight(.1)
  if(!plucked) {
    text('click to pluck', width/2, 150);
  }
  else {
    text('release to trigger decay', width/2, 150);
  }
  lowPass.freq(map(mouseY, height, 0, 100, 8000))
  lowPass.res(map(mouseX, width, 0, 30, 0))
}
