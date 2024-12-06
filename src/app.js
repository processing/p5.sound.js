import { getAudioContext, setAudioContext, userStartAudio, userStopAudio } from './Utils';
p5.prototype.getAudioContext = getAudioContext;
p5.prototype.setAudioContext = setAudioContext;
p5.prototype.userStartAudio = userStartAudio;
p5.prototype.userStopAudio = userStopAudio;

import Oscillator from './Oscillator';
p5.Oscillator = Oscillator;

import {SawOsc, SinOsc, TriOsc, SqrOsc} from './Oscillator';
p5.SawOsc = SawOsc;
p5.SinOsc = SinOsc;
p5.TriOsc = TriOsc;
p5.SqrOsc = SqrOsc;

import Envelope from './Envelope';
p5.Envelope = Envelope;

import Delay from './Delay';
p5.Delay = Delay;

import Reverb from './Reverb';
p5.Reverb = Reverb;

import Biquad from './Biquad';
p5.Biquad = Biquad;

import PitchShifter from './PitchShifter';
p5.PitchShifter = PitchShifter;

import Gain from './Gain';
p5.Gain = Gain;

import Amplitude from './Amplitude';
p5.Amplitude = Amplitude;

import FFT from './FFT';
p5.FFT = FFT;

import Noise from './Noise';
p5.Noise = Noise;

import Panner from './Panner';
p5.Panner = Panner;

import Panner3D from './Panner3D';
p5.Panner3D = Panner3D;

p5.prototype.loadSound = loadSound;
p5.prototype.registerPreloadMethod('loadSound', p5.prototype);

import SoundFile, { loadSound } from './SoundFile';
p5.SoundFile = SoundFile;

import AudioIn from './AudioIn';
p5.AudioIn = AudioIn;

//import Recorder from './Recorder';
//p5.prototype.Recorder = Recorder;