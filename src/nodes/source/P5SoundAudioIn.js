/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { UserMedia as ToneUserMedia} from "tone/build/esm/source/UserMedia.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";
import { P5SoundSourceNode } from "../core/P5SoundSourceNode.js";
/**
 * Get sound from an input source, typically a computer microphone.
 * @class AudioIn
 * @constructor
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
 *   delay = new p5.P5SoundDelay(0.74, 0.1);
 *   filter = new p5.P5SoundBiquad(600, "bandpass");
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
export class P5SoundAudioIn extends P5SoundSourceNode
{
    constructor()
    {
        super();

        this._toneUserMediaNode = new ToneUserMedia();

        this.configureOutput(this._toneUserMediaNode);
    }

    isP5SoundAudioIn = true;

    /**
     * Start the audio input.
     * @method start
     * @for AudioIn
     */
    start()
    {
        ToneStart();

        this._toneUserMediaNode.open().then(() =>
        {
            // promise resolves when input is available
            console.log("mic open");
            // print the incoming mic levels in decibels
        }).catch(e =>
        {
            // promise is rejected when the user doesn't have or allow mic access
            console.log("mic not open");
        });
    }

    /**
     * Stop the audio input.
     * @method stop
     * @for AudioIn
     */
    stop()
    {
        this._toneUserMediaNode.close();
    }
}