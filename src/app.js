import { P5SoundContext } from "./P5SoundContext.js";

p5.prototype.getAudioContext = P5SoundContext.getAudioContext;
p5.prototype.setAudioContext = P5SoundContext.setAudioContext;
p5.prototype.userStartAudio = P5SoundContext.userStartAudio;
p5.prototype.userStopAudio = P5SoundContext.userStopAudio;

import { P5SoundOscillator }  from './nodes/source/oscillator/P5SoundOscillator.js';
p5.Oscillator = P5SoundOscillator;

import { P5SoundSawOsc } from './nodes/source/oscillator/P5SoundSawOsc.js';
import { P5SoundSinOsc } from './nodes/source/oscillator/P5SoundSinOsc.js';
import { P5SoundTriOsc } from './nodes/source/oscillator/P5SoundTriOsc.js';
import { P5SoundSqrOsc } from './nodes/source/oscillator/P5SoundSqrOsc.js';

p5.SawOsc = P5SoundSawOsc;
p5.SinOsc = P5SoundSinOsc;
p5.TriOsc = P5SoundTriOsc;
p5.SqrOsc = P5SoundSqrOsc;

import { P5SoundEnvelope } from './nodes/effect/P5SoundEnvelope.js';
p5.Envelope = P5SoundEnvelope;

import { P5SoundDelay } from './nodes/effect/P5SoundDelay.js';
p5.Delay = P5SoundDelay;

import { P5SoundReverb } from './nodes/effect/P5SoundReverb.js';
p5.Reverb = P5SoundReverb;

import { P5SoundBiquad } from './nodes/effect/biquad/P5SoundBiquad.js';
p5.Biquad = P5SoundBiquad;

import { P5SoundLowPass } from './nodes/effect/biquad/P5SoundLowPass.js';
import { P5SoundHighPass } from './nodes/effect/biquad/P5SoundHighPass.js';
import { P5SoundBandPass } from './nodes/effect/biquad/P5SoundBandPass.js';

p5.LowPass = P5SoundLowPass;
p5.HighPass = P5SoundHighPass;
p5.BandPass = P5SoundBandPass;

import { P5SoundPitchShifter } from './nodes/effect/P5SoundPitchShifter.js';
p5.PitchShifter = P5SoundPitchShifter;

import { P5SoundGain } from './nodes/effect/P5SoundGain.js';
p5.Gain = P5SoundGain;

import { P5SoundAmplitude } from './nodes/analysis/P5SoundAmplitude.js';
p5.Amplitude = P5SoundAmplitude;

import { P5SoundFFT } from './nodes/analysis/P5SoundFFT.js';
p5.FFT = P5SoundFFT;

import { P5SoundNoise } from './nodes/source/P5SoundNoise.js';
p5.Noise = P5SoundNoise;

import { P5SoundPanner } from './nodes/effect/P5SoundPanner.js';
p5.Panner = P5SoundPanner;

import { P5SoundPanner3D } from './nodes/effect/P5SoundPanner3D';
p5.Panner3D = P5SoundPanner3D;

import { P5SoundFile, loadSound } from './nodes/source/P5SoundFile.js';
p5.SoundFile = P5SoundFile;
p5.prototype.loadSound = loadSound;

import { P5SoundAudioIn } from './nodes/source/P5SoundAudioIn.js';
p5.AudioIn = P5SoundAudioIn;

p5.AudioOutput = new p5.Gain();
p5.AudioOutput.toDestination();

//import Recorder from './Recorder';
//p5.prototype.Recorder = Recorder;