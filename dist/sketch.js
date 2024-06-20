//envelope sketch
let osc, env;

function setup() {
  let cnv = createCanvas(100, 100);
  background(220);
  cnv.mousePressed(playSound);
  cnv.mouseReleased(stopSound);
  textAlign(CENTER);
  textSize(10);
  text('tap to triggerAttack', width/2, height/2);

  osc = new Oscillator(800, 'sawtooth');
  osc = new SawOsc(700);

  osc.disconnect();
  env = new Envelope();
  osc.connect(env);
}

function playSound() {
  background(0, 255, 255);
  text('release to release', width/2, height/2);
  osc.start();
  env.attackTime(random(0.00, 0.25));
  env.triggerAttack(0.5);
}

function stopSound() {
  background(220);
  text('tap to triggerAttack', width/2, height/2);
  env.releaseTime(random(0.1, 0.3));
  env.triggerRelease();
}

//play pause sketch
/*
let osc, env, delay, sound;
let sound2;
let button, button2;
  function preload(){
    sound = loadSound('https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3');
    sound2 = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
  }

  function setup(){
    let cnv = createCanvas(100,100);
  
    button = createButton('samp1');
    button.mousePressed(toggleSample1);
    button.position(19, 19);
    button2 = createButton('samp2');
    button2.mousePressed(toggleSample2);
    button2.position(19, 50);

    sound.amp(0.9); 
    sound.loop();
    sound2.amp(0.9); 
    sound2.loop();
  }
  
  function draw(){
    frameRate(1);
    background(220);
    //let randPos = random(0, sound.duration())
    //console.log(randPos);
    //sound.jump(randPos);
    //let time = sound.currentTime();
    //console.log(time);
  }
  
  function toggleSample1() {
    if (sound.isPlaying()) {
      console.log('pause');
      sound.pause();
    } else {
      sound.play();
    }
  }

  function toggleSample2() {
    if (sound2.isPlaying()) {
      console.log('pause');
      sound2.pause();
    } else {
      sound2.play();
    }
  }*/