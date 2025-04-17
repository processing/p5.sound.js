/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { PitchShift as TonePitchShift } from "tone/build/esm/effect/PitchShift.js";
import { P5SoundMixEffectNode } from "../core/P5SoundMixEffectNode.js";

/**
 * Change the pitch of a sound.
 * @class P5SoundPitchShifter
 * @constructor
 * @example
 * <div>
 * <code>
 *  let cnv, soundFile, pitchShifter;
 *  
 * function preload() {
 *   soundFile = loadSound('/assets/beatbox.mp3');
 * }
 *  
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(startSound);
 *   background(220);
 *   textAlign(CENTER);
 *   textSize(9);
 *   text('click to play sound', width/2, height/2);
 *   pitchShifter = new p5.P5SoundPitchShifter();
 *   
 *   soundFile.disconnect();
 *   soundFile.connect(pitchShifter);
 *   //change the pitch and retrigger sample when done playing
 *   soundFile.onended(changePitch);
 * }
 * 
 * function startSound () {
 *   soundFile.play();
 * }
 *  
 * function changePitch () {
 *   let pitchValue = random(-12, 12);
 *   pitchShifter.shift(pitchValue);
 *   soundFile.play();
 * }
 * </code>
 * </div>
 */
export class P5SoundPitchShifter extends P5SoundMixEffectNode
{
    constructor(shiftValue = 1)
    {
        super();

        this._tonePitchShifterNode = new TonePitchShift(shiftValue);

        this.configureMixIO(this._tonePitchShifterNode, this._tonePitchShifterNode);
    }

    isP5SoundPitchShifter = true;

    get shift() { return this._tonePitchShifterNode.pitch.value; }

    /**
     * Shift the pitch of the source audio.
     * @method shift
     * @for P5SoundPitchShifter
     * @param {Number} pitchValue amount of semitones to shift the pitch
     */
    set shift(pitchValue) { this._tonePitchShifterNode.pitch.value = value;}
}
