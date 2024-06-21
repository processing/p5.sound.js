import * as Tone from "tone";

function loadSound (path) {
  let player = new SoundFile(
    path,
    function () { 
      self._decrementPreload();
    }
  );
  return player;
}

/**
 * Load and play sound files.
 * @class SoundFile
 * @constructor
 * @example
 * <div>
 * <code>
 * let sound, amp, delay, cnv;
 * 
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   //need to fix local asset loading first though :) 
 *   sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   textAlign(CENTER);
 *   cnv.mousePressed(playSound);
 *   amp = new Amplitude();
 *   delay = new Delay();
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
class SoundFile {
  constructor(buffer, callback) {
    this.soundfile = new Tone.Player(buffer, callback).toDestination();
    
    this.clip = new Tone.Loop(() => {
      this.soundfile.start();
    }, 
    this.soundfile.buffer.duration);

  }

  getNode() {
    return this.soundfile;
  }

  connect(destination) {
    this.soundfile.connect(destination.getNode());
  }

  disconnect() {
    this.soundfile.disconnect(Tone.Context.destination);
  }

  /**
   * Start the soundfile.
   * @method start
   * @for SoundFile 
   */
  start() {
    this.soundfile.sync().start(0);
  }

  /**
   * Start the soundfile.
   * @method play
   * @for SoundFile
   */
  play() {
    
    this.clip.start(0);
  }

  pause() {
    this.clip.stop();
  }


  /**
   * Stop the soundfile.
   * @method stop
   * @for SoundFile 
   */
  stop() {
    this.soundfile.stop();
  }

  /**
   * Pause the soundfile.
   * @method pause
   * @for SoundFile 
   */
  pause() {
    //no such pause method in Tone.js need to find workaround
    Tone.getTransport().pause();
  }

  /**
   * Loop the soundfile.
   * @method loop
   * @for SoundFile
   * @param {Boolean} value 
   */
  loop(value = true) {
    this.soundfile.loop = value;
  }
  
  /**
   * Adjust the amplitude of the soundfile.
   * @method amp
   * @for SoundFile
   * @param {Number} value amplitude value between 0 and 1.
   */
  amp(value) {
    let dbValue = Tone.gainToDb(value);
    this.soundfile.volume.value = dbValue;
  }

  /**
   * Set the playback rate of the soundfile.
   * @method rate
   * @for SoundFile
   * @param {Number} rate 1 is normal speed, 2 is double speed. Negative values plays the soundfile backwards.  
   */
  rate(value) {
    this.soundfile.playbackRate = value;
  }

  /**
   * Returns the duration of a sound file in seconds.
   * @method duration
   * @for SoundFile 
   * @return {Number} duration
   */
  duration() {
    return this.soundfile.buffer.duration;
  }

  /**
   * Return the sample rate of the sound file.
   * @method sampleRate
   * @for SoundFile
   * @return {Number} sampleRate
   */
  sampleRate() {
    if (this.soundfile.buffer) return this.sounfile.buffer.sampleRate;
  }

  /**
   * Return the current position of the p5.SoundFile playhead, in seconds.
   * @method currentTime
   * @for SoundFile
   * @return {Number} currentTime
   */
  currentTime() {
    //let currentTime = Tone.Transport.seconds - this.soundfile.startTime;
    return currentTime;
  }

  /**
   * Move the playhead of a soundfile that is currently playing to a new position.
   * @method jump
   * @for SoundFile 
   * @param {Number} value Time to jump to.
   */
  jump(value) {
    this.soundfile.seek(value);
  }

  /**
   * Return the playback state of the soundfile.
   * @method isPlaying
   * @for SoundFile 
   * @return {Boolean} playback state
   */
  isPlaying() {
    return this.soundfile.state === 'started';
  }
}

export default SoundFile;
export { loadSound };