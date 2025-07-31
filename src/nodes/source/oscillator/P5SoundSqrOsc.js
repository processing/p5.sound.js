import { P5SoundOscillator } from "./P5SoundOscillator.js";

/**
 * Creates a square oscillator.
 * @class P5SoundSqrOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundSqrOsc extends P5SoundOscillator
{
	constructor(frequency)
	{
		super(frequency);

		this.type = "square";
	}

	isP5SoundSqrOsc = true;
}