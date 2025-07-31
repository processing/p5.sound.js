import { P5SoundBiquad } from "./P5SoundBiquad.js";

/**
 * Creates a Highpass P5SoundBiquad filter.
 * @class P5SoundHighPass
 * @constructor
 * @extends P5SoundBiquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 */
export class P5SoundHighPass extends P5SoundBiquad
{
	constructor(frequency)
	{
		super(frequency, "highpass");
	}

	isP5SoundHighPass = true;
}