import * as Tone from "tone";

/**
 * Change the pitch of a sound.
 * @class PitchShifter
 * @constructor
 * @example
 * <div>
 * <code>
 * </code>
 * </div>
 */
class PitchShifter {
    constructor(shiftValue = 1) {
        this.pitchshifter = new Tone.PitchShift(shiftValue).toDestination();
    }
    
    /**
     * @method shift
     * @for PitchShifter
     * @param {Number} pitchValue amount of semitones to shift the pitch
     */
    shift (value) {
        if (value !== undefined) {
            this.pitchshifter.pitch = value;
        }
    }

    getNode() {
        return this.pitchshifter;
      }
    
    /**
     * Connects the Pitch Shifter to a destination for processing.
     * @method connect
     * @for PitchShifter
     * @param {Object} unit A p5.sound processor or modulation index.
     */
    connect(destination) {
    this.pitchshifter.connect(destination.getNode());
    }

    /**
     * Disconnects the Pitch Shifter from a destination for processing.
     * @method connect
     * @for PitchShifter
     * @param {Object} unit A p5.sound processor or modulation index.
     */
    disconnect() {
        this.pitchshifter.disconnect(Tone.Context.destination);
    }
}

export default PitchShifter;