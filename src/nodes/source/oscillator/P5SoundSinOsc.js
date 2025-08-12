import { P5SoundOscillator } from "./P5SoundOscillator.js";

/**
 * Creates a sine oscillator.
 * @class P5SoundSinOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundSinOsc extends P5SoundOscillator
{
	constructor(frequency)
	{
		super(frequency);

		this.type = "sine"
	}

	isP5SoundSinOsc = true;
}
