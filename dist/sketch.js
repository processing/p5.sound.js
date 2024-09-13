
let osc, lfo;
let cnv;



async function setup() {
  
  

  cnv = createCanvas(100, 100);
  cnv.mousePressed(startSound);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  
  osc = new Oscillator('sine');
  lfo = new Oscillator(1);
  lfo.disconnect();
  osc.amp(lfo);
  lfo.start();
  osc.start();
  //osc.disconnect();
  let p5_context = getAudioContext();
  let rawPatcher = await fetch("rnbo.shimmerev.json");
  let patcher = await rawPatcher.json();

  let device = await RNBO.createDevice({ p5_context, patcher });

  // This connects the device to audio output, but you may still need to call context.resume()
  // from a user-initiated function.
  device.node.connect(p5_context.destination);

  
  console.log(p5_context);
  p5_context = context;
  console.log(p5_context);
  osc.start();
  console.log(osc);
  console.log(device.node);
  osc.disconnect();
  osc.connect(device.node);
}

function startSound() {
  userStartAudio();
}

function draw(){
  background(220);
  text('click to play sound', 0, height/2 - 20, 100);
  text('control lfo with mouseX position', 0, height/2, 100);

  let freq = map(mouseX, 0, width, 0, 10);
  lfo.freq(freq);
}