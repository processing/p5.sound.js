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
  text('tap to trigger noise', 0, 40, 100);
  
  lowPass = new p5.Biquad();
  lowPass.res = 79;
  
  noise = new p5.Noise('white');
  noise.disconnect();
  noise.connect(lowPass)
}

function draw(){
  cutoff = map(mouseY, height, 0, 300, 20000)
  //pitch = map(mouseX, 0, width, 90, 2000)
  lowPass.freq(cutoff) 
}

function playSound() {
  noise.start()
  background(0, 255, 255);
  text('release to stop noise', 0, 40, 100);
  
}

function stopSound() {
  background(220);
  noise.stop()
  text('tap to start noise', 0, 40, 100);
  
}