let synth, ctx

function setup() {
  createCanvas(400, 400);
  //get the p5.sound.js Audio Context
  ctx = getAudioContext()
  //set the Tone.js Audio Context to match the p5.sound.js context
  Tone.setContext(ctx)
  //create a new MembraneSynth from the Tone.js library
  synth = new Tone.MembraneSynth();
  //create a new p5.sound.js Reverb effect
  rev = new p5.Reverb(3)
  //connect the MembraneSynth to the Reverb
  rev.setInput(synth)
}

function draw() {
  background(220);
}

function mousePressed() {
  synth.triggerAttackRelease("C2", "8n");
}