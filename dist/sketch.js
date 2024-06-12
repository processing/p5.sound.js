let osc;
 
  function setup(){
    let cnv = createCanvas(100,100);
    cnv.mouseClicked(togglePlay);
    fft = new FFT(32);
    osc = new TriOsc(440);
    osc.connect(fft);
  }
  
  function draw(){
    background(220);
    let spectrum = fft.analyze();
    noStroke();
    fill(255, 0, 0);
  
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);     
      let h = -height + map(spectrum[i], 0, 0.1, height, 0);
      rect(x, height, width / spectrum.length, h )
    }
  
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(20);
    
    for (let i = 0; i < waveform.length; i++){
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 0, height);
      vertex(x,y);
    }
    endShape();
    
    textAlign(CENTER);
    text('tap to play', width/2, 20);
    osc.freq(map(mouseX, 0, width, 100, 2000));
  }
  
  function togglePlay() {
    osc.start();
  }