/**
 *  @module Sound
 *  @submodule Sound Context
 *  @for sound
 */

import { getContext as ToneGetContext, setContext as ToneSetContext } from "tone/build/esm/core/Global.js";
import { start as ToneStart } from "tone/build/esm/core/Global.js";

export const P5SoundContext =
{
	/**
	 *  Get the window's audio context.
	 *  @function getAudioContext
	 *  @return {AudioContext} the audio context
	 */
	getAudioContext()
	{
		// Check if the AudioContext is already created
		if (ToneGetContext())
		{
			return ToneGetContext().rawContext;
		}
		const audiocontext = new window.AudioContext();
		ToneSetContext(audiocontext);
		let context = ToneGetContext();
		return context._context;
	},

	/**
	 *  Sets the AudioContext to a specified context to enable cross library compatibility.
	 *  @function setAudioContext
	 *  @param {AudioContext} the desired AudioContext.
	 */
	setAudioContext(context)
	{
		ToneSetContext(context);
	},

	/**
	 *  userStartAudio() starts the AudioContext on a user gesture. It can be placed in a specific interaction function, such as mousePressed().
	 *  @function userStartAudio
	 */
	userStartAudio()
	{
		ToneStart();
	},

	/**
	 *  userStopAudio() stops the AudioContext on a user gesture.
	 *  @function userStopAudio
	 */
	userStopAudio()
	{
		context = ToneGetContext();
		context.suspend();
	}
}
