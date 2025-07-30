import { getAudioContext, setAudioContext, userStartAudio, userStopAudio } from './Utils';

p5.prototype.getAudioContext = getAudioContext;
p5.prototype.setAudioContext = setAudioContext;
p5.prototype.userStartAudio = userStartAudio;
p5.prototype.userStopAudio = userStopAudio;

import { P5SoundOscillator }  from './nodes/core/source/P5SoundOscillator.js';
p5.Oscillator = P5SoundOscillator;

import { P5SoundSawOsc, P5SoundSinOsc, P5SoundTriOsc, P5SoundSqrOsc } from './nodes/core/source/P5SoundOscillator';
p5.SawOsc = P5SoundSawOsc;
p5.SinOsc = P5SoundSinOsc;
p5.TriOsc = P5SoundTriOsc;
p5.SqrOsc = P5SoundSqrOsc;

import Envelope from './Envelope';
p5.Envelope = Envelope;

import { P5SoundDelay } from './nodes/core/effect/P5SoundDelay.js';
p5.Delay = P5SoundDelay;

import Reverb from './Reverb';
p5.Reverb = Reverb;

import { P5SoundBiquad } from './nodes/core/effect/P5SoundBiquad.js';
p5.Biquad = P5SoundBiquad;

import { P5SoundLowPass, P5SoundHighPass, P5SoundBandPass } from './nodes/core/effect/P5SoundBiquad';
p5.LowPass = P5SoundLowPass;
p5.HighPass = P5SoundHighPass;
p5.BandPass = P5SoundBandPass;

import PitchShifter from './PitchShifter';
p5.PitchShifter = PitchShifter;

import { P5SoundGain } from './nodes/core/effect/P5SoundGain.js';
p5.Gain = P5SoundGain;

import Amplitude from './Amplitude';
p5.Amplitude = Amplitude;

import FFT from './FFT';
p5.FFT = FFT;

import Noise from './Noise';
p5.Noise = Noise;

import { P5SoundPanner } from './nodes/core/effect/P5SoundPanner.js';
p5.Panner = P5SoundPanner;

import Panner3D from './Panner3D';
p5.Panner3D = Panner3D;

import SoundFile, { loadSound } from './SoundFile';
p5.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;

import AudioIn from './AudioIn';
p5.AudioIn = AudioIn;

//import Recorder from './Recorder';
//p5.prototype.Recorder = Recorder;