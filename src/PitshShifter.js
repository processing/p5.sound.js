import * as Tone from "tone";

/**
 * Change the pitch of a sound.
 * @class PitchShifter
 * @constructor
 * @example
 * <div>
 * <code>
 * let soundFile, pitchShifter;
 * 
 * function preload() {
 *   soundFile = loadSound('assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   createCanvas(100, 100);
 *   frameRate(1);
 *   pitchShifter = new PitchShifter();
 *   soundFile.disconnect();
 *   soundFile.connect(pitchShifter);
 *   soundFile.loop();
 *   soundFile.play();  
 * }
 * 
 * function draw() {
 *   background(220);
 *   let pitchValue = random(-12, 12);
 *   pitchShifter.shift(pitchValue);
 * }
 * </code>
 * </div>
 */
class PitchShifter {
    constructor(shiftValue = 1) {
        this.pitchshifter = new Tone.PitchShift(shiftValue).toDestination();
    }
    
    /**
     * Shift the pitch of the source audio.
     * @method shift
     * @for PitchShifter
     * @param {Number} pitchValue amount of semitones to shift the pitch
     */
    shift (value) {
        if (value !== undefined) {
            this.pitchshifter.pitch = value;
        }
    }
    
    connect(destination) {
    this.pitchshifter.connect(destination.getNode());
    }

    disconnect() {
        this.pitchshifter.disconnect(Tone.Context.destination);
    }

    getNode() {
        return this.pitchshifter;
    }
}

export default PitchShifter;