import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { P5SoundObject } from "../../P5SoundObject.js";
import { P5SoundParameter } from "../../P5SoundParameter.js";

export class P5SoundNode extends P5SoundObject
{
	constructor()
	{
		super();

		this._output = new ToneGain(1).toDestination();
		this._gain = new P5SoundParameter(this._output.gain);
	}

	isP5SoundNode = true;

	get gain() { return this._gain.parameter; }
	set gain(value) { this._gain.value = value; }

	connect(...audioNodes)
	{
		for (let nodeIndex = 0; nodeIndex < audioNodes.length; nodeIndex++)
		{
			let audioNode = audioNodes[nodeIndex];

			if (audioNode.isP5SoundObject && !audioNode.input && !audioNode.isP5SoundParameter)
			{
				// TODO: Friendly Error
				console.warn
				(
					"P5.Sound:", "ErrType: CONNECTION_ERR", "Invalid Connection."
				)

				return;
			}

			if (audioNode.isP5SoundObject)
			{
				if (audioNode.isP5SoundEffect)
				{
					this._output.connect(audioNode.input);
				}
				else if (audioNode.isP5SoundParameter)
				{
					this._output.constructor(audioNode);
				}
			}

			else
			{
				this._output.connect(audioNode);
			}
		}
	}

	// TODO: deal with disconnect method (separate PR)
	// TODO: Test
	disconnect()
	{
		this._output.disconnect();
	}

	configureOutput(audioNode)
	{
		audioNode.connect(this._output);
	}

	toDestination()
	{
		this._output.toDestination();
	}
}
