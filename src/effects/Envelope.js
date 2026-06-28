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
    })
    const toneInput  = this.node.input.input ?? this.node.input;
    const toneOutput = this.node.output.output ?? this.node.output;
    this.input.connect(toneInput);
    toneOutput.connect(this.output);
  }

  /**
   * Trigger the envelope and release it after the sustain time.
   * @method play
   * @for Envelope
   * @example
   * <div>
   * <code>
   * let fft, noise, envelope;
   * 
   * function setup() {
   *   createCanvas(100,100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   fill(255, 0, 255);
   * 
   *   envelope = new p5.Envelope();
   *   noise = new p5.Noise();
   *   noise.disconnect();
   *   noise.connect(envelope);
   * 
   *   fft = new p5.FFT(128);
   *   envelope.connect(fft);
   * }
   * 
   * function draw() {
   *   background(220);
   * 
   *   // draw the audio spectrum
   *   let spectrum = fft.analyze();
   *   noStroke();
   *   fill(0, 0, 0);
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   *   text('click to play an enveloped noise burst', 10, 20, width - 20);
   * }
   * 
   * function mousePressed() {
   *   noise.start();
   *   envelope.play();
   * }
   * </code>
   * </div>
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
   * Sets the attack, decay, sustain, and release times of the envelope.
   * @method setADSR
   * @for Envelope
   * @param {Number} attack how quickly the envelope reaches the maximum level
   * @param {Number} decay how quickly the envelope reaches the sustain level
   * @param {Number} sustain how long the envelope stays at the decay level
   * @param {Number} release how quickly the envelope fades out after the sustain level
   * @example
   * <div>
   * <code>
   * let fft, noise, envelope;
   *
   * function setup() {
   *   createCanvas(100,100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   fill(255, 0, 255);
   * 
   *   envelope = new p5.Envelope();
   *   noise = new p5.Noise();
   *   noise.disconnect();
   *   noise.connect(envelope);
   * 
   *   fft = new p5.FFT(128);
   *   envelope.connect(fft);
   *   //adjust the envelop parameters to create unique sounds
   *   envelope.setADSR(0.1, 2.1, 1, 3);
   * }
   * 
   * function draw() {
   *   background(220);
   * 
   *   // draw the audio spectrum
   *   let spectrum = fft.analyze();
   *   noStroke();
   *   fill(0, 0, 0);
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   *   text('click to play an enveloped noise burst', 10, 20, width - 20);
   * }
   * 
   * function mousePressed() {
   *   noise.start();
   *   envelope.play();
   * }
   * </code>
   * </div>
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
   * @param {Number} releaseTime the release time of the envelope in seconds 
   * @example
   * <div>
   * <code>
   * let fft, noise, envelope;
   *
   * function setup() {
   *   createCanvas(100,100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   fill(255, 0, 255);
   * 
   *   envelope = new p5.Envelope();
   *   noise = new p5.Noise();
   *   noise.disconnect();
   *   noise.connect(envelope);
   * 
   *   fft = new p5.FFT(128);
   *   envelope.connect(fft);
   * }
   * 
   * function draw() {
   *   background(220);
   * 
   *   // draw the audio spectrum
   *   let spectrum = fft.analyze();
   * 
   *   //move the mouse to change the envelope's release time
   *   let releaseTime = round(map(mouseX, 0, width, 0.1, 5));
   *   envelope.releaseTime(releaseTime);
   * 
   *   noStroke();
   *   fill(0, 0, 0);
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   *   text('click to play noise and move mouse to change release time', 10, 10, width - 20);
   *   text('Release Time: ' + releaseTime, 0, 65, width);
   * }
   * 
   * function mousePressed() {
   *   noise.start();
   *   envelope.play();
   * }
   */
  releaseTime(value) {
    this.node.release = value;
  }

  /**
   * Sets the attack time of the envelope.
   * @method attackTime
   * @for Envelope
   * @param {Number} attackTime the attack time of the envelope in seconds 
   * @example
   * <div>
   * <code>
   * let fft, noise, envelope;
   *
   * function setup() {
   *   createCanvas(100,100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   fill(255, 0, 255);
   * 
   *   envelope = new p5.Envelope();
   *   noise = new p5.Noise();
   *   noise.disconnect();
   *   noise.connect(envelope);
   * 
   *   fft = new p5.FFT(128);
   *   envelope.connect(fft);
   * }
   * 
   * function draw() {
   *   background(220);
   * 
   *   // draw the audio spectrum
   *   let spectrum = fft.analyze();
   * 
   *   //move the mouse to change the envelope's attack time
   *   let attackTime = round(map(mouseX, 0, width, 0.01, 0.4), 2);
   *   envelope.attackTime(attackTime);
   * 
   *   noStroke();
   *   fill(0, 0, 0);
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.02, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   *   text('click to play noise and move mouse to change attack time', 10, 10, width - 20);
   *   text('Attack Time: ' + attackTime, 0, 65, width);
   * }
   * 
   * function mousePressed() {
   *   noise.start();
   *   envelope.play();
   * }
   * </div>
   * <code>
   */
  attackTime(value) {
    this.node.attack = value;
  }
}

export default Envelope;