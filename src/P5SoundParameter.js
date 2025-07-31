import { P5SoundObject } from "./P5SoundObject.js";

export class P5SoundParameter extends P5SoundObject
{
	constructor(audioParameter = null, value = null)
	{
		super();

		if (audioParameter !== null)
		{
			this._parameter = audioParameter;

			if (value !== null)
			{
				this._parameter.value = value;
			}
		}
	}

	isP5SoundParameter = true;

	get parameter()
	{
		return this._parameter;
	}

	set parameter(audioParameter)
	{
		this._parameter = audioParameter;
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