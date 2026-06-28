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
 * let cnv, pitchShifter;
 *  
 * async function setup() {
 *   describe('a sketch that pitches the microphone input up an octave');
 *   createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   textSize(9);
 *   textWrap(WORD)
 *   text('click to play sound', width/2, height/2);
 *   mic = new p5.AudioIn();
 *   pitchShifter = new p5.PitchShifter(12);
 *   mic.disconnect();
 *   mic.connect(pitchShifter);
 * }
 * 
 * function mousePressed () {
 *   mic.start();
 * }
 * </code>
 * </div>
 */
class PitchShifter extends p5soundNode {
    constructor(shiftValue = 1) {
        super();
        this.node = new TonePitchShift(shiftValue)
        const toneInput  = this.node.input.input ?? this.node.input;
        const toneOutput = this.node.output.output ?? this.node.output;
        this.input.connect(toneInput);
        toneOutput.connect(this.output);
    }

    /**
     * Shift the pitch of the source audio.
     * @method shift
     * @for PitchShifter
     * @param {Number} pitchValue amount of semitones to shift the pitch
     * @example
     * <div>
     * <code>
     * let cnv, pitchShifter;
     *
     * async function setup() {
     *   describe('a sketch that pitches the microphone input up an octave');
     *   createCanvas(100, 100);
     *   background(220);
     *   textAlign(CENTER);
     *   textSize(9);
     *   textWrap(WORD)
     *   text('click to play sound', width/2, height/2);
     *   mic = new p5.AudioIn();
     *   pitchShifter = new p5.PitchShifter(12);
     *   mic.disconnect();
     *   mic.connect(pitchShifter);
     * }
     * 
     * function mousePressed () {
     *   mic.start();
     *   //shift the input audio up a random number of semitones
     *   pitchShifter.shift(round(random(1, 12)));
     * }
     * </code>
     * </div>
     */
    shift (value) {
        if (value !== undefined) {
            this.node.pitch = value;
        }
    }
}

export default PitchShifter;
