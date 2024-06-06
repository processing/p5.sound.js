import * as Tone from "tone";

/**
 *  <a href="/reference/#/Oscillator">Oscillator</a> 
 *  <p>Creates an oscillator.</p>
 *  @class Oscillator
 *  @constructor
 *  @param {Number} [freq] frequency defaults to 440Hz
 *  @param {String} [type] type of oscillator. Options:
 *                         'sine' (default), 'triangle',
 *                         'sawtooth', 'square'
 *  @example
 *  <div>
 *  <code>
 *  let osc, playing, freq, amp;
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(playOscillator);
 *    osc = new Oscillator();
 *  }
 *
 *  function draw() {
 *    background(220)
 *    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
 *    //amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
 *
 *    text('tap to play', 20, 20);
 *    text('freq: ' + freq, 20, 40);
 *    //text('amp: ' + amp, 20, 60);
 *
 *    if (playing) {
 *      // smooth the transitions by 0.1 seconds
 *      osc.freq(freq);
 *      //osc.amp(amp);
 *    }
 *  }
 *
 *  function playOscillator() {
 *    // starting an oscillator on a user gesture will enable audio
 *    // in browsers that have a strict autoplay policy.
 *    // See also: userStartAudio();
 *    osc.start();
 *    playing = true;
 *  }
 *
 *  function mouseReleased() {
 *    // ramp amplitude to 0 over 0.5 seconds
 *    //osc.amp(0, 0.5);
 *    playing = false;
 *  }
 *  </code> </div>
 */
class Oscillator {
  constructor(frequency, type) {
    if (frequency && typeof frequency === "number") {
      this.frequency = frequency;
    } else if (typeof frequency === "undefined"){
      this.frequency = 440;
    }
    if (typeof type === "string") {
      this.type = type;
    }
    if (typeof type === "undefined") {
      this.type = "sine";
    } 
    this.osc = new Tone.Oscillator().toDestination();
    this.osc.frequency.value = this.frequency;
    this.osc.type = this.type;
    this.osc.volume.value = -10;
  }

  freq(f) {
    this.osc.frequency.value = f;
  }

  setType(t) {
    this.osc.type = t;
  }

  connect(destination) {
    this.osc.connect(destination.getNode());
  }

  volume(v) {
    this.osc.volume.value = v;
  }

  disconnect() {
    this.osc.disconnect(Tone.Context.destination);
  }

  start() {
    this.osc.start();
  }

  stop() {
    this.osc.stop();
  }
}

class SawOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "sawtooth";
  }
}

class SqrOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "square";
  }
}

class TriOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "triangle"
  }
}

class SinOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};