import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { P5SoundNode } from "./P5SoundNode.js";

export class P5SoundAnalyzerNode extends P5SoundNode
{
	constructor()
	{
		super();

		this._analyzerInputNode = new ToneGain(1);
	}

	isP5SoundAnalyzer = true;

	get input() { return this._analyzerInputNode; };

	// TODO: ? get value() { return whatever data type the given analyzer provides } ?
	configureInput(input)
	{
		this.connectInputTo(input);
	}

	connectInputTo(audioNode)
	{
		if(audioNode.isP5SoundAnalyzer)
		{
			this._analyzerInputNode.connect(audioNode.input);
		}
		else
		{
			this._analyzerInputNode.connect(audioNode);
		}
	}
}
