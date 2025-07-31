import { P5SoundOscillator } from "./P5SoundOscillator.js";

/**
 * Creates a triangle oscillator.
 * @class P5SoundTriOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundTriOsc extends P5SoundOscillator
{
	constructor(frequency)
	{
		super(frequency);

		this.type = "triangle"
	}

	isP5SoundTriOsc = true;
}