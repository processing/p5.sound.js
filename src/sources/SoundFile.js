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
  if (typeof path === 'string') path = encodeURI(path);
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
    this.node = new TonePlayer(buffer, successCallback).connect(this.output);
    this.playing = false;
    this.speed = 1;
    this.paused = false;
  }

  /**
   * Start the soundfile.
   * @method start
   * @for SoundFile 
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/chime.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that plays a soundfile");
   * }
   *
   * function draw() {
   *   background(220);
   *   text("click to play the sound, demonstrating the start() method", 0, 20, width);
   * }
   *
   * function mousePressed() {
   *   sample.start();
   * }
   * </code>
   * </div>
   */
  start() {
    this.node.playbackRate = this.speed;
    this.playing = true;
    if (!this.paused) {
      this.node.start();
    }
  }

  /**
   * Start the soundfile. Same as the start() method.
   * @method play
   * @for SoundFile
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/chime.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that plays a soundfile");
   * }
   *
   * function draw() {
   *   background(220);
   *   text("click to play the sound, demonstrating the start() method", 0, 20, width);
   * }
   *
   * function mousePressed() {
   *   sample.start();
   * }
   * </code>
   * </div>
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
   * @example
   * async function setup() {
   *  sample = await loadSound("assets/chime.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that plays a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  if (!sample.playing) {
   *    text("click to play the sound, demonstrating the start() method", 0, 20, width);
   *  }
   *  else {
   *    text("click to stop the sound, demonstrating the stop() method", 0, 20, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  if (!sample.playing) {
   *    sample.start();
   *  }
   *  else {
   *    sample.stop();
   *  }
   * }
   * </code>
   * </div>
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
   * async function setup() {
   *  sample = await loadSound("assets/chime.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that pauses and resumes a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  if (!sample.playing) {
   *    text("click to play the sound, demonstrating the start() method", 0, 20, width);
   *  }
   *  else {
   *    text("click to pause the sound, demonstrating the pause() method", 0, 20, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  if (!sample.playing) {
   *    sample.start();
   *  }
   *  else {
   *    sample.pause();
   *  }
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
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *
   *  //set the sample to loop
   *  sample.loop(true);
   *  //call a function when the sound ends
   *  sample.onended(stopSound);
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that plays and pauses a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  if (!sample.playing) {
   *    text("click to play the sound and it will loop", 0, 20, width);
   *  }
   *  else {
   *    text("click to stop the looping", 0, 20, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  if (!sample.playing) {
   *    sample.start();
   *  }
   *  else {
   *    //stop the sample by disabling looping
   *    sample.loop(false);
   *  }
   * }
   *
   * function stopSound() {
   *  //stop the sound when the loop ends
   *  sample.stop();
   * }
   * </code>
   * </div>
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
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *
   *  //set the sample to loop, must be on for loopPoints to work
   *  sample.loop(true);
   *
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that loops short segments of a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  if (!sample.playing) {
   *    text("click to play the sound and it will loop", 0, 20, width);
   *  }
   *  else {
   *    text("click to stop the looping", 0, 20, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  sample.start();
   *  //set the loop points to a random range in the soundfile, making sure not to choose looppoints that exceed the duration fo the soundfile.
   *  sample.loopPoints(random(0, sample.duration() - 0.3), random(0, 0.3))
   * }
   * </code>
   * </div>
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
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *  sample.loop(true);
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(10);
   *  describe("a sketch that changes the playback rate of a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  rate = map(mouseX, 0, width, 0.5, 2);
   *  sample.rate(rate);
   *  if (!sample.isPlaying()) {
   *    text("click to play the sound, move your mouse to change the playback rate", 0, 20, width);
   *  }
   *  else {
   *    text("Playback Rate: " + rate.toFixed(2), 0, 20, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  if(!sample.isPlaying()) {
   *    sample.play();
   *  }
   *  else {
   *    sample.stop();
   *  }
   * }
   * </code>
   * </div>
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
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that reports the duration of a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  duration = sample.duration();
   *  text("Duration: " + duration + " seconds", 0, 20, width);
   * }
   * </code>
   * </div>
   */
  duration() {
    return this.node.buffer.duration;
  }

  /**
   * Return the sample rate of the sound file.
   * @method sampleRate
   * @for SoundFile
   * @return {Number} sampleRate
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that reports the sample rate of a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  sampleRate = sample.sampleRate();
   *  text("Sample Rate: " + sampleRate + " Hz", 0, 20, width);
   * }
   * </code>
   * </div>
   */
  sampleRate() {
    if (this.node.buffer) return this.node.buffer.sampleRate;
  }

  /**
   * Move the playhead of a soundfile that is currently playing to a new position.
   * @method jump
   * @for SoundFile 
   * @param {Number} timePoint Time to jump to in seconds.
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *  duration = sample.duration();
   *  sample.loop(true);
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(10);
   *  describe("a sketch that jumps to a specific point in a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  text("Duration: " + duration + " s", 0, 20, width);
   *  if (sample.isPlaying()) {
   *    text("jump to: " + (mouseX / width * duration).toFixed(2) + " s on next click", 0, 40, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  if(!sample.isPlaying()) {
   *    sample.play();
   *  }
   *  else {
   *    sample.jump(mouseX / width * duration);
   *  }
   * }
   * </code>
   * </div>
   */
  jump(value) {
    this.node.seek(value);
  }

  /**
   * Return the playback state of the soundfile.
   * @method isPlaying
   * @for SoundFile 
   * @return {Boolean} Playback state, true or false.
   * @example
   * async function setup() {
   *  sample = await loadSound("assets/chime.mp3");
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(8);
   *  describe("a sketch that plays a soundfile");
   * }
   *
   * function draw() {
   *  background(220);
   *  //check if sample is playing or not
   *  if (!sample.playing) {
   *    text("click to play the sound, demonstrating the start() method", 0, 20, width);
   *  }
   *  else {
   *    text("click to stop the sound, demonstrating the stop() method", 0, 20, width);
   *  }
   * }
   *
   * function mousePressed() {
   *  //check if sample is playing or not
   *  if (!sample.playing) {
   *    sample.start();
   *  }
   *  else {
   *    sample.stop();
   *  }
   * }
   * </code>
   * </div>
   */
  isPlaying() {
    return this.playing;
  }

  /**
   * Return the playback state of the soundfile.
   * @method isLooping
   * @for SoundFile 
   * @return {Boolean} Looping State, true or false.
   * @example
   * <div>
   * <code>
   * async function setup() {
   *  sample = await loadSound("assets/drums.mp3");
   *  //uncomment the line below to see the text update
   *  //sample.loop(true);
   *  looping = sample.isLooping();
   *  createCanvas(100, 100);
   *  textAlign(CENTER);
   *  textWrap(WORD);
   *  textSize(10);
   *  describe("a sketch that checks whether a soundfile is looping");
   * }
   *
   * function draw() {
   *  background(220);
   *  text("Looping: " + looping, 0, 20, width);
   * }
   * </code>
   * </div>
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
   * @example
   * <div>
   * <code>
   * async function setup() {
   *   sample = await loadSound("assets/chime.mp3");
   *   createCanvas(100, 100);
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   describe("a sketch that reports how many channels an audio file has");
   * }
   * 
   * function draw() {
   *   background(220);
   *   numberOfChannels = sample.channels();
   *   text("sample has " + numberOfChannels + " channels", 10, 10, width);
   * }
   * </code>
   * </div>
   */
  channels() {
    if (this.node.buffer) return this.node.buffer.numberOfChannels;
  }
}

export default SoundFile;
export { loadSound };
