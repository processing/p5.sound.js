//mixolydian
let scale = [100, 112.5, 125, 133.3, 150, 166.6, 175, 200]
let osc
let del

//this runs once 
function setup() {
  createCanvas(100, 100);
  background(240);
  osc = new p5.Oscillator()
  osc.amp(0.5);
  del = new p5.Delay(0.250, 0.7)
  osc.setType('triangle')
  osc.disconnect();
  osc.connect(del)
  
  osc.start()
  frameRate(1)
}

//this runs once per frame, at framerate 
function draw() {
  let speed = map(mouseX, 0, width, 0.25, 3)
  let ampy = map(mouseY, height, 0, 0.1, 0.5);
  frameRate(speed)
  osc.freq(random(scale) * 2, 0);
  osc.amp(ampy);
}