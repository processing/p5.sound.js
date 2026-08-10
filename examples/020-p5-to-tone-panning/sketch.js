let sound_location = 0
let panner, synthy

function setup() {
  createCanvas(400, 400)

  // Tone.js is loaded from its own script tag. Hand it p5.sound's audio
  // context before making any Tone.js object, and the two libraries build on
  // one context, so their nodes can be connected to each other.
  Tone.setContext(getAudioContext())

  synthy = new Tone.MonoSynth()
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
