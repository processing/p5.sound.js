// let sound_location = 0

// function setup() {
//   createCanvas(400, 400)
//   // get and set the "Audio Context"
//   ctx = getAudioContext()
//   Tone.setContext(ctx)

//   synthy = new Tone.MonoSynth()
//   panny = new p5.Panner()

//   // connect a Tone.js audio node to a p5 sound effect
//   panny.setInput(synthy)
// }

// function draw() {
//   background(220)
//   text("sound is here", ((sound_location + 1) * 0.5 ) * width, height/2)
// }

// function mousePressed() {
//   sound_location = random(-1,1)
//   panny.pan(sound_location)
//   synthy.triggerAttackRelease("D#5", (1.5))
// }

//physical modelling

let synth, ctx


function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator(440, "sawtooth");
  osc.amp(0.3)
  //disconnect from main ouput
  osc.disconnect()
  //create an envelope for the volue
  env = new p5.Envelope()
  //connect the osc to envelope
  osc.connect(env)
  
  ctx = getAudioContext()
  
  Tone.setContext(ctx)
  
  
  synth = new Tone.MembraneSynth();


  
  
  
  
  rev = new p5.Reverb(3)
  
  env.disconnect()
  env.connect(rev)
}

function draw() {
  background(220);
}

function mousePressed() {
  console.log('mousewas clicked')
  //play osc and env
  osc.start();
  env.play();
  synth.triggerAttackRelease("C2", "8n");
}