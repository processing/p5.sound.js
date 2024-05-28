// import Tone.js dependency
import * as Tone from 'tone';

// create a new AudioContext from Web Audio API
const audioContext = new window.AudioContext();

// set the context for Tone.js to be the same as p5.sound.js
Tone.setContext(audioContext);

/**
 * <p>Returns the Audio Context for this sketch. Useful for users
 * who would like to dig deeper into the <a target='_blank' href=
 * 'http://webaudio.github.io/web-audio-api/'>Web Audio API
 * </a>. and the reference for it at <a target='_blank' href=
 * 'https://developer.mozilla.org/en-US/docs/Web/API/AudioContext'>
 * MDN Web Docs</a></p>
 *
 * <p>Browsers require users to start the audio context
 * with a user gesture, such as touchStarted in the example below.</p>
 *
 * @for p5sound
 * @method getAudioContext
 * @return {Object}    audioContext for this sketch
 * @example
 *  function draw() {
 *    background(255);
 *    textAlign(CENTER);
 *
 *    if (getAudioContext().state == 'running') {
 *      text('audioContext is running', width/2, height/2);
 *    } else if (getAudioContext().state == 'suspended') {
 *      text('audio is suspended', width/2, height/2);
 *    } else if (getAudioContext().state == 'closed') {
 *     text('audioContext is closed', width/2, height/2);
 *    }
 *
 *   text('tap or mouse press to change behavior', width/2, height/2 + 20);
 *
 *  function mousePressed() {
 *    if (getAudioContext().state == 'suspended') {
 *      getAudioContext().resume();
 *    } else if (getAudioContext().state == 'running') {
 *     getAudioContext().suspend();
 *  }
 *
 */
export function getAudioContext() {
  return audioContext;
}

export default audioContext;