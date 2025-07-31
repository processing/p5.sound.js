import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { P5SoundNode } from "./P5SoundNode.js";

export class P5SoundAnalyzerNode extends P5SoundNode
{
	constructor()
	{
		super();

		this._inputNode = new ToneGain(1);
	}

	isP5SoundAnalyzer = true;

	get input() { return this._inputNode; };

	configureInput(input)
	{
		this.connectInputTo(input);
	}

	connectInputTo(audioNode)
	{
		if(audioNode.isP5SoundAnalyzer)
		{
			this._inputNode.connect(audioNode.input);
		}
		else
		{
			this._inputNode.connect(audioNode);
		}
	}
}
