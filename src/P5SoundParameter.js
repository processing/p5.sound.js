import { P5SoundObject } from "./P5SoundObject.js";

export class P5SoundParameter extends P5SoundObject
{
	constructor(audioParameter = null, value = null)
	{
		super();

		if (audioParameter !== null)
		{
			this._audioParameter = audioParameter;

			if (value !== null)
			{
				this._audioParameter.value = value;
			}
		}
	}

	isP5SoundParameter = true;

	get parameter()
	{
		return this._audioParameter;
	}

	set parameter(audioParameter)
	{
		this._audioParameter = audioParameter;
	}

	get value()
	{
		return this.parameter.value;
	}

	set value(value)
	{
		this.parameter.value = value;
	}

	rampTo(value, time)
	{
		this.parameter.rampTo(value, time);
	}
}