import { P5SoundBiquad } from "./P5SoundBiquad.js";

/**
 * Creates a Bandpass P5SoundBiquad filter.
 * @class P5SoundBandPass
 * @constructor
 * @extends P5SoundBiquad
 * @param {Number} [freq] Set the cutoff frequency of the filter
 */
export class P5SoundBandPass extends P5SoundBiquad
{
	constructor(frequency)
	{
		super(frequency, "bandpass");
	}

	isP5SoundBandPass = true;
}