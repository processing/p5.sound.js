import { P5SoundNode } from "./P5SoundNode.js";
import { P5SoundSourceNode } from "./P5SoundSourceNode";

export class P5SoundStartableSourceNode extends P5SoundSourceNode
{
	constructor()
	{
		super();
	}

	isP5SoundStartableSource = true;

	configureStartableNode(startableNode)
	{
		this._startableNode = startableNode;
	}

	/**
	 * Starts the startable node.
	 * @method start
	 * @for P5SoundStartableSourceNode
	 */
	start()
	{
		this._startableNode.start();
	}

	/**
	 * Stops the startable node.
	 * @method stop
	 * @for P5SoundStartableSourceNode
	 */
	stop()
	{
		this._startableNode.stop();
	}
}