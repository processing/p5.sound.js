/**
 *  p5.sound.js extends p5.js with Web Audio functionality including audio input, playback, analysis and synthesis.
 *  @module p5.sound
 *  @submodule P5SoundFile
 *  @for p5.sound
 */

import { Player as TonePlayer } from "tone/build/esm/source/buffer/Player.js";
import { P5SoundStartableSourceNode } from "../core/P5SoundStartableSourceNode.js";

/**
 *  loadSound() returns a new P5SoundFile from a specified
 *  path. If called during preload(), the P5SoundFile will be ready
 *  to play in time for setup() and draw(). If called outside of
 *  preload, the P5SoundFile will not be ready immediately, so
 *  loadSound accepts a callback as the second parameter. Using a
 *  <a href="https://github.com/processing/p5.js/wiki/Local-server">
 *  local server</a> is recommended when loading external files.
 *
 *  @method loadSound
 *  @for sound
 *  @param  {String|Array}   path     Path to the sound file, or an array with
 *                                    paths to soundfiles in multiple formats
 *                                    i.e. ['sound.ogg', 'sound.mp3'].
 *                                    Alternately, accepts an object: either
 *                                    from the HTML5 File API, or a p5.File.
 *  @return {P5SoundFile}               Returns a P5SoundFile
 *  @example
 *  <div><code>
 *  let mySound;
 *  function preload() {
 *    mySound = loadSound('/assets/doorbell.mp3');
 *  }
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
export function loadSound (path)
{
  if(self._incrementPreload && self._decrementPreload)
  {
    self._incrementPreload();

    let player = new p5.SoundFile
    (
      path,
      function () {
        self._decrementPreload();
      }
    );

    return player;

  }
  else
  {
    return new Promise((resolve) =>
    {
      let player = new p5.SoundFile
      (
        path,
        function ()
        {
          resolve(player);
        }
      );
    });
  }
}

/**
 * Load and play sound files.
 * @class P5SoundFile
 * @constructor
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
 *   delay = new p5.P5SoundDelay();
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
export class P5SoundFile extends P5SoundStartableSourceNode
{
  constructor(buffer, successCallback)
  {
    super();

    this._tonePlayerNode = new TonePlayer(buffer, successCallback);

    this._isPlaying = false;
    this._speed = 1;
    this._paused = false;

    this.configureOutput(this._tonePlayerNode);
  }

  isP5SoundFile = true;

  /**
   * Start the soundfile.
   * @method start
   * @for P5SoundFile
   */
  start()
  {
    this._tonePlayerNode.playbackRate = this._speed;
    this._isPlaying = true;

    if (!this._paused)
    {
      this._tonePlayerNode.start();
    }
  }

  /**
   * Start the soundfile.
   * @method play
   * @for P5SoundFile
   */
  play()
  {
    this._tonePlayerNode.playbackRate = this._speed;
    this._isPlaying = true;

    if (!this._paused)
    {
      this._tonePlayerNode.start();
    }
  }

  /**
   * Stop the soundfile.
   * @method stop
   * @for P5SoundFile
   */
  stop()
  {
    this._tonePlayerNode.stop();
    this._isPlaying = false;
  }

  /**
   * Pause the soundfile.
   * @method pause
   * @for P5SoundFile
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
  pause()
  {
    //no such pause method in Tone.js need to find workaround
    this._tonePlayerNode.playbackRate = 0;
    this._isPlaying = false;
    this._paused = true;
  }

  /**
   * Loop the soundfile.
   * @method loop
   * @for P5SoundFile
   * @param {Boolean} loopState Set to True or False in order to set the loop state.
   */
  loop(value = true)
  {
    this._tonePlayerNode.loop = value;
  }

  /**
   * Set a loop region, and optionally a playback rate, and amplitude for the soundfile.
   * @method setLoop
   * @for P5SoundFile
   * @param {Number} [startTime] Set to True or False in order to set the loop state.
   * @param {Number} [rate] Set to True or False in order to set the loop state.
   * @param {Number} [amp] Set to True or False in order to set the loop state.
   * @param {Number} [duration] Set to True or False in order to set the loop state.
   */
  loopPoints(startTime = 0, duration = this._tonePlayerNode.buffer.duration, schedule = 0)
  {
    this._tonePlayerNode.loopStart = startTime;
    this._tonePlayerNode.loopEnd = startTime + duration;
  }
  
  /**
   * Change the path for the soundfile.
   * @method setPath
   * @for P5SoundFile
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
  setPath(path, successCallback)
  {
    this._tonePlayerNode.load(path).then(() =>
    {
      if (successCallback)
      {
        successCallback();
      }
      else
      {
        console.log('Audio loaded successfully!');
      }
    }).catch((error) =>
    {
      console.error('Error loading audio:', error);
    });
  }

  /**
   * Set the playback rate of the soundfile.
   * @method rate
   * @for P5SoundFile
   * @param {Number} rate 1 is normal speed, 2 is double speed. Negative values plays the soundfile backwards.  
   */
  rate(value = 1)
  {
    if (value < 0)
    {
      value = 0;
    }

    this._tonePlayerNode.playbackRate = value;
    this._speed = value;
  }

  /**
   * Returns the duration of a sound file in seconds.
   * @method duration
   * @for P5SoundFile
   * @return {Number} duration
   */
  duration()
  {
    return this._tonePlayerNode.buffer.duration;
  }

  /**
   * Return the sample rate of the sound file.
   * @method sampleRate
   * @for P5SoundFile
   * @return {Number} sampleRate
   */
  sampleRate()
  {
    if (this._tonePlayerNode.buffer)
    {
      return this._tonePlayerNode.buffer.sampleRate;
    }
  }

  /**
   * Move the playhead of a soundfile that is currently playing to a new position.
   * @method jump
   * @for P5SoundFile
   * @param {Number} timePoint Time to jump to in seconds.
   */
  jump(value)
  {
    this._tonePlayerNode.seek(value);
  }

  /**
   * Return the playback state of the soundfile.
   * @method isPlaying
   * @for P5SoundFile
   * @return {Boolean} Playback state, true or false.
   */
  isPlaying()
  {
    return this._isPlaying;
  }

  /**
   * Return the playback state of the soundfile.
   * @method isLooping
   * @for P5SoundFile
   * @return {Boolean} Looping State, true or false.
   */
  isLooping()
  {
    return this._tonePlayerNode.loop;
  }

  /**
   * Define a function to call when the soundfile is done playing.
   * @method onended
   * @for P5SoundFile
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
  onended(callback)
  {
    this._tonePlayerNode.onstop = callback;
  }
    
  /**
   * Return the number of samples in a sound file.
   * @method frames
   * @for P5SoundFile
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
  frames()
  {
    if (this._tonePlayerNode.buffer)
    {
      return this._tonePlayerNode.buffer.length;
    }
  }
  
  /**
   * Gets the number of channels in the sound file.
   * @method sampleRate
   * @for P5SoundFile
   * @return Returns the sample rate of the sound file.
   */
  sampleRate()
  {
    if (this._tonePlayerNode.buffer)
    {
      this._tonePlayerNode.buffer.sampleRate;
    }
  }

  /**
   * Gets the number of channels in the sound file.
   * @method channels
   * @for P5SoundFile
   * @return Returns the number of channels in the sound file.
   */
  channels()
  {
    if (this._tonePlayerNode.buffer)
    {
      return this._tonePlayerNode.buffer.numberOfChannels;
    }
  }
}
