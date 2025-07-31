export const P5SoundError =
{
	friendlyError(errorContent)
	{
		p5._friendlyError("P5SoundError: " + errorContent);
	},

	attemptConnectToNoInput(fromNode, toNode)
	{
		let fromNodeType = fromNode.constructor.name;
		let toNodeType = toNode.constructor.name;

		this.friendlyError
		(
			`[${fromNodeType}] attempted to connect to [${toNodeType}], but [${toNodeType}] does not have an input.`
		);
	}
}