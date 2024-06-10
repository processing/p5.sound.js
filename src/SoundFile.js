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
 * A sound file player.
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
    this.soundfile.volume.value = 0;
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
    this.soundfile.start();
  }

  /**
   * Start the soundfile.
   * @method play
   * @for SoundFile
   */
  play() {
    this.soundfile.start();
  }

  /**
   * Stop the soundfile.
   * @method stop
   * @for SoundFile 
   */
  stop() {
    this.soundfile.stop();
  }
}

export default SoundFile;
export { loadSound };