# p5.sound.js

This repository is a work in progress for the 2023 p5.js sound fellowship. Please read the [announcement](https://medium.com/@ProcessingOrg/announcing-the-2023-p5-sound-fellow-aar%C3%B3n-montoya-moraga-7613450902f6) for more details.

This repository will soon replace the previous version of the p5.sound library, which is currently hosted at [https://github.com/processing/p5.js-sound](https://github.com/processing/p5.js-sound).

p5.sound Fellow 2023: aarón montoya-moraga(@[montoyamoraga](https://github.com/montoyamoraga)),
p5.Sound Fellow Mentor 2023: Kristin Galvin (@[blechdom](https://github.com/blechdom))

## Scope of the project

This project is an update of the p5.sound.js library, with the following goals:

- Code stability and readability
- Updated and fewer dependencies

## Usage

To use this library, make sure you have p5.js installed. Visit the [p5.js website](https://p5js.org/) for more information and installation instructions.


## Testing with examples

We are currently hosting `examples`  on this collection [https://editor.p5js.org/montoyamoraga/collections/xydp5uPw0](https://editor.p5js.org/montoyamoraga/collections/xydp5uPw0).

Please let us know if you find any bugs or issues!

## Comparison with the previous version of the library

Highlight the ones on this version, group them in categories, add dependencies, and include at the end the deprecated ones.

## Base classes

| Name         | Previous name | Dependencies | Tone.js dependencies | Status |
| :----------- | :------------ | :----------- | :------------------- | :----- |
| audioContext | Same          | none         | none                 | works! |

## Oscillators

| Name       | Previous name | Dependencies | Tone.js dependencies | Status |
| :--------- | :------------ | :----------- | :------------------- | :----- |
| Oscillator | Same          | audioContext | Add, Multiply, Scale | works! |
| SinOsc     | Same          | Oscillator   |                      | works! |
| TriOsc     | Same          | Oscillator   |                      | works! |
| SawOsc     | Same          | Oscillator   |                      | works! |
| Noise      | Same          | Oscillator   |                      | works! |

## Analysis

| Name of class | Previous name | Dependencies | Tone.js dependencies | Status |
| :------------ | :------------ | :----------- | :------------------- | :----- |
| AnalyzerFFT   | FFT           | audioContext | none                 | works! |

## Deprecations

| Name of class  | Reason of deprecation       |
| :------------- | :-------------------------- |
| Convolver      | TODO                        |
| MonoSynth      | Out of scope of p5.sound.js |
| Polysynth      | Out of scope of p5.sound.js |
| Part           | Out of scope of p5.sound.js |
| Phrase         | Out of scope of p5.sound.js |
| Score          | Out of scope of p5.sound.js |
| SoundLoop      | TODO                        |
| userStartAudio | TODO                        |

## Dependencies

After a fruitful discussion with the Tone.js team, we keeping Tone.js as a dependency and updating this to the latest version 14.x.x.

## New contributors

If you find any issue please file one, explaining as much as possible the problem you are facing and the context (browser, operating system, etc).

If you know how to fix it, please make a pull request, tag the corresponding issue, and we will review it.

## Build instructions

To install the dependencies for building, please run this command.

```bash
npm ci
```

To build the library, please run this command.

```bash
npm run build
```
