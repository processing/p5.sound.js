let sound_location = 0
let panner
function setup() {
  createCanvas(400, 400)
  // get and set the "Audio Context"
  ctx = getAudioContext()
  Tone.setContext(ctx)

  synthy = new Tone.MonoSynth()
  panner = new p5.Panner()

  // connect a Tone.js audio node to a p5 sound effect
  //panner.setInput(synthy)
}

function draw() {
  background(220)
  text("sound is here", ((sound_location + 1) * 0.5 ) * width, height/2)
}

function mousePressed() {
  sound_location = random(-1,1)
  panner.pan(sound_location)
  synthy.triggerAttackRelease("D#5", (1.5))
}

