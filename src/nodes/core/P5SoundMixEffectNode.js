import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { P5SoundParameter } from "../../P5SoundParameter.js";
import { P5SoundEffectNode } from "./P5SoundEffectNode.js";

export class P5SoundMixEffectNode extends P5SoundEffectNode
{
	constructor(wetMix = 1)
	{
		super();

		this._mixEffectInputNode = new ToneGain(1);
		this._mixEffectOutputNode = new ToneGain(1);

		this._dryGainNode = new ToneGain();
		this._wetGainNode = new ToneGain();

		this._dryGain = new P5SoundParameter(this._dryGainNode.gain, 0);
		this._wetGain = new P5SoundParameter(this._wetGainNode.gain, 1);

		this.wetMix = wetMix;

		this._mixEffectInputNode.connect(this._dryGainNode);
		this._dryGainNode.connect(this._mixEffectOutputNode);

		this._wetGainNode.connect(this._mixEffectOutputNode);

		this.configureInput(this._mixEffectInputNode);
		this.configureOutput(this._mixEffectOutputNode);
	}

	isP5SoundMixEffect = true;

	get dryGain() { return this._dryGain; }
	set dryGain(value) { this._dryGain.value = value; }

	get wetGain() { return this._wetGain; }
	set wetGain(value) { this._wetGain.value = value; }

	get wetMix() { return this._wetMix; }
	set wetMix(value)
	{
		this._wetMix = value;

		this.dryGain = 1 - this._wetMix;
		this.wetGain = this._wetMix;
	}

	configureWetIO(input, output)
	{
		this._mixEffectInputNode.connect(input);

		if(output.isP5SoundNode)
		{
			output.connect(this._wetGainNode);
		}
		else
		{
			output.connect(this._wetGainNode);
		}
	}
}
