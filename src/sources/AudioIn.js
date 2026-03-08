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
     * @example
     * <div>
     * <code>
     * let mic, amp;
     * let micStarted = false;
     *
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   cnv.mousePressed(toggleMic);
     *   mic = new p5.AudioIn();
     *   amp = new p5.Amplitude();
     *   mic.connect(amp);
     *   textAlign(CENTER);
     *   textSize(10);
     *   describe('Click to toggle microphone on and off. Background turns red with louder sound.');
     * }
     *
     * function toggleMic() {
     *   if (!micStarted) {
     *     mic.start();
     *     micStarted = true;
     *   } else {
     *     mic.stop();
     *     micStarted = false;
     *   }
     * }
     *
     * function draw() {
     *   let level = amp.getLevel();
     *   let r = map(level, 0, 0.2, 0, 255);
     *   background(r, 0, 0);
     *   fill(255);
     *   text(micStarted ? 'click to stop' : 'click to start', width/2, height/2);
     * }
     * </code>
     * </div>
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
     * @example
     * <div>
     * <code>
     * let mic, amp;
     * let micStarted = false;
     *
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   cnv.mousePressed(toggleMic);
     *   mic = new p5.AudioIn();
     *   amp = new p5.Amplitude();
     *   mic.connect(amp);
     *   textAlign(CENTER);
     *   textSize(10);
     *   describe('Click to toggle microphone on and off. Background turns red with louder sound.');
     * }
     *
     * function toggleMic() {
     *   if (!micStarted) {
     *     mic.start();
     *     micStarted = true;
     *   } else {
     *     mic.stop();
     *     micStarted = false;
     *   }
     * }
     *
     * function draw() {
     *   let level = amp.getLevel();
     *   let r = map(level, 0, 0.2, 0, 255);
     *   background(r, 0, 0);
     *   fill(255);
     *   text(micStarted ? 'click to stop' : 'click to start', width/2, height/2);
     * }
     * </code>
     * </div>
     */
    stop() {
        this.node.close();
    }
}

export default AudioIn;