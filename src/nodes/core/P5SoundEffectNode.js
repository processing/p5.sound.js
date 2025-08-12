import { Gain as ToneGain } from "tone/build/esm/core/context/Gain.js";
import { P5SoundNode } from "./P5SoundNode.js";

export class P5SoundEffectNode extends P5SoundNode
{
	constructor()
	{
		super();

		this._effectInputNode = new ToneGain(1);
	}

	isP5SoundEffect = true;

	get input() { return this._effectInputNode; };

	configureInput(input)
	{
		this.connectInputTo(input);
	}

	connectInputTo(audioNode)
	{
		if(audioNode.isP5SoundEffect)
		{
			this._effectInputNode.connect(audioNode.input);
		}
		else
		{
			this._effectInputNode.connect(audioNode);
		}
	}
}
