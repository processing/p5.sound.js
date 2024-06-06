This repo is an attempt at revising the p5.js sound library to the specifications laid out by p5.js 2023 Sound Fellow aarón montoya-moraga (with some additions by myself). A detailed description of this new direction including a list of new and deprecated classes is documented by aarón [here](https://github.com/processing/p5.sound.js). 

The biggest deviation this approach makes with the original p5.sound library is its implementation of the web audio api through the use of Tone.js as a node module import. After some conversations with Yotam Mann (creator of Tone.js), Jason Sigal (original author of p5.sound), and aarón, I opted for an approach that would make maintaining the code base for p5 sound easier for future maintainers while simulataneously honoring Tone.js as the original and ongoing foundation of p5.sound.

p5.sound will now act as a thin wrapper for Tone.js, or glue code, that will provide an interface for the library in a format familiar to users of p5.js and the original p5.sound library. p5.sound shouldn't reinvent the wheel - Tone.js has been developed with musicality and creativity in mind - so let's import it and make it even more accessible and compatible with p5.js. Additionally, the new p5.sound will focus on raw sound and audio generation and deprecate some functionality with regard to pre-fabricated synthesis models (p5.MonoSynth and p5.PolySynth), and for now, systems of composition p5.Phrase p5.part, and p5.score.

There are a few other deprecations and additions as well as recommended usages but that will be documented in more detail later.

For now the classes provided in this initial push include the Amplitude meter, Oscillator, Noise Source, Soundfile Player, as well as Biquad Filter, Panner, Reverb and Delay effects. 

Below is a proposed timeline with an MVP of the project slated for mid June. 

Proposed Timeline:

June 7th - 
Add Analyser FFT
Gain
Envelope
Audio Input

Finish all methods related to existing classes

June 14th - 
Examples for Reference Pages for each class done

June 21st - 
Pre-release candidate and integration with p5 website done

to build library
```
npm run build
```

