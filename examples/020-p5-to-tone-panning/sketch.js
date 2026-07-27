let sound_location = 0
let panner, synthy

function setup() {
  createCanvas(400, 400)

  // p5.Tone is the Tone.js library that ships inside p5.sound. Using it keeps
  // one Tone.js on the page, so its nodes are already on p5.sound's audio
  // context and no context sharing is needed.
  synthy = new p5.Tone.MonoSynth()
  panner = new p5.Panner()

  // connect a Tone.js audio node to a p5 sound effect
  panner.setInput(synthy)

  describe('A grey sketch that plays a Tone.js synth through a p5.sound panner. Click to play a note at a random stereo position.')
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
