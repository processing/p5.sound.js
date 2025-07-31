import { P5SoundError } from "./utilities/P5SoundError.js"

export class P5SoundObject
{
	constructor() {}

	get error() { return P5SoundError; }

	isP5SoundObject = true;
}
