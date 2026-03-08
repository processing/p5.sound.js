This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  analysis/
    Amplitude.js
    FFT.js
  core/
    p5soundMixEffect.js
    p5soundNode.js
    p5soundSource.js
    Utils.js
  effects/
    Biquad.js
    Delay.js
    Envelope.js
    Gain.js
    Panner.js
    Panner3D.js
    PitchShifter.js
    Reverb.js
  sources/
    AudioIn.js
    Noise.js
    Oscillator.js
    SoundFile.js
  app.js
.gitignore
babel.config.json
LICENSE
package.json
README.md
ROADMAP.md
rollup.config.mjs
yuidoc.json
```

# Files

## File: babel.config.json
````json
{
    "presets": ["@babel/preset-env"]
}
````

## File: rollup.config.mjs
````
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  // Unminified version
  {
    input: 'src/app.js', // Entry point of your library
    output: {
      file: path.resolve('dist', 'p5.sound.js'),
      format: 'iife', // Change to IIFE format
    },
    plugins: [
      resolve(),
      terser({
        compress: {
          dead_code: true,
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          keep_fargs: true,
          hoist_vars: false,
          if_return: true,
          join_vars: false,
          side_effects: true,
          warnings: false
        },
        mangle: false,
        format: {
          beautify: true,
          comments: true,
          indent_level: 2,
          wrap_iife: true
        }
      }),
    ],
    treeshake: {
      preset: 'recommended',
    }
  },
  // Minified version
  {
    input: 'src/app.js', // Entry point of your library
    output: {
      file: path.resolve('dist', 'p5.sound.min.js'),
      format: 'iife', // Change to IIFE format
    },
    plugins: [
      resolve(), // Resolves node_modules
      terser(), // Minify the output
    ],
  }
];
````

## File: src/analysis/Amplitude.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Meter as ToneMeter } from "tone/build/esm/component/analysis/Meter.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Get the current volume of a sound.
 * @class Amplitude
 * @constructor
 * @extends p5soundNode
 * @param {Number} [smoothing] Smooth the amplitude analysis by averaging with the last analysis frame. 0.0 is no time averaging with the last analysis frame.
 * @example
 * <div>
 * <code>
 * let sound, amp, cnv;
 *   
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   sound = loadSound('/assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   textAlign(CENTER);
 *   fill(255);
 *   amp = new p5.Amplitude();
 *   sound.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   let level = amp.getLevel();
 *   level = map(level, 0, 0.2, 0, 255);
 *   background(level, 0, 0);
 *   text('tap to play', width/2, 20);
 *   describe('The color of the background changes based on the amplitude of the sound.');
 * }
 * </code>
 * </div>
 */
class Amplitude extends p5soundNode {
  constructor(smoothing = 0) {
    super();
    this.node = new ToneMeter({normalRange:true, smoothing:smoothing});
  }

  /**
   * Connect an audio source to the amplitude object.
   * @method setInput
   * @for Amplitude
   * @param {Object} input - An object that has audio output.
   */
  setInput(input) {
    input.getNode().connect(this.node);
  }

  /**
   * Get the current amplitude value of a sound.
   * @method getLevel
   * @for Amplitude
   * @return {Number} Amplitude level (volume) of a sound.
   */
  getLevel() {
    return this.node.getValue();
  }

  /**
   * Get the current amplitude value of a sound.
   * @method smooth
   * @for Amplitude
   * @param {Number} Smooth Amplitude analysis by averaging with the last analysis frame. Off by default.
   */
  smooth(s) {
    this.node.smoothing = s;
  }
}

export default Amplitude;
````

## File: src/analysis/FFT.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { FFT as ToneFFT } from "tone/build/esm/component/analysis/FFT.js";
import { Waveform as ToneWaveform } from "tone/build/esm/component/analysis/Waveform.js";
import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { p5soundNode } from "../core/p5soundNode";

/**
 * Analyze the frequency spectrum and waveform of sounds.
 * @class FFT
 * @constructor
 * @extends p5soundNode
 * @param {Number} [fftSize] FFT analysis size. Must be a power of two between 16 and 1024. Defaults to 32.
 * @example
 * <div>
 * <code>
 * let osc;
 *
 * function setup(){
 *   let cnv = createCanvas(100,100);
 *   cnv.mouseClicked(togglePlay);
 *   fft = new p5.FFT(32);
 *   osc = new p5.TriOsc(440);
 *   osc.connect(fft);
 * }
 * 
 * function draw(){
 *   background(220);
 *   let spectrum = fft.analyze();
 *   noStroke();
 *   fill(255, 0, 0);
 * 
 *   for (let i = 0; i < spectrum.length; i++) {
 *     let x = map(i, 0, spectrum.length, 0, width);     
 *     let h = -height + map(spectrum[i], 0, 0.1, height, 0);
 *     rect(x, height, width / spectrum.length, h )
 *   }
 * 
 *   let waveform = fft.waveform();
 *   noFill();
 *   beginShape();
 *   stroke(20);
 *   
 *   for (let i = 0; i < waveform.length; i++){
 *     let x = map(i, 0, waveform.length, 0, width);
 *     let y = map( waveform[i], -1, 1, 0, height);
 *     vertex(x,y);
 *   }
 *   endShape();
 *   
 *   textAlign(CENTER);
 *   text('tap to play', width/2, 20);
 *   osc.freq(map(mouseX, 0, width, 100, 2000));
 *   describe('The sketch displays the frequency spectrum and waveform of the sound that plays.');
 * }
 * 
 * function togglePlay() {
 *   osc.start();
 * }
 * </code>
 * </div>
 */
class FFT extends p5soundNode {
    constructor(fftSize = 32) {
        super();
        this.fftSize = fftSize;
        this.analyzer = new ToneFFT({
            size: this.fftSize,
            normalRange: true,
        });
        this.samples = new ToneWaveform();
        //creates a single gain node to connect to for the analyzer and waveform
        this.node = new ToneGain(1);
        this.node.connect(this.analyzer);
        this.node.connect(this.samples);
    }

    /**
     * Returns the frequency spectrum of the input signal.
     * @method analyze
     * @for FFT
     * @returns {Array} Array of amplitude values from 0 to 1.
     */
    analyze() {
        return this.analyzer.getValue();
    }
    
    /**
     * Returns an array of sample values from the input audio.
     * @method waveform
     * @for FFT
     * @return {Array} Array of sample values from -1 to -1.
     */
    waveform() {
        return this.samples.getValue();
    }
}

export default FFT;
````

## File: src/effects/Gain.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Generate a gain node to use for mixing and main volume.
 * @class Gain
 * @constructor
 * @extends p5soundNode
 * @example
 * <div>
 * <code>
 * let cnv, soundFile, osc, gain;
 * 
 * function preload() {
 *   soundFile = loadSound('assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   background(220);
 *   gain = new p5.Gain(0.74);
 *   osc = new p5.Oscillator();
 *   osc.amp(0.74);
 *   osc.disconnect();
 *   soundFile.loop();
 *   soundFile.disconnect();
 * 
 *   //connect both sound sources to gain node
 *   soundFile.connect(gain);
 *   osc.connect(gain);
 * }
 * 
 * function playSound() {
 *   soundFile.play();
 *   osc.play();
 * }
 * 
 * function draw() {
 *   let level = map(mouseX, 0, width, 0, 1);
 *   gain.amp(level);
 * }
 * </code>
 * </div>
 */
class Gain extends p5soundNode {
  constructor(value = 1) {
    super();
    this.node = new ToneGain(value).toDestination();
  }
}

export default Gain;
````

## File: src/effects/Panner.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Panner as TonePanner} from "tone/build/esm/component/channel/Panner.js";
import { clamp } from '../core/Utils.js';
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * A panning effect.
 * @class Panner
 * @constructor
 * @extends p5soundNode
 * @example
 * <div>
 * <code>
 * let panner, lfo, soundfile, cnv;
 * 
 * function preload() {
 *   soundfile = loadSound('/assets/beat.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   background(220);
 *   cnv.mousePressed(startSound);
 *   
 *   panner = new p5.Panner();
 *   lfo = new p5.Oscillator(1);
 *   //disconnect lfo from speakers because we don't want to hear it!
 *   lfo.disconnect();
 *   panner.pan(lfo);
 * 
 *   soundfile.loop();
 *   soundfile.disconnect();
 *   soundfile.connect(panner);
 *   
 * }
 * 
 * function startSound() {
 *   lfo.start();
 *   soundfile.start();
 * }
 * </code>
 * </div>
 */
class Panner extends p5soundNode {
  constructor() {
    super();
    this.node = new TonePanner(0).toDestination();
  }
  
  /**
   * Pan a sound source left or right.
   * @method pan
   * @for Panner
   * @param {Number, Object} panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or an audio rate signal such as an LFO.
   */
  pan(amount) {
    if (typeof amount === "object") {
      amount.getNode().connect(this.node.pan);
      return;
    }
    this.node.pan.rampTo(clamp(amount, -1, 1), 0.01);
  }
}

export default Panner;
````

## File: src/effects/Panner3D.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Panner3D as TonePanner3D} from "tone/build/esm/component/channel/Panner3D.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * A 3D sound spatializer.
 * @class Panner3D
 * @constructor
 * @extends p5soundNode
 * @example
 * <div>
 * <code>
 * let radius = 10 ; 
 * let soundSource, spatializer;
 * let font;
 * let cnv;
 * 
 * let x = 0;
 * let y = 0;
 * let z = 100;
 * 
 * let vX;
 * let vY;
 * let vZ;
 * 
 * function preload() {
 *   soundSource = loadSound('/assets/beat.mp3');
 *   font = loadFont('/assets/SourceSansPro-Regular.otf');
 * }
 * 
 * function setup() {
 *   describe(
 *     'A 3D shape with a sound source attached to it. The sound source is spatialized using the Panner3D class. Click to play the sound.'
 *   );
 *   cnv = createCanvas(100, 100, WEBGL);
 *   cnv.mousePressed(playSound);
 * 
 *   camera(0, 0, 0, 0, 0, 1);
 *   
 *   textFont(font);
 *   textAlign(CENTER,CENTER);
 *   
 *   angleMode(DEGREES);
 * 
 *   vX = random(-0.5, 0.5);
 *   vY = random(-0.5, 0.5);
 *   vZ = random(-0.5, 0.5) * 1.5;
 * 
 *   spatializer = new p5.Panner3D();
 *   spatializer.maxDist(100);
 *   soundSource.loop();
 *   soundSource.disconnect();
 *   soundSource.connect(spatializer);
 * }
 * 
 * function playSound() {
 *   soundSource.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   push();
 *   textSize(5);
 *   fill(0);
 *   translate(0,0,100);
 *   //text('click to play', 0, 0);
 *   pop();
 *   // Update Box and Sound Source Position
 *   push();
 *   moveSoundBox();
 *   box(5, 5, 5);
 *   pop();
 * }
 * 
 * // Rotate 1 degree per frame along all three axes
 * function moveSoundBox() {
 *   x = x + vX;
 *   y = y + vY;
 *   z = z + vZ;
 * 
 *   if (x > radius || x < -radius) {
 *     vX = -vX;
 *   }
 *   if (y > radius || y < -radius) {
 *     vY = -vY;
 *   }
 *   if (z > 250 || z < 80) {
 *     vZ = -vZ;
 *   }
 *   //set the position of the 3D panner
 *   spatializer.set(x, y, z);
 *   //set the postion of the box
 *   translate(x, y, z);
 *   rotateX(45 + frameCount);
 *   rotateZ(45);
 * }
 * </code>
 * </div>
 */
class Panner3D extends p5soundNode {
  constructor() {
    super();
    this.node = new TonePanner3D({
      coneInnerAngle:360,
      coneOuterAngle:360,
      coneOuterGain:1,
      positionX:0,
      positionY:0,
      positionZ:0,
    }).toDestination();
  }

  /**
   * Connects an input source to the 3D panner.
   * @method process
   * @for Panner3D
   * @param {Object} input an input source to process with the 3D panner.
   */
  process(input) {
    input.getNode().connect(this.node);
  }

  /**
   * Set the x, y, and z position of the 3D panner.
   * @method set
   * @for Panner3D
   * @param {Number} xPosition the x coordinate of the panner.
   * @param {Number} yPosition the y coordinate of the panner.
   * @param {Number} zPosition the z coordinate of the panner.
   */
  set(x, y, z) {
    this.node.positionX.rampTo(x, 0.01);
    this.node.positionY.rampTo(y, 0.01);
    this.node.positionZ.rampTo(z, 0.01);
  }
  
  /**
   * The rolloff rate of the panner.
   * @method setFalloff
   * @for Panner3D
   * @param {Number} rolloffFactor 
   * @param {Number} maxDistance 
   */
  setFalloff(rolloffFactor, maxDistance) {
    this.node.rolloffFactor = rolloffFactor;
    this.node.maxDistance = maxDistance;
  }

  /**
   * Set the maximum distance of the panner.
   * @method maxDist
   * @for Panner3D
   * @param {Number} distance the maximum distance that the sound source can be heard from.
   */
  maxDist(d) {
    this.node.maxDistance = d;
  }

  /**
   * Set the rolloff rate of the panner.
   * @method rolloff
   * @for Panner3D
   * @param {Number} r the rolloff rate of the panner.
   */
  rolloff(r) {
    this.node.rolloffFactor = r;
  }

  /**
   * Set the X position of the sound source.
   * @method positionX
   * @for Panner3D
   * @param {Number} positionX the x position of the sound source.
   */
  positionX(p) {
    this.node.positionX.rampTo(p, 0.01);
  }

  /**
   * Set the Y position of the sound source.
   * @method positionY
   * @for Panner3D
   * @param {Number} positionY the y position of the sound source.
   */
  positionY(p) {
    this.node.positionY.rampTo(p, 0.01);
  }

  /**
   * Set the Z position of the sound source.
   * @method positionZ
   * @for Panner3D
   * @param {Number} positionZ the z position of the sound source.
   */
  positionZ(p) {
    this.node.positionZ.rampTo(p, 0.01);
  }
}

export default Panner3D;
````

## File: src/effects/PitchShifter.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { PitchShift as TonePitchShift } from "tone/build/esm/effect/PitchShift.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Change the pitch of a sound.
 * @class PitchShifter
 * @constructor
 * @extends p5soundNode
 * @example
 * <div>
 * <code>
 *  let cnv, soundFile, pitchShifter;
 *  
 * function preload() {
 *   soundFile = loadSound('/assets/beatbox.mp3');
 * }
 *  
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(startSound);
 *   background(220);
 *   textAlign(CENTER);
 *   textSize(9);
 *   text('click to play sound', width/2, height/2);
 *   pitchShifter = new p5.PitchShifter();
 *   
 *   soundFile.disconnect();
 *   soundFile.connect(pitchShifter);
 *   //change the pitch and retrigger sample when done playing
 *   soundFile.onended(changePitch);
 * }
 * 
 * function startSound () {
 *   soundFile.play();
 * }
 *  
 * function changePitch () {
 *   let pitchValue = random(-12, 12);
 *   pitchShifter.shift(pitchValue);
 *   soundFile.play();
 * }
 * </code>
 * </div>
 */
class PitchShifter extends p5soundNode {
    constructor(shiftValue = 1) {
        super();
        this.node = new TonePitchShift(shiftValue).toDestination();
    }
    
    /**
     * Shift the pitch of the source audio.
     * @method shift
     * @for PitchShifter
     * @param {Number} pitchValue amount of semitones to shift the pitch
     */
    shift (value) {
        if (value !== undefined) {
            this.node.pitch = value;
        }
    }
}

export default PitchShifter;
````

## File: src/effects/Reverb.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Reverb as ToneReverb } from "tone/build/esm/effect/Reverb.js";
import { p5soundMixEffect } from "../core/p5soundMixEffect.js";

/**
 * Add reverb to a sound.
 * @class Reverb
 * @constructor
 * @extends p5soundMixEffect
 * @param {Number} [decayTime] Set the decay time of the reverb
 * @example
 * <div>
 * <code>
 * let noise, osc, env, reverb;
 * let randomTime = 0;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   noise = new p5.Noise();
 *   env = new p5.Envelope();
 *   reverb = new p5.Reverb();
 *   noise.disconnect();
 *   noise.connect(env);
 *   env.disconnect();
 *   env.connect(reverb);
 *   noise.start();
 *   textAlign(CENTER);
 * }
 * 
 * function playSound() {
 *  randomTime = random(0.1, 3);
 *  reverb.set(randomTime); 
 *  env.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   text('click to play', width/2, 20);
 *   text('decay ' + round(randomTime, 2), width/2, 40);
 *   describe('Click to play a sound with a random decay time.');
 * }
 * </code>
 * </div>
 */
class Reverb extends p5soundMixEffect {
  constructor(decayTime) {
    super();
    this.decayTime = decayTime || 1;
    this.node = new ToneReverb(this.decayTime).toDestination();
  }

  /**
   * Set the decay time of the reverb.
   * @method set
   * @for Reverb
   * @param {Number} time Decay time of the reverb in seconds.
   */
  set(t) {
    this.node.decay = t;
  }
}

export default Reverb;
````

## File: src/sources/AudioIn.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { UserMedia as ToneUserMedia} from "tone/build/esm/source/UserMedia.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";
import { p5soundSource } from "../core/p5soundSource.js";
/**
 * Get sound from an input source, typically a computer microphone.
 * @class AudioIn
 * @constructor
 * @extends p5soundSource
 * @example
 * <div>
 * <code>
 * let mic, delay, filter;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(startMic);
 *   background(220);
 *   
 *   mic = new p5.AudioIn();
 *   delay = new p5.Delay(0.74, 0.1);
 *   filter = new p5.Biquad(600, "bandpass");
 *   
 *   mic.disconnect();
 *   mic.connect(delay);
 *   delay.disconnect();
 *   delay.connect(filter);
 *   
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 *   text('click to open mic, watch out for feedback', 0, 20, 100);
 *   describe('a sketch that accesses the user\'s microphone and connects it to a delay line.')
 * }
 * 
 * function startMic() {
 *   mic.start();
 * }
 * 
 * function draw() {
 *   d = map(mouseX, 0, width, 0.0, 0.5);
 *   delay.delayTime(d);
 * }
 * </code>
 * </div>
 */
class AudioIn extends p5soundSource {
    constructor() {
        super();
        this.node = new ToneUserMedia();
    }
    /**
     * Start the audio input.
     * @method start
     * @for AudioIn
     */
    start() {
        ToneStart();
        this.node.open().then(() => {
            // promise resolves when input is available
            console.log("mic open");
            // print the incoming mic levels in decibels
        }).catch(e => {
            // promise is rejected when the user doesn't have or allow mic access
            console.log("mic not open");
        });
    }
    /**
     * Stop the audio input.
     * @method stop
     * @for AudioIn
     */
    stop() {
        this.node.close();
    }
}

export default AudioIn;
````

## File: src/sources/Noise.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Noise as ToneNoise } from "tone/build/esm/source/Noise";
import { p5soundSource } from "../core/p5soundSource";

/**
 * Generate a buffer with random values.
 * @class Noise
 * @constructor
 * @extends p5soundSource
 * @param {String} [type] - the type of noise (white, pink, brown)
 * @example
 * <div>
 * <code>
 * let noise, env, cnv;
 * let types = ['white', 'pink', 'brown'];
 * let noiseType = 'brown';
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   textAlign(CENTER);
 *   cnv.mousePressed(start);
 *   noise = new p5.Noise(noiseType);
 *   env = new p5.Envelope(0.01, 0.1, 0.15, 0.5);
 *   noise.disconnect();
 *   noise.connect(env);
 *   noise.start();
 * }
 * 
 * function start() {
 *   noiseType = random(types);
 *   noise.type(noiseType);
 *   env.play();
 * }
 * 
 * function draw() {
 *   background(noiseType);
 *   text('tap to play', width/2, 20);
 *   let txt = 'type: ' + noiseType;
 *   text(txt, width/2, 40);
 * }
 * </code>
 * </div>
 */
class Noise extends p5soundSource {
  constructor(type) {
    super();
    if (typeof type === "undefined") {
      type = "white";
    }
    this.node = new ToneNoise().toDestination();
    this.node.type = type;
  }
  /**
   * @method type
   * @for Noise
   * @param {String} type - the type of noise (white, pink, brown) 
   */
  type(t) {
    this.node.type = t;
  }
}

export default Noise;
````

## File: LICENSE
````
GNU LESSER GENERAL PUBLIC LICENSE
                       Version 2.1, February 1999

 Copyright (C) 1991, 1999 Free Software Foundation, Inc.
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

[This is the first released version of the Lesser GPL.  It also counts
 as the successor of the GNU Library Public License, version 2, hence
 the version number 2.1.]

                            Preamble

  The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the GNU General Public
Licenses are intended to guarantee your freedom to share and change
free software--to make sure the software is free for all its users.

  This license, the Lesser General Public License, applies to some
specially designated software packages--typically libraries--of the
Free Software Foundation and other authors who decide to use it.  You
can use it too, but we suggest you first think carefully about whether
this license or the ordinary General Public License is the better
strategy to use in any particular case, based on the explanations below.

  When we speak of free software, we are referring to freedom of use,
not price.  Our General Public Licenses are designed to make sure that
you have the freedom to distribute copies of free software (and charge
for this service if you wish); that you receive source code or can get
it if you want it; that you can change the software and use pieces of
it in new free programs; and that you are informed that you can do
these things.

  To protect your rights, we need to make restrictions that forbid
distributors to deny you these rights or to ask you to surrender these
rights.  These restrictions translate to certain responsibilities for
you if you distribute copies of the library or if you modify it.

  For example, if you distribute copies of the library, whether gratis
or for a fee, you must give the recipients all the rights that we gave
you.  You must make sure that they, too, receive or can get the source
code.  If you link other code with the library, you must provide
complete object files to the recipients, so that they can relink them
with the library after making changes to the library and recompiling
it.  And you must show them these terms so they know their rights.

  We protect your rights with a two-step method: (1) we copyright the
library, and (2) we offer you this license, which gives you legal
permission to copy, distribute and/or modify the library.

  To protect each distributor, we want to make it very clear that
there is no warranty for the free library.  Also, if the library is
modified by someone else and passed on, the recipients should know
that what they have is not the original version, so that the original
author's reputation will not be affected by problems that might be
introduced by others.

  Finally, software patents pose a constant threat to the existence of
any free program.  We wish to make sure that a company cannot
effectively restrict the users of a free program by obtaining a
restrictive license from a patent holder.  Therefore, we insist that
any patent license obtained for a version of the library must be
consistent with the full freedom of use specified in this license.

  Most GNU software, including some libraries, is covered by the
ordinary GNU General Public License.  This license, the GNU Lesser
General Public License, applies to certain designated libraries, and
is quite different from the ordinary General Public License.  We use
this license for certain libraries in order to permit linking those
libraries into non-free programs.

  When a program is linked with a library, whether statically or using
a shared library, the combination of the two is legally speaking a
combined work, a derivative of the original library.  The ordinary
General Public License therefore permits such linking only if the
entire combination fits its criteria of freedom.  The Lesser General
Public License permits more lax criteria for linking other code with
the library.

  We call this license the "Lesser" General Public License because it
does Less to protect the user's freedom than the ordinary General
Public License.  It also provides other free software developers Less
of an advantage over competing non-free programs.  These disadvantages
are the reason we use the ordinary General Public License for many
libraries.  However, the Lesser license provides advantages in certain
special circumstances.

  For example, on rare occasions, there may be a special need to
encourage the widest possible use of a certain library, so that it becomes
a de-facto standard.  To achieve this, non-free programs must be
allowed to use the library.  A more frequent case is that a free
library does the same job as widely used non-free libraries.  In this
case, there is little to gain by limiting the free library to free
software only, so we use the Lesser General Public License.

  In other cases, permission to use a particular library in non-free
programs enables a greater number of people to use a large body of
free software.  For example, permission to use the GNU C Library in
non-free programs enables many more people to use the whole GNU
operating system, as well as its variant, the GNU/Linux operating
system.

  Although the Lesser General Public License is Less protective of the
users' freedom, it does ensure that the user of a program that is
linked with the Library has the freedom and the wherewithal to run
that program using a modified version of the Library.

  The precise terms and conditions for copying, distribution and
modification follow.  Pay close attention to the difference between a
"work based on the library" and a "work that uses the library".  The
former contains code derived from the library, whereas the latter must
be combined with the library in order to run.

                  GNU LESSER GENERAL PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. This License Agreement applies to any software library or other
program which contains a notice placed by the copyright holder or
other authorized party saying it may be distributed under the terms of
this Lesser General Public License (also called "this License").
Each licensee is addressed as "you".

  A "library" means a collection of software functions and/or data
prepared so as to be conveniently linked with application programs
(which use some of those functions and data) to form executables.

  The "Library", below, refers to any such software library or work
which has been distributed under these terms.  A "work based on the
Library" means either the Library or any derivative work under
copyright law: that is to say, a work containing the Library or a
portion of it, either verbatim or with modifications and/or translated
straightforwardly into another language.  (Hereinafter, translation is
included without limitation in the term "modification".)

  "Source code" for a work means the preferred form of the work for
making modifications to it.  For a library, complete source code means
all the source code for all modules it contains, plus any associated
interface definition files, plus the scripts used to control compilation
and installation of the library.

  Activities other than copying, distribution and modification are not
covered by this License; they are outside its scope.  The act of
running a program using the Library is not restricted, and output from
such a program is covered only if its contents constitute a work based
on the Library (independent of the use of the Library in a tool for
writing it).  Whether that is true depends on what the Library does
and what the program that uses the Library does.

  1. You may copy and distribute verbatim copies of the Library's
complete source code as you receive it, in any medium, provided that
you conspicuously and appropriately publish on each copy an
appropriate copyright notice and disclaimer of warranty; keep intact
all the notices that refer to this License and to the absence of any
warranty; and distribute a copy of this License along with the
Library.

  You may charge a fee for the physical act of transferring a copy,
and you may at your option offer warranty protection in exchange for a
fee.

  2. You may modify your copy or copies of the Library or any portion
of it, thus forming a work based on the Library, and copy and
distribute such modifications or work under the terms of Section 1
above, provided that you also meet all of these conditions:

    a) The modified work must itself be a software library.

    b) You must cause the files modified to carry prominent notices
    stating that you changed the files and the date of any change.

    c) You must cause the whole of the work to be licensed at no
    charge to all third parties under the terms of this License.

    d) If a facility in the modified Library refers to a function or a
    table of data to be supplied by an application program that uses
    the facility, other than as an argument passed when the facility
    is invoked, then you must make a good faith effort to ensure that,
    in the event an application does not supply such function or
    table, the facility still operates, and performs whatever part of
    its purpose remains meaningful.

    (For example, a function in a library to compute square roots has
    a purpose that is entirely well-defined independent of the
    application.  Therefore, Subsection 2d requires that any
    application-supplied function or table used by this function must
    be optional: if the application does not supply it, the square
    root function must still compute square roots.)

These requirements apply to the modified work as a whole.  If
identifiable sections of that work are not derived from the Library,
and can be reasonably considered independent and separate works in
themselves, then this License, and its terms, do not apply to those
sections when you distribute them as separate works.  But when you
distribute the same sections as part of a whole which is a work based
on the Library, the distribution of the whole must be on the terms of
this License, whose permissions for other licensees extend to the
entire whole, and thus to each and every part regardless of who wrote
it.

Thus, it is not the intent of this section to claim rights or contest
your rights to work written entirely by you; rather, the intent is to
exercise the right to control the distribution of derivative or
collective works based on the Library.

In addition, mere aggregation of another work not based on the Library
with the Library (or with a work based on the Library) on a volume of
a storage or distribution medium does not bring the other work under
the scope of this License.

  3. You may opt to apply the terms of the ordinary GNU General Public
License instead of this License to a given copy of the Library.  To do
this, you must alter all the notices that refer to this License, so
that they refer to the ordinary GNU General Public License, version 2,
instead of to this License.  (If a newer version than version 2 of the
ordinary GNU General Public License has appeared, then you can specify
that version instead if you wish.)  Do not make any other change in
these notices.

  Once this change is made in a given copy, it is irreversible for
that copy, so the ordinary GNU General Public License applies to all
subsequent copies and derivative works made from that copy.

  This option is useful when you wish to copy part of the code of
the Library into a program that is not a library.

  4. You may copy and distribute the Library (or a portion or
derivative of it, under Section 2) in object code or executable form
under the terms of Sections 1 and 2 above provided that you accompany
it with the complete corresponding machine-readable source code, which
must be distributed under the terms of Sections 1 and 2 above on a
medium customarily used for software interchange.

  If distribution of object code is made by offering access to copy
from a designated place, then offering equivalent access to copy the
source code from the same place satisfies the requirement to
distribute the source code, even though third parties are not
compelled to copy the source along with the object code.

  5. A program that contains no derivative of any portion of the
Library, but is designed to work with the Library by being compiled or
linked with it, is called a "work that uses the Library".  Such a
work, in isolation, is not a derivative work of the Library, and
therefore falls outside the scope of this License.

  However, linking a "work that uses the Library" with the Library
creates an executable that is a derivative of the Library (because it
contains portions of the Library), rather than a "work that uses the
library".  The executable is therefore covered by this License.
Section 6 states terms for distribution of such executables.

  When a "work that uses the Library" uses material from a header file
that is part of the Library, the object code for the work may be a
derivative work of the Library even though the source code is not.
Whether this is true is especially significant if the work can be
linked without the Library, or if the work is itself a library.  The
threshold for this to be true is not precisely defined by law.

  If such an object file uses only numerical parameters, data
structure layouts and accessors, and small macros and small inline
functions (ten lines or less in length), then the use of the object
file is unrestricted, regardless of whether it is legally a derivative
work.  (Executables containing this object code plus portions of the
Library will still fall under Section 6.)

  Otherwise, if the work is a derivative of the Library, you may
distribute the object code for the work under the terms of Section 6.
Any executables containing that work also fall under Section 6,
whether or not they are linked directly with the Library itself.

  6. As an exception to the Sections above, you may also combine or
link a "work that uses the Library" with the Library to produce a
work containing portions of the Library, and distribute that work
under terms of your choice, provided that the terms permit
modification of the work for the customer's own use and reverse
engineering for debugging such modifications.

  You must give prominent notice with each copy of the work that the
Library is used in it and that the Library and its use are covered by
this License.  You must supply a copy of this License.  If the work
during execution displays copyright notices, you must include the
copyright notice for the Library among them, as well as a reference
directing the user to the copy of this License.  Also, you must do one
of these things:

    a) Accompany the work with the complete corresponding
    machine-readable source code for the Library including whatever
    changes were used in the work (which must be distributed under
    Sections 1 and 2 above); and, if the work is an executable linked
    with the Library, with the complete machine-readable "work that
    uses the Library", as object code and/or source code, so that the
    user can modify the Library and then relink to produce a modified
    executable containing the modified Library.  (It is understood
    that the user who changes the contents of definitions files in the
    Library will not necessarily be able to recompile the application
    to use the modified definitions.)

    b) Use a suitable shared library mechanism for linking with the
    Library.  A suitable mechanism is one that (1) uses at run time a
    copy of the library already present on the user's computer system,
    rather than copying library functions into the executable, and (2)
    will operate properly with a modified version of the library, if
    the user installs one, as long as the modified version is
    interface-compatible with the version that the work was made with.

    c) Accompany the work with a written offer, valid for at
    least three years, to give the same user the materials
    specified in Subsection 6a, above, for a charge no more
    than the cost of performing this distribution.

    d) If distribution of the work is made by offering access to copy
    from a designated place, offer equivalent access to copy the above
    specified materials from the same place.

    e) Verify that the user has already received a copy of these
    materials or that you have already sent this user a copy.

  For an executable, the required form of the "work that uses the
Library" must include any data and utility programs needed for
reproducing the executable from it.  However, as a special exception,
the materials to be distributed need not include anything that is
normally distributed (in either source or binary form) with the major
components (compiler, kernel, and so on) of the operating system on
which the executable runs, unless that component itself accompanies
the executable.

  It may happen that this requirement contradicts the license
restrictions of other proprietary libraries that do not normally
accompany the operating system.  Such a contradiction means you cannot
use both them and the Library together in an executable that you
distribute.

  7. You may place library facilities that are a work based on the
Library side-by-side in a single library together with other library
facilities not covered by this License, and distribute such a combined
library, provided that the separate distribution of the work based on
the Library and of the other library facilities is otherwise
permitted, and provided that you do these two things:

    a) Accompany the combined library with a copy of the same work
    based on the Library, uncombined with any other library
    facilities.  This must be distributed under the terms of the
    Sections above.

    b) Give prominent notice with the combined library of the fact
    that part of it is a work based on the Library, and explaining
    where to find the accompanying uncombined form of the same work.

  8. You may not copy, modify, sublicense, link with, or distribute
the Library except as expressly provided under this License.  Any
attempt otherwise to copy, modify, sublicense, link with, or
distribute the Library is void, and will automatically terminate your
rights under this License.  However, parties who have received copies,
or rights, from you under this License will not have their licenses
terminated so long as such parties remain in full compliance.

  9. You are not required to accept this License, since you have not
signed it.  However, nothing else grants you permission to modify or
distribute the Library or its derivative works.  These actions are
prohibited by law if you do not accept this License.  Therefore, by
modifying or distributing the Library (or any work based on the
Library), you indicate your acceptance of this License to do so, and
all its terms and conditions for copying, distributing or modifying
the Library or works based on it.

  10. Each time you redistribute the Library (or any work based on the
Library), the recipient automatically receives a license from the
original licensor to copy, distribute, link with or modify the Library
subject to these terms and conditions.  You may not impose any further
restrictions on the recipients' exercise of the rights granted herein.
You are not responsible for enforcing compliance by third parties with
this License.

  11. If, as a consequence of a court judgment or allegation of patent
infringement or for any other reason (not limited to patent issues),
conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot
distribute so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you
may not distribute the Library at all.  For example, if a patent
license would not permit royalty-free redistribution of the Library by
all those who receive copies directly or indirectly through you, then
the only way you could satisfy both it and this License would be to
refrain entirely from distribution of the Library.

If any portion of this section is held invalid or unenforceable under any
particular circumstance, the balance of the section is intended to apply,
and the section as a whole is intended to apply in other circumstances.

It is not the purpose of this section to induce you to infringe any
patents or other property right claims or to contest validity of any
such claims; this section has the sole purpose of protecting the
integrity of the free software distribution system which is
implemented by public license practices.  Many people have made
generous contributions to the wide range of software distributed
through that system in reliance on consistent application of that
system; it is up to the author/donor to decide if he or she is willing
to distribute software through any other system and a licensee cannot
impose that choice.

This section is intended to make thoroughly clear what is believed to
be a consequence of the rest of this License.

  12. If the distribution and/or use of the Library is restricted in
certain countries either by patents or by copyrighted interfaces, the
original copyright holder who places the Library under this License may add
an explicit geographical distribution limitation excluding those countries,
so that distribution is permitted only in or among countries not thus
excluded.  In such case, this License incorporates the limitation as if
written in the body of this License.

  13. The Free Software Foundation may publish revised and/or new
versions of the Lesser General Public License from time to time.
Such new versions will be similar in spirit to the present version,
but may differ in detail to address new problems or concerns.

Each version is given a distinguishing version number.  If the Library
specifies a version number of this License which applies to it and
"any later version", you have the option of following the terms and
conditions either of that version or of any later version published by
the Free Software Foundation.  If the Library does not specify a
license version number, you may choose any version ever published by
the Free Software Foundation.

  14. If you wish to incorporate parts of the Library into other free
programs whose distribution conditions are incompatible with these,
write to the author to ask for permission.  For software which is
copyrighted by the Free Software Foundation, write to the Free
Software Foundation; we sometimes make exceptions for this.  Our
decision will be guided by the two goals of preserving the free status
of all derivatives of our free software and of promoting the sharing
and reuse of software generally.

                            NO WARRANTY

  15. BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO
WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE LAW.
EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR
OTHER PARTIES PROVIDE THE LIBRARY "AS IS" WITHOUT WARRANTY OF ANY
KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE
LIBRARY IS WITH YOU.  SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME
THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN
WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY
AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE LIABLE TO YOU
FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR
CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING
RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A
FAILURE OF THE LIBRARY TO OPERATE WITH ANY OTHER SOFTWARE), EVEN IF
SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
DAMAGES.

                     END OF TERMS AND CONDITIONS

           How to Apply These Terms to Your New Libraries

  If you develop a new library, and you want it to be of the greatest
possible use to the public, we recommend making it free software that
everyone can redistribute and change.  You can do so by permitting
redistribution under these terms (or, alternatively, under the terms of the
ordinary General Public License).

  To apply these terms, attach the following notices to the library.  It is
safest to attach them to the start of each source file to most effectively
convey the exclusion of warranty; and each file should have at least the
"copyright" line and a pointer to where the full notice is found.

    <one line to give the library's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Lesser General Public
    License as published by the Free Software Foundation; either
    version 2.1 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this library; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
    USA

Also add information on how to contact you by electronic and paper mail.

You should also get your employer (if you work as a programmer) or your
school, if any, to sign a "copyright disclaimer" for the library, if
necessary.  Here is a sample; alter the names:

  Yoyodyne, Inc., hereby disclaims all copyright interest in the
  library `Frob' (a library for tweaking knobs) written by James Random
  Hacker.

  <signature of Ty Coon>, 1 April 1990
  Ty Coon, President of Vice

That's all there is to it!
````

## File: src/effects/Envelope.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { AmplitudeEnvelope as ToneAmplitudeEnvelope } from "tone/build/esm/component/envelope/AmplitudeEnvelope.js";
import { p5soundNode } from "../core/p5soundNode";

/**
 * Generate an amplitude envelope.
 * @class Envelope
 * @constructor
 * @extends p5soundNode
 * @param {Number} [attack] how quickly the envelope reaches the maximum level
 * @param {Number} [decay] how quickly the envelope reaches the sustain level
 * @param {Number} [sustain] how long the envelope stays at the decay level
 * @param {Number} [release] how quickly the envelope fades out after the sustain level
 * @example
 * <div>
 * <code>
 * console.log('do an example here');
 * </code>
 * </div>
 */
class Envelope extends p5soundNode {
  constructor(a = 0.1, d = 0.12, s = 0.1, r = 0.2) {
    super();
    this.attack = a;
    this.attackLevel = 1;
    this.decay = d;
    this.sustain = s;
    this.release = r;

    this.node = new ToneAmplitudeEnvelope({
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release,
    }).toDestination();
  }

  /**
   * Trigger the envelope and release it after the sustain time.
   * @method play
   * @for Envelope
   */
  play() {
    this.node.triggerAttackRelease(this.sustain);
  }

  /**
   * Trigger the Attack, and Decay portion of the Envelope. Similar to holding
   * down a key on a piano, but it will hold the sustain level until you let go.
   * @method triggerAttack
   * @for Envelope
   * @example
   * <div>
   * <code>
   * let osc, env;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   cnv.mousePressed(playSound);
   *   cnv.mouseReleased(stopSound);
   *   textAlign(CENTER);
   *   textSize(10);
   *   text('tap to triggerAttack', width/2, height/2);
   * 
   *   osc = new p5.Oscillator();
   *   osc.disconnect();
   *   env = new p5.Envelope();
   *   osc.connect(env);
   * }
   * 
   * function playSound() {
   *   background(0, 255, 255);
   *   text('release to release', width/2, height/2);
   *   osc.start();
   *   env.attackTime(random(0.00, 0.25));
   *   env.triggerAttack(0.5);
   * }
   * 
   * function stopSound() {
   *   background(220);
   *   text('tap to triggerAttack', width/2, height/2);
   *   env.releaseTime(random(0.1, 0.3));
   *   env.triggerRelease();
   * }
   * </code>
   * </div>
   */

  triggerAttack() {
    this.node.triggerAttack();
  }
  /**
   * Trigger the Release of the envelope. Similar to releasing the key on 
   * a piano and letting the sound fade according to the release level and 
   * release time. 
   * @method triggerRelease
   * @for Envelope
   * @example
   * <div>
   * <code>
   * let osc, env;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   cnv.mousePressed(playSound);
   *   cnv.mouseReleased(stopSound);
   *   textAlign(CENTER);
   *   textSize(10);
   *   text('tap to triggerAttack', width/2, height/2);
   * 
   *   osc = new p5.Oscillator();
   *   osc.disconnect();
   *   env = new p5.Envelope();
   *   osc.connect(env);
   * }
   * 
   * function playSound() {
   *   background(0, 255, 255);
   *   text('release to release', width/2, height/2);
   *   osc.start();
   *   env.attackTime(random(0.00, 0.25));
   *   env.triggerAttack(0.5);
   * }
   * 
   * function stopSound() {
   *   background(220);
   *   text('tap to triggerAttack', width/2, height/2);
   *   env.releaseTime(random(0.1, 0.3));
   *   env.triggerRelease();
   * }
   * </code>
   * </div>
   */
  triggerRelease() {
    this.node.triggerRelease();
  }

  /**
   * @method setInput
   * @for Envelope
   * @param {Object} unit A p5.sound Object 
   */
  setInput(input) {
    input.getNode().connect(this.node);
  }

  /**
   * Sets the attack, decay, sustain, and release times of the envelope.
   * @method setADSR
   * @for Envelope
   * @param {Number} attack how quickly the envelope reaches the maximum level
   * @param {Number} decay how quickly the envelope reaches the sustain level
   * @param {Number} sustain how long the envelope stays at the decay level
   * @param {Number} release how quickly the envelope fades out after the sustain level
   */
  setADSR(a, d, s, r) {
    this.node.attack = a;
    this.node.decay = d;
    this.node.sustain = s;
    this.node.release = r;
  }

  /**
   * Sets the release time of the envelope.
   * @method releaseTime
   * @for Envelope
   * @param {Number} releaseTime the release time in seconds 
   */
  releaseTime(value) {
    this.node.release = value;
  }

  /**
   * Sets the attack time of the envelope.
   * @method attackTime
   * @for Envelope
   * @param {Number} attackTime the attack time in seconds 
   */
  attackTime(value) {
    this.node.attack = value;
  }
}

export default Envelope;
````

## File: ROADMAP.md
````markdown
# Roadmap Info
A roadmap for the future of p5.sound.js! Here is a [link](https://docs.google.com/spreadsheets/d/1WhT1O8w8PgejLP-2jtbT69rTGcTsYK4yTz9xq1KTcj8/edit?usp=sharing) to a more frequently updated list of planned changes and features.

## Effect Superclass
There are several dozen duplicate methods in the code base which are there only because I haven’t been able to think of a way to create a super class for all of the effects and sound making classes. For example, several effects currently have their own wet and dry methods. They also have disconnect and connect methods which all do the same exact thing and really should only exist once in an effect superclass that they all effects inherit and extend. This pattern exists already in the original p5.sound.js library but it wasn't clear to me at the time that I should have started that way. The architecture I would like to have implemented would be to import the effect class from tone.js and use that to provide the methods shared by effects like reverb, delay, biquad, etc… 

## Soundfile
Make documentation for the sound file that exhibits polyphonic voices, something which exists by default in the original sound file class but I feel adds a complexity to the code base to create behavior that can be achieved with vanilla JavaScript (by for example, by creating multiple soundfile instances in an array and starting them one after another via a wrapping index). 

## Classes to Add
There are several classes which I feel are missing from the original library and a few that should be modified or added to. Distortion should exist, as should the sound recorder. There should be a separate fft class, and let the waveform just handle realtime generating wave shapes. The waveform class currently is doing double duty by importing the corresponding waveform and fft class from tone.js, solely to replicate original behavior. If the original library will continue to exist however a more streamlined behavior should be implemented with separate classes for waveform and fft. 

# Methods to Add
Orient x y and z behavior should be brought back to the 3D panner though initialized in their current omnidirectional setting so that it is an optional property that more advanced users can choose to modify to create more complex spatial experiences. 

# Functionality to Add
Arithmetic nodes for adding and multiplying signals, allowing for more cross modulation of signals. 

Finally all effect properties such as wet dry, delay time and filter cutoffs should be modulatable with signals, some are implemented  

Disconnect from specific nodes.
````

## File: src/core/p5soundNode.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";

/**
 * Generic methods for p5.sound.js nodes
 * @class p5soundNode
 * @constructor
 */
class p5soundNode {
  constructor() {
    this.node = null;
  }

  /**
   * Adjust the amplitude of the p5 sound node.
   * @method amp
   * @for p5soundNode
   * @param {Number} amplitude Set the amplitude between 0 and 1.0. Or, pass in an object such as an oscillator to modulate amplitude with an audio signal.
   * @example
   * <div>
   * <code>
   * let osc, lfo;
   * let cnv;
   * 
   * function setup() {
   *   describe("a sketch that demonstrates amplitude modulation with an LFO and sine tone");
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startSound);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   
   *   osc = new p5.Oscillator('sine');
   *   lfo = new p5.Oscillator(1);
   *   lfo.disconnect();
   *   osc.amp(lfo);
   * }
   * 
   * function startSound() {
   *   lfo.start();
   *   osc.start();
   * }
   * 
   * function draw(){
   *   background(220);
   *   text('click to play sound', 0, height/2 - 20, 100);
   *   text('control lfo with mouseX position', 0, height/2, 100);
   * 
   *   let freq = map(mouseX, 0, width, 0, 10);
   *   lfo.freq(freq);
   * }
   * </code>
   * </div>
   */
  amp(value, p = 0.1) {
    if (typeof value === "object") {
      value.getNode().connect(this.node.volume);
      return;
    }
    let dbValue = ToneGainToDb(value);
    this.node.volume.rampTo(dbValue, p);
  }

  connect(destination) {
    if(typeof destination.getNode === 'function') {
      this.node.connect(destination.getNode());
    } else {
      this.node.connect(destination);
    }
  }
  
  disconnect() {
    this.node.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.node;
  }
}

export { p5soundNode };
````

## File: src/core/p5soundSource.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Generic methods for p5 sound source nodes
 * @class p5soundSource
 * @constructor
 * @extends p5soundNode
 */
class p5soundSource extends p5soundNode {
  constructor() {
    super();
  }
  /**
   * Starts the p5 sound source.
   * @method start
   * @for p5soundSource
   */
  start() {
    this.node.start();
  }
  
  /**
   * Stops the p5 sound source.
   * @method stop
   * @for p5soundSource
   */
  stop() {
    this.node.stop();
  }
}

export { p5soundSource };
````

## File: src/effects/Biquad.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { clamp } from "../core/Utils.js";
import { BiquadFilter as ToneBiquadFilter} from "tone/build/esm/component/filter/BiquadFilter.js";
import { p5soundNode } from "../core/p5soundNode.js";

/**
 * Filter the frequency range of a sound.
 * @class Biquad
 * @constructor
 * @extends p5soundNode
 * @param {Number} [cutoff] cutoff frequency of the filter, a value between 0 and 24000.
 * @param {String} [type] filter type. Options: "lowpass", 
 *                        "highpass", "bandpass", "lowshelf",
 *                        "highshelf", "notch", "allpass", 
 *                        "peaking"
 * @example
 * <div>
 * <code>
 * ///kind of Karplus-Strong string synthesis using p5.sound.js
 * 
 * let noise, lowPass, hiPass, delay, env, gain;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   textSize(9);
 *   text('click and drag mouse', width/2, height/2);
 *   
 *   noise = new p5.Noise('white');
 *   env = new p5.Envelope(0);
 *   lowPass = new p5.Biquad(1200, 'lowpass');
 *   hiPass = new p5.Biquad(55, 'highpass');
 *   delay = new p5.Delay(0.0005, 0.97);
 *   gain = new p5.Gain(0.5);
 *   noise.disconnect();
 *   noise.connect(hiPass);
 *   hiPass.disconnect();
 *   hiPass.connect(env);
 *   env.disconnect();
 *   env.connect(lowPass);
 *   lowPass.disconnect();
 *   lowPass.connect(delay);
 * 
 *   cnv.mousePressed(pluckStart);
 *   cnv.mouseReleased(pluckStop);
 *   cnv.mouseOut(pluckStop);
 *   describe('A sketch that synthesizes string sounds.');
 * }
 * 
 * function pluckStart() {
 *   background(0, 255, 255);
 *   text('release to trigger decay', width/2, height/2);
 *   let dtime = map(mouseX, 0, width, 0.009, 0.001);
 *   delay.delayTime(dtime, 0);
 *   noise.start();
 *   env.triggerAttack();
 * }
 * 
 * function pluckStop() {
 *   background(220);
 *   text('click to pluck', width/2, height/2);
 *   env.triggerRelease();
 * }
 * </code>
 * </div>
 */
class Biquad extends p5soundNode {
  constructor(c = 800, t = "lowpass") {
    super();
    this.type = t;
    this.cutoff = c;
    this.node = new ToneBiquadFilter(this.cutoff, this.type).toDestination();
  }
  
  /**
   * The filter's resonance factor.
   * @method res
   * @for Biquad
   * @param {Number} resonance resonance of the filter. A number between 0 and 100. Values closer to 100 can cause the filter to self-oscillate and become loud!
   */
  res(r) {
    this.node.Q.value = r;
  }

  /**
   * The gain of the filter in dB units.
   * @method gain
   * @for Biquad
   * @param {Number} gain gain value in dB units. The gain is only used for lowshelf, highshelf, and peaking filters.
   */
  gain(g) {
    this.node.gain.value = g;
  }

  /**
   * Set the type of the filter.
   * @method setType
   * @for Biquad
   * @param {String} type type of the filter. Options: "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", and "peaking." 
   */
  setType(t) {
    this.node.type = t;
  }

  /**
   * Set the cutoff frequency of the filter.
   * @method freq
   * @for Biquad
   * @param {Number} cutoffFrequency the cutoff frequency of the filter.
   */
  freq(f) {
    this.node.frequency.value = clamp(f, 0, 22050);
  }
}

/**
 * Creates a Lowpass Biquad filter.
 * @class LowPass
 * @constructor
 * @extends Biquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 */
class LowPass extends Biquad {
  constructor(frequency) {
    super(frequency);
    this.node.type = "lowpass";
  }
}

/**
 * Creates a Highpass Biquad filter.
 * @class HighPass
 * @constructor
 * @extends Biquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 */
class HighPass extends Biquad {
  constructor(frequency) {
    super(frequency);
    this.node.type = "highpass";
  }
}

/**
 * Creates a Bandpass Biquad filter.
 * @class BandPass
 * @constructor
 * @extends Biquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 */
class BandPass extends Biquad {
  constructor(frequency) {
    super(frequency);
    this.node.type = "bandpass";
  }
}

export default Biquad;
export { LowPass, HighPass, BandPass };
````

## File: src/effects/Delay.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { p5soundMixEffect } from "../core/p5soundMixEffect.js";
import { FeedbackDelay as ToneFeedbackDelay } from "tone/build/esm/effect/FeedbackDelay.js";
import { clamp } from '../core/Utils.js';

/**
 * A delay effect with parameters for feedback, and delay time.
 * @class Delay
 * @constructor
 * @extends p5soundMixEffect
 * @param {Number} [delayTime] The delay time in seconds between 0 and 1. Defaults to 0.250.
 * @param {Number} [feedback] The amount of feedback in the delay line between 0 and 1. Defaults to 0.2.
 * @example
 * <div>
 * <code>
 * let osc;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 * 
 *   osc = new p5.Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new p5.Delay(0.12, 0.7);
 *   
 *   osc.disconnect();
 *   osc.connect(delay);
 * 
 *   cnv.mousePressed(oscStart);
 *   describe('Tap to play a square wave with delay effect.');
 * }
 * 
 * function oscStart() {
 *   osc.start();
 * }
 * 
 * </code>
 * </div>
 * function mouseReleased() {
 *   osc.stop();
 * }
 */
class Delay extends p5soundMixEffect {
  constructor(d = 0.250, f = 0.2)  {
    super();
    this.d = d;
    this.f = f;
    this.node = new ToneFeedbackDelay(this.d, this.f).toDestination();
  }

  /**
   * Set the delay time in seconds.
   * @method delayTime
   * @for Delay
   * @param {Number} delayTime The delay time in seconds. 
   * @param {Number} [rampTime] The time in seconds it takes to ramp to the new delay time. 
   *                            By default it is 0.1 seconds. Setting it to 0 will change 
   *                            the delay time immediately and demonstrate legacy behavior.
   * @example
   * <div>
   * <code>
   * let osc, delay, env;
   *
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   textAlign(CENTER);
   *   textSize(9);
   *   text('click and drag mouse', width/2, height/2);
   * 
   *   osc = new p5.Oscillator('sawtooth');
   *   osc.amp(0.74);
   *   env = new p5.Envelope(0.01);
   *   delay = new p5.Delay(0.12, 0.7);
   *   
   *   osc.disconnect();
   *   osc.connect(env);
   *   env.disconnect();
   *   env.connect(delay);
   * 
   *   cnv.mousePressed(oscStart);
   *   cnv.mouseReleased(oscStop);
   *   cnv.mouseOut(oscStop);
   *   describe('Tap to play a square wave with delay effect.');
   * }
   * 
   * function oscStart() {
   *   background(0, 255, 255);
   *   text('release to hear delay', width/2, height/2);
   *   osc.start();
   *   env.triggerAttack();
   * }
   * 
   * function oscStop() {
   *   background(220);
   *   text('click and drag mouse', width/2, height/2);
   *   env.triggerRelease();
   * } 
   *   
   * function draw() {
   *   
   *   let dtime = map(mouseX, 0, width, 0.1, 0.5);
   *   delay.delayTime(dtime);
   * }
   */
  delayTime(value, rampTime = 0.1) {
    //legacy behavior
    if (rampTime == 0) {
      this.node.delayTime.value = clamp(value, 0, 1);
      return;
    }
    //new tape emulation behavior
    this.node.delayTime.rampTo(clamp(value, 0, 1), rampTime);
  }

  /**
   * The amount of feedback in the delay line.
   * @method feedback
   * @for Delay
   * @param {number} feedbackAmount A number between 0 and 0.99.
   */
  feedback(value) {
    this.node.feedback.rampTo(clamp(value, 0, 0.99), 0.1);
  }

  /**
   * Process an input signal with a delay effect.
   * @method process
   * @for Delay
   * @param {Object} unit A p5.sound source such as an Oscillator, Soundfile, or AudioIn object. 
   * @param {Number} delayTime The amount of delay in seconds. A number between 0 and 1.
   * @param {Number} feedback The amount of feedback. A number between 0 and 1.
   */
  process(input, delayTime, feedback) { 
    this.node.delayTime.value = delayTime;
    this.node.feedback.value = feedback;
    input.getNode().connect(this.node);
  }
}

export default Delay;
````

## File: .gitignore
````
node_modules
dist/
out/
.DS_Store
/src/.DS_Store
.vscode
````

## File: src/core/p5soundMixEffect.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { p5soundNode } from "./p5soundNode.js";
import { clamp } from './Utils.js';

/**
 * Generic dry/wet mix method for p5 effect nodes
 * @class p5soundMixEffect
 * @constructor
 * @extends p5soundNode
 */
class p5soundMixEffect extends p5soundNode {
  constructor() {
    super();
    this.node = null;
  }
  /**
   * Set the wet/dry mix of the effect.
   * @method wet
   * @for p5soundMixEffect
   * @param {Number} amount Between 0 (dry) and 1 (wet)
   * @example
   * <div>
   * <code>
   * let osc, del
   *
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   background(220);
   *   osc = new p5.Oscillator();
   *   osc.disconnect();
   *   del = new p5.Delay();
   *   osc.connect(del);
   *   del.delayTime(0.25);
   *   del.feedback(0.5);
   *   del.wet(0.5);
   * }
   *
   * function mousePressed() {
   *   osc.start();
   * }
   *
   * function draw() {
   *   del.delayTime(map(mouseX, 0, width, 0.01, 0.5));
   *   del.wet(map(mouseY, 0, height, 0.1, 0.9));
   *   background(220);
   *   textAlign(CENTER);
   *   textSize(9);
   *   text('delay dry/wet: ' + del.wet().toFixed(2), width / 2, height / 2);
   * }
   * </code>
   * </div>
   */
  wet(amount) {
    if (typeof amount !== 'undefined') {
      this.node.wet.value = clamp(amount, 0, 1);
      return this;
    }
    return this.node.wet.value;
  }
}

export { p5soundMixEffect };
````

## File: src/sources/Oscillator.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */
import { p5soundSource } from "../core/p5soundSource.js";
import { Oscillator as ToneOscillator } from "tone/build/esm/source/oscillator/Oscillator.js";
import { clamp } from "../core/Utils.js";

/** 
 * Generate Sine, Triangle, Square and Sawtooth waveforms.
 * @class Oscillator
 * @constructor
 * @extends p5soundSource
 * @param {Number} [frequency] frequency defaults to 440Hz
 * @param {String} [type] type of oscillator. Options:
 *                        'sine' (default), 'triangle',
 *                        'sawtooth', 'square'
 * @example
 * <div>
 * <code>
 * let osc, playing, freq, amp;
 *
 * function setup() {
 *   describe("a sketch that demonstrates the frequency and amplitude parameters of an oscillator.");
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playOscillator);
 *   osc = new p5.Oscillator();
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
class Oscillator extends p5soundSource {
  constructor(frequency = 440, type = "sine") {
    super();
    if (typeof frequency === "string" && typeof type === "string") {
      let f = frequency;
      frequency = 440;
      type = f;
    }
    if (typeof frequency === "string" && typeof type === "number") {
      let t = type;
      let f = frequency;
      type = f;
      frequency = t;
    }
    
    this.frequency = frequency;
    this.type = type;
    this.node = new ToneOscillator().toDestination();
    this.node.frequency.value = this.frequency;
    this.node.type = this.type;
    this.node.volume.value = -6;
  }

  /**
   * Adjusts the frequency of the oscillator.
   * @method freq
   * @for Oscillator
   * @param {Number} frequency frequency of the oscillator in Hz (cycles per second).
   * @param {Number} [rampTime] the time in seconds it takes to ramp to the new frequency (defaults to 0). 
   */
  freq(f, p = 0) {
    this.node.frequency.rampTo(clamp(f, 0, 24000), p);
  }

  /**
   * Adjusts the phase of the oscillator.
   * @method phase
   * @for Oscillator
   * @param {Number} phase phase of the oscillator in degrees (0-360). 
   */
  phase(p) {
    this.node.phase = p;
  }

  /**
   * Sets the type of the oscillator. 
   * @method setType
   * @for Oscillator
   * @param {String} type type of the oscillator. Options:
   *                 'sine' (default), 'triangle',
   *                 'sawtooth', 'square'
   */
  setType(t) {
    this.node.type = t;
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
    this.node.type = "sawtooth";
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
    this.node.type = "square";
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
    this.node.type = "triangle"
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
    this.node.type = "sine"
  }
}

export default Oscillator;
export { SawOsc, SqrOsc, TriOsc, SinOsc};
````

## File: yuidoc.json
````json
{
  "name": "p5.sound.js",
  "description": "p5.sound.js extends the musical and sonic capabilities of p5.js. It is designed to be a minimal abstraction of the Tone.js library with a feature set that is inspired by p5.js's approach to accessible and poetic creative coding. Key functionalities include audio input, sound file playback and manipulation, effects, synthesis and analysis.",
  "version": "0.3.0-rc.0",
  "url": "https://github.com/processing/p5.sound.js",
  "options": {
    "paths": [
      "src"
    ],
    "exclude": "dist,out,node_modules",
    "outdir": "./out"
  }
}
````

## File: src/core/Utils.js
````javascript
/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 *  Get the window's audio context.
 *  @function getAudioContext
 *  @return {AudioContext} the audio context
 */
function getAudioContext() {
    // Check if the AudioContext is already created
    if (ToneGetContext()) {
        return ToneGetContext().rawContext;
    }
    const audiocontext = new window.AudioContext();
    ToneSetContext(audiocontext);
    let context = ToneGetContext();
    return context._context;
}

/**
 *  Sets the AudioContext to a specified context to enable cross library compatibility.
 *  @function setAudioContext
 *  @param {AudioContext} the desired AudioContext.
 */
function setAudioContext(context) {
    ToneSetContext(context);
}

/**
 *  userStartAudio() starts the AudioContext on a user gesture. It can be placed in a specific interaction function, such as mousePressed().
 *  @function userStartAudio
 */
function userStartAudio() {
    ToneStart();
}

/**
 *  userStopAudio() stops the AudioContext on a user gesture.
 *  @function userStopAudio
 */
function userStopAudio() {
    context = ToneGetContext();
    context.suspend();
}

export { clamp, getAudioContext, setAudioContext, userStartAudio, userStopAudio };
````

## File: src/sources/SoundFile.js
````javascript
/**
 *  p5.sound.js extends p5.js with Web Audio functionality including audio input, playback, analysis and synthesis.
 *  @module p5.sound
 *  @submodule SoundFile
 *  @for p5.sound
 */

import { Player as TonePlayer } from "tone/build/esm/source/buffer/Player.js";
import { p5soundSource } from "../core/p5soundSource";

/**
 * loadSound() returns a new SoundFile from a specified
 * path. If called during preload(), the SoundFile will be ready
 * to play in time for setup() and draw(). If called outside of
 * preload, the SoundFile will not be ready immediately, so
 * loadSound accepts a callback as the second parameter. Using a
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a> is recommended when loading external files.
 *
 * @method loadSound
 * @for p5.sound
 * @param  {String|Array}   path     Path to the sound file, or an array with
 *                                   paths to soundfiles in multiple formats
 *                                   i.e. ['sound.ogg', 'sound.mp3'].
 *                                   Alternately, accepts an object: either
 *                                   from the HTML5 File API, or a p5.File.
 * @return {SoundFile}               Returns a SoundFile
 * @example
 * <div><code>
 * let mySound;
 * function preload() {
 *   mySound = loadSound('/assets/doorbell.mp3');
 * }
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(canvasPressed);
 *    background(220);
 *    text('tap here to play', 10, 20);
 *  }
 *
 *  function canvasPressed() {
 *    // playing a sound file on a user gesture
 *    // is equivalent to `userStartAudio()`
 *    mySound.play();
 *  }
 *  </code></div>
 */
function loadSound (path) {
  if(self._incrementPreload && self._decrementPreload){
    self._incrementPreload();
    let player = new p5.SoundFile(
      path,
      function () {
        self._decrementPreload();
      }
    );
    return player;

  } else{
    return new Promise((resolve) => {
      let player = new p5.SoundFile(
        path,
        function () {
          resolve(player);
        }
      );
    });
  }
}

/**
 * Load and play sound files.
 * @class SoundFile
 * @constructor
 * @extends p5soundSource
 * @example
 * <div>
 * <code>
 * let sound, amp, delay, cnv;
 * 
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   //need to fix local asset loading first though :) 
 *   sound = loadSound('/assets/doorbell.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   textAlign(CENTER);
 *   cnv.mousePressed(playSound);
 *   amp = new p5.Amplitude();
 *   delay = new p5.Delay();
 *   sound.disconnect();
 *   sound.connect(delay);
 *   delay.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   let dtime = map(mouseX, 0, width, 0, 1);
 *   delay.delayTime(dtime);
 *   let f = map(mouseY, 0, height, 0, .75);
 *   delay.feedback(f);
 *   let level = map(amp.getLevel(), 0, 0.5, 0, 255);
 *   background(level, 0, 0);
 *   fill(255);
 *   text('click to play', width/2, 20);
 *  }
 * </code>
 * </div>
 */
class SoundFile extends p5soundSource {
  constructor(buffer, successCallback) {
    super();
    this.node = new TonePlayer(buffer, successCallback).toDestination();
    this.playing = false;
    this.speed = 1;
    this.paused = false;
  }

  /**
   * Start the soundfile.
   * @method start
   * @for SoundFile 
   */
  start() {
    this.node.playbackRate = this.speed;
    this.playing = true;
    if (!this.paused) {
      this.node.start();
    }
  }

  /**
   * Start the soundfile.
   * @method play
   * @for SoundFile
   */
  play() {
    this.node.playbackRate = this.speed;
    this.playing = true;
    if (!this.paused) {
      this.node.start();
    }
  }

  /**
   * Stop the soundfile.
   * @method stop
   * @for SoundFile 
   */
  stop() {
    this.node.stop();
    this.playing = false;
  }

  /**
   * Pause the soundfile.
   * @method pause
   * @for SoundFile 
   * @example
   * <div>
   * <code>
   * let player;
   *
   * function preload() {
   *   player = loadSound('/assets/Damscray_DancingTiger.mp3');
   * }
   * 
   * function setup() {
   *   describe('A sketch that pauses and resumes sound file playback.');
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(playSound);
   *   background(220);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   background(220);
   *   text('click to play', 0, 20, 100);
   *   
   *   player.loop();
   * }
   * 
   * function playSound() {
   *   if (!player.isPlaying()) {
   *     player.play();
   *     background(220);
   *     text('click to pause', 0, 20, 100);
   *   }
   *   else {
   *     player.pause();
   *     background(220);
   *     text('click to play', 0, 20, 100);
   *   }
   * }
   * </code>
   * </div>
   */
  pause() {
    //no such pause method in Tone.js need to find workaround
    this.node.playbackRate = 0;
    this.playing = false;
    this.paused = true;
  }

  /**
   * Loop the soundfile.
   * @method loop
   * @for SoundFile
   * @param {Boolean} loopState Set to True or False in order to set the loop state.
   */
  loop(value = true) {
    this.node.loop = value;
  }

  /**
   * Set a loop region. The loop() method must be set to true for this to work.
   * @method setLoop
   * @for SoundFile
   * @param {Number} [startTime] The start time of the loop point in seconds.
   * @param {Number} [duration] The duration of the loop point in seconds.
   */
  loopPoints(startTime = 0, duration = this.node.buffer.duration) {
    this.node.loopStart = startTime;
    this.node.loopEnd = startTime + duration;
  }
  
  /**
   * Change the path for the soundfile.
   * @method setPath
   * @for SoundFile
   * @param {String} path Path to the sound file.
   * @param {Function} [successCallback] Function to call when the sound file is loaded.
   * @example
   * <div>
   * <code>
   * let soundSource, cnv, btn;
   *
   * function preload() {
   *   soundSource = loadSound('/assets/Damscray_-_Dancing_Tiger_01.mp3');
   * }
   * 
   * function setup() {
   *   describe(
   *     'a sketch that says click to play sound. there is a button that says load sound. when you click the button, the path of the sound file player changes and the new sound plays.');
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(playSound);
   *   background(220);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   text('click to play sound or the button to load a new sound', 0, 20, 100);
   *   btn = createButton('New Sound');
   *   btn.mousePressed(setNewPath);
   *   soundSource.loop();  
   * }
   * 
   * function playSound() {
   *   soundSource.play();
   * }
   * 
   * function setNewPath() {
   *   background(220);
   *   text('a new sound was loaded', 0, 20, 100);
   *   soundSource.setPath('/assets/Damscray_-_Dancing_Tiger_02.mp3', playSound); 
   * }
   * </code>
   * </div>
   */
  setPath(path, successCallback) {
    this.node.load(path).then(() => {
      if (successCallback) {
        successCallback();
      }
      else {
        console.log('Audio loaded successfully!');
      }
    }).catch((error) => {
      console.error('Error loading audio:', error);
    });
  }

  /**
   * Set the playback rate of the soundfile.
   * @method rate
   * @for SoundFile
   * @param {Number} rate 1 is normal speed, 2 is double speed. Negative values plays the soundfile backwards.  
   */
  rate(value = 1) {
    if (value < 0) {
      value = 0;
    }
    this.node.playbackRate = value;
    this.speed = value;

  }

  /**
   * Returns the duration of a sound file in seconds.
   * @method duration
   * @for SoundFile 
   * @return {Number} duration
   */
  duration() {
    return this.node.buffer.duration;
  }

  /**
   * Return the sample rate of the sound file.
   * @method sampleRate
   * @for SoundFile
   * @return {Number} sampleRate
   */
  sampleRate() {
    if (this.node.buffer) return this.node.buffer.sampleRate;
  }

  /**
   * Move the playhead of a soundfile that is currently playing to a new position.
   * @method jump
   * @for SoundFile 
   * @param {Number} timePoint Time to jump to in seconds.
   */
  jump(value) {
    this.node.seek(value);
  }

  /**
   * Return the playback state of the soundfile.
   * @method isPlaying
   * @for SoundFile 
   * @return {Boolean} Playback state, true or false.
   */
  isPlaying() {
    return this.playing;
  }

  /**
   * Return the playback state of the soundfile.
   * @method isLooping
   * @for SoundFile 
   * @return {Boolean} Looping State, true or false.
   */
  isLooping() {
    return this.node.loop;
  }

  /**
   * Define a function to call when the soundfile is done playing.
   * @method onended
   * @for SoundFile
   * @param {Function} callback Name of a function that will be called when the soundfile is done playing.
   * @example
   * <div>
   * <code>
   * let player;
   *
   * function preload() {
   *   player = loadSound('/assets/lucky_dragons_-_power_melody.mp3');
   * }
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   textAlign(CENTER);
   *   textSize(10);
   *   text('click to play', width/2, height/2);
   *   cnv.mousePressed(playSound);
   *   player.onended(coolFunction);
   * }
   * 
   * function coolFunction() {
   *   background(220);
   *   text('sound is done', width/2, height/2);
   * }
   * 
   * function playSound() {
   *   background(0, 255, 255);
   *   text('sound is playing', width/2, height/2);
   *   if (!player.isPlaying()) {
   *     player.play();
   *   }
   * }
   * </code>
   * </div>
   */
  onended(callback) {
    this.node.onstop = callback;
  }
    
  /**
   * Return the number of samples in a sound file.
   * @method frames
   * @for SoundFile
   * @return {Number} The number of samples in the sound file.
   * @example
   * <div>
   * <code>
   * let player;
   *
   * function preload() {
   *   player = loadSound('/assets/lucky_dragons_-_power_melody.mp3');
   * }
   * 
   * function setup() {
   *   describe('A sketch that calculates and displays the length of a sound file using number of samples and sample rate.');
   *   createCanvas(100, 100);
   *   background(220);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   frames = player.frames();
   *   sampleRate = player.sampleRate();
   *   sampleLength = round((frames / sampleRate), 2);
   *   info = `sample is ${sampleLength} seconds long`;
   *   text(info, 0, 20, 100);
   * }
   * </code>
   * </div>
   */
  frames() {
    if (this.node.buffer) return this.node.buffer.length;
  }

  /**
   * Gets the number of channels in the sound file.
   * @method channels
   * @for SoundFile
   * @return Returns the number of channels in the sound file.
   */
  channels() {
    if (this.node.buffer) return this.node.buffer.numberOfChannels;
  }
}

export default SoundFile;
export { loadSound };
````

## File: package.json
````json
{
  "name": "p5.sound",
  "version": "0.3.0-rc.0",
  "description": "p5.sound is a minimal wrapper for Tone.js designed to extend the musical and audio capabilities of the p5.js core library.",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c"
  },
  "keywords": [
    "p5.js",
    "sound"
  ],
  "author": "",
  "license": "LGPL-2.1",
  "main": "./dist/p5.sound.js",
  "files": [
    "LICENSE",
    "dist/p5.sound.min.js",
    "dist/p5.sound.js"
  ],
  "dependencies": {
    "lodash": "^4.17.21",
    "tone": "^15.0.2",
    "yuidocjs": "^0.10.2"
  },
  "devDependencies": {
    "@babel/core": "^7.24.5",
    "@babel/preset-env": "^7.24.5",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-json": "^6.1.0",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "babel-loader": "^9.1.3",
    "rollup": "^2.79.1",
    "rollup-plugin-ignore": "^1.0.10",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-visualizer": "^5.12.0",
    "terser-webpack-plugin": "^5.3.10",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4"
  },
  "sideEffects": false
}
````

## File: src/app.js
````javascript
import { getAudioContext, setAudioContext, userStartAudio, userStopAudio } from './core/Utils';
p5.prototype.getAudioContext = getAudioContext;
p5.prototype.setAudioContext = setAudioContext;
p5.prototype.userStartAudio = userStartAudio;
p5.prototype.userStopAudio = userStopAudio;

import { p5soundNode } from "./core/p5soundNode";
import { p5soundSource } from "./core/p5soundSource";
import { p5soundMixEffect } from "./core/p5soundMixEffect";
p5.p5soundMixEffect = p5soundMixEffect;
p5.p5soundNode = p5soundNode;
p5.p5soundSource = p5soundSource;
import Oscillator from './sources/Oscillator';
p5.Oscillator = Oscillator;

import {SawOsc, SinOsc, TriOsc, SqrOsc} from './sources/Oscillator';
p5.SawOsc = SawOsc;
p5.SinOsc = SinOsc;
p5.TriOsc = TriOsc;
p5.SqrOsc = SqrOsc;

import Envelope from './effects/Envelope';
p5.Envelope = Envelope;

import Delay from './effects/Delay';
p5.Delay = Delay;

import Reverb from './effects/Reverb';
p5.Reverb = Reverb;

import Biquad from './effects/Biquad';
p5.Biquad = Biquad;

import {LowPass, HighPass, BandPass} from './effects/Biquad';
p5.LowPass = LowPass;
p5.HighPass = HighPass;
p5.BandPass = BandPass;

import PitchShifter from './effects/PitchShifter';
p5.PitchShifter = PitchShifter;

import Gain from './effects/Gain';
p5.Gain = Gain;

import Amplitude from './analysis/Amplitude';
p5.Amplitude = Amplitude;

import FFT from './analysis/FFT';
p5.FFT = FFT;

import Noise from './sources/Noise';
p5.Noise = Noise;

import Panner from './effects/Panner';
p5.Panner = Panner;

import Panner3D from './effects/Panner3D';
p5.Panner3D = Panner3D;

import SoundFile, { loadSound } from './sources/SoundFile';
p5.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;

import AudioIn from './sources/AudioIn';
p5.AudioIn = AudioIn;

//import Recorder from './Recorder';
//p5.prototype.Recorder = Recorder;
````

## File: README.md
````markdown
# p5.sound.js

p5.sound.js extends the musical and sonic capabilities of [p5.js](https://p5js.org). It is designed to be a minimal abstraction of the [Tone.js](https://tonejs.github.io/) library with a feature set that is inspired by p5.js's approach to accessible and poetic creative coding. Key functionalities include audio input, sound file playback and manipulation, effects, synthesis and analysis.

## Examples

- p5.sound example on p5.js editor [here](https://editor.p5js.org/thomasjohnmartinez/collections/Dp0zGclVL)
- Legacy p5.js Sound Tutorial by Dan Shiffman on [YouTube](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW)

## Documentation

Interactive documentation can be found at [beta.p5js.org/reference/p5.sound](http://beta.p5js.org/reference/p5.sound)

## Latest Build

- Visit http://p5js.org/download/ for the latest official release of p5.js with the latest p5.sound included.
- The p5.sound.js library [here](https://github.com/processing/p5.sound.js) is updated more frequently, and we occasionally offer new [releases](https://github.com/processing/p5.sound.js/releases) before the release cycle of p5.js.

## Contribute

If you would like to contribute to this project, visit https://github.com/processing/p5.js/tree/main/contributor_docs to get started.

If you have any questions or concerns regarding the project, you can reach out to our [Discord](https://discord.gg/HWzy4HpaEJ) and [Gitter](https://gitter.im/processing/p5.js-sound) communities. The p5.js team closely monitors all pull requests and issues on GitHub, so there's no need to also post them on Discord. Additionally, conversations about specific pull requests and issues should take place on GitHub, to ensure that people following along can see and take part in the discussion.

## Dependencies

p5.sound is built using [Tone.js](https://github.com/tonejs/Tone.js), an interactive music framework developed by [Yotam Mann](https://github.com/tambien).

## Library Revision

This repository is an update of the [original p5.sound](https://github.com/processing/p5.js-sound) library (initially authored by [Jason Sigal](https://github.com/therewasaguy)) made with the following goals in mind:

- Code stability and readability
- Updated and fewer dependencies
- Deprecating the least used features
- Greater consistency between classes and methods

The project was started by aarón montoya-moraga ([montoyamoraga](https://github.com/montoyamoraga)) during the 2023 p5.js sound fellowship (read the [announcement](https://medium.com/@ProcessingOrg/announcing-the-2023-p5-sound-fellow-aar%C3%B3n-montoya-moraga-7613450902f6) for more details) and was completed by [Tommy Martinez](https://github.com/ogbabydiesal) in September, 2024.

A changeleog of new and deprecated features in the new library can be viewed ([here](https://docs.google.com/spreadsheets/d/1pL0EVOlRTtfc6kcmK2rd9tZXpZal8FkJKALPb7app28/edit?gid=0#gid=0))

Core contributors:
- Tommy Martinez ([ogbabydiesal](https://github.com/ogbabydiesal))
- aarón montoya-moraga ([montoyamoraga](https://github.com/montoyamoraga))

Project mentors and advisors:
- Kristin Galvin ([blechdom](https://github.com/blechdom))
- Kenneth Lim ([limzykenneth](https://github.com/limzykenneth))
- Rachel Lim ([raclim](https://github.com/raclim))
- Yotam Mann ([tambien](https://github.com/tambien))
- Dave Pagurek ([davepagurek](https://github.com/davepagurek))
- Luisa Peirera ([luisaph](https://github.com/luisaph))
- Jason Sigal ([therewasaguy](https://github.com/therewasaguy))
- Cassie Tarakajian ([catarak](https://github.com/catarak))
- Qianqian Ye ([Qianqianye](https://github.com/Qianqianye))

## Usage

To use this library, make sure you have p5.js installed. Visit the [p5.js website](https://p5js.org/) for more information and installation instructions.

Please let us know if you find any bugs or issues by creating a new issue in this repo!

## Building the Library

installing the dependencies
```
npm install
```

building the library
```
npm run build
```

building reference pages (optional)
```
npx yuidoc .
```
````
