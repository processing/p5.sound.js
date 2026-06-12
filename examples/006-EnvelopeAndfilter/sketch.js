let osc;
let env;
let noiseGen;
let lowPass;

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
  
  noiseGen = new p5.Noise('white');
  noiseGen.disconnect();
  noiseGen.connect(lowPass)
}

function draw(){
  let cutoff = map(mouseY, height, 0, 300, 20000)
  //pitch = map(mouseX, 0, width, 90, 2000)
  lowPass.freq(cutoff) 
}

function playSound() {
  noiseGen.start()
  background(0, 255, 255);
  text('release to stop noise', 0, 40, 100);
}

function stopSound() {
  background(220);
  noiseGen.stop()
  text('tap to start noise', 0, 40, 100);
}