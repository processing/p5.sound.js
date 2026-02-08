/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { UserMedia as ToneUserMedia} from "tone/build/esm/source/UserMedia.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";
import { p5soundSource } from "../core/p5soundSource.js";
/**
 * Get sound from your computer's audio input source.
 * 
 * This is usually your onboard microphone, but you can change this in your computer's audio settings. Take caution when activating the microphone as you may create LOUD feedback. Your web browser will ask for your permission when starting the microphone.
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
     * let mic, delay, filter;
     * 
     * function setup() {
     *   describe('a sketch that accesses the user\'s microphone and connects it to a delay line and filter.')
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
     * }
     * 
     *  function startMic() {
     *    mic.start();
     *  }
     *
     *  function draw() {
     *    d = map(mouseX, 0, width, 0.1, 0.5);
     *    delay.delayTime(d);
     *  }
     *</code>
     *</div>
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