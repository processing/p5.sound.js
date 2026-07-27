let sample, spatializer, x, y, z;

let randomTime = 0;

async function setup() {
  sample = await loadSound("../../sounds/drums.mp3");
  sample.loop(true);
  createCanvas(100, 100, WEBGL);
  
  camera(0, 0, 200);

  angleMode(DEGREES);
  describe("a sketch that plays processes an audio file with a reverb effect.");
  
  spatializer = new p5.Panner3D();
  spatializer.maxDist(100);
  sample.disconnect();
  sample.connect(spatializer);

}

function mousePressed() {
  if (!sample) return;
  if (!sample.isPlaying()) {
    sample.play();
  }
  else {
    x = random(-10, 10);
    y = random(-10, 10);
    z = random(0, 10);

    spatializer.set(x, y, z);
  }
}

function draw() {
  background(220);
  push()
  translate(x, y, z);
  box(5, 5, 5);
  pop()
}
