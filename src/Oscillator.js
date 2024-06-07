import * as Tone from "tone";

/** 
 * Creates an oscillator.
 * @class Oscillator
 * @constructor
 * @param {Number} [freq] frequency defaults to 440Hz
 * @param {String} [type] type of oscillator. Options:
 *                        'sine' (default), 'triangle',
 *                        'sawtooth', 'square'
 * @example
 * <div>
 * <code>
 * let osc, playing, freq, amp;
 *
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playOscillator);
 *   osc = new Oscillator();
 * }
 *
 * function draw() {
 *   background(220)
 *   freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
 *   //amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
 *   text('tap to play', 20, 20);
 *   text('freq: ' + freq, 20, 40);
 *   //text('amp: ' + amp, 20, 60);
 *
 *   if (playing) {
 *     // smooth the transitions by 0.1 seconds
 *     osc.freq(freq);
 *     //osc.amp(amp);
 *   }
 * }
 *
 * function playOscillator() {
 *   // starting an oscillator on a user gesture will enable audio
 *   // in browsers that have a strict autoplay policy.
 *   osc.start();
 *   playing = true;
 * }
 *
 * function mouseReleased() {
 *   // ramp amplitude to 0 over 0.5 seconds
 *   //osc.amp(0, 0.5);
 *   playing = false;
 * }
 * </code> 
 * </div>
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

  /**
   * Adjusts the frequency of the oscillator.
   * @method freq
   * @param {Number} frequency frequency of the oscillator 
   */
  freq(f) {
    this.osc.frequency.value = f;
  }

  /**
   * Sets the type of the oscillator. 
   * @method setType
   * @for Oscillator
   * @param {String} type of the oscillator. Options:
   *                 'sine' (default), 'triangle',
   *                 'sawtooth', 'square'
   */
  setType(t) {
    this.osc.type = t;
  }

  /**
   *  Returns current type of oscillator eg. 'sine', 'triangle', 'sawtooth' or 'square'.
   *  @method  getType
   *  @for Oscillator
   *  @returns {String} type of oscillator  eg. 'sine', 'triangle', 'sawtooth' or 'square'.
  */
  getType() {
    return this.oscillator.type;
  }

  /**
   * Connects the oscillator to a destination for processing.
   * @method connect
   * @for Oscillator
   * @param {Object} unit A p5.sound processor or modulation index.
   * @example
   * <div>
   * <code>
   * let osc, reverb;
   * let playing = false;
   *
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   cnv.mousePressed(playSound);
   *   osc = new Oscillator();
   *   reverb = new Reverb();
   *   osc.disconnect();
   *   osc.connect(reverb);
   *   stroke(0);
   *   textAlign(CENTER);
   *   text('click to play', width/2, 20);
   * }
   *
   * function playSound() {
   *   if (!playing) {
   *     osc.start();
   *     playing = true;
   *   } 
   *   else {
   *     osc.stop();
   *     playing = false;
   *   }
   * }
   *
   * function draw() { 
   *   osc.freq(map(mouseX, 0, width, 100, 1000));
   * }
   * </code>
   * </div>
   */
  connect(destination) {
    this.osc.connect(destination.getNode());
  }

  volume(v) {
    this.osc.volume.value = v;
  }

  /**
   * Disconnects the oscillator from the output destination.
   * @method disconnect
   * @for Oscillator
   */
  disconnect() {
    this.osc.disconnect(Tone.Context.destination);
  }

  /**
   * Starts the oscillator. Usually from user gesture.
   * @method start
   * @for Oscillator
   * @example
   * <div>
   * <code>
   * let osc;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startOscillator);
   *   osc = new Oscillator();
   * }
   * 
   * function startOscillator() {
   *   osc.start();
   * }
   * </code>
   * </div>
   */
  start() {
    this.osc.start();
  }

  /**
   * Stops the oscillator.
   * @method stop
   * @for Oscillator
   */
  stop() {
    this.osc.stop();
  }
}

/**
 * Creates a sawtooth oscillator.
 * @class SawOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class SawOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "sawtooth";
  }
}

/**
 * Creates a square oscillator.
 * @class SqrOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class SqrOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "square";
  }
}

/**
 * Creates a triangle oscillator.
 * @class TriOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class TriOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "triangle"
  }
}

/**
 * Creates a sine oscillator.
 * @class SinOsc
 * @constructor
 * @extends Oscillator
 * @param {Number} [freq] Set the frequency
 */
class SinOsc extends Oscillator {
  constructor(frequency) {
    super(frequency);
    this.osc.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};