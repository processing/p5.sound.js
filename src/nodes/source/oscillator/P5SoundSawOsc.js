import { P5SoundOscillator } from "./P5SoundOscillator.js";

/**
 * Creates a sawtooth oscillator.
 * @class P5SoundSawOsc
 * @constructor
 * @extends P5SoundOscillator
 * @param {Number} [freq] Set the frequency
 */
export class P5SoundSawOsc extends P5SoundOscillator
{
	constructor(frequency)
	{
		super(frequency);

		this.type = "sawtooth";
	}

	isP5SoundSawOsc = true;
}