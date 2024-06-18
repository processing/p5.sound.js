let osc, env, delay, sound;

  function preload(){
    sound = loadSound('https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3');
  }

  function setup(){
    let cnv = createCanvas(100,100);
    cnv.mouseClicked(togglePlay);
    sound.amp(0.1); 
    sound.loop();
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
  
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
    }
  }