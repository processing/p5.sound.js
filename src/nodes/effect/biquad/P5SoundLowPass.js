import { P5SoundBiquad } from "./P5SoundBiquad.js";

/**
 * Creates a Lowpass P5SoundBiquad filter.
 * @class P5SoundLowPass
 * @constructor
 * @extends P5SoundBiquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 */
export class P5SoundLowPass extends P5SoundBiquad
{
	constructor(frequency)
	{
		super(frequency, "lowpass");
	}

	isP5SoundLowPass = true;
}