import { getAudioContext, setAudioContext, userStartAudio, userStopAudio } from './core/Utils';
p5.prototype.getAudioContext = getAudioContext;
p5.prototype.setAudioContext = setAudioContext;
p5.prototype.userStartAudio = userStartAudio;
p5.prototype.userStopAudio = userStopAudio;

import { p5soundNode } from "./core/p5soundNode";
import { p5soundSource } from "./core/p5soundSource";
import { p5soundMixEffect } from "./core/p5soundMixEffect";
p5.p5soundMixEffect = p5soundMixEffect;
p5.p5soundNode = p5soundNode;
p5.p5soundSource = p5soundSource;
import Oscillator from './sources/Oscillator';
p5.Oscillator = Oscillator;

import {SawOsc, SinOsc, TriOsc, SqrOsc} from './sources/Oscillator';
p5.SawOsc = SawOsc;
p5.SinOsc = SinOsc;
p5.TriOsc = TriOsc;
p5.SqrOsc = SqrOsc;

import Envelope from './effects/Envelope';
p5.Envelope = Envelope;

import Delay from './effects/Delay';
p5.Delay = Delay;

import Reverb from './effects/Reverb';
p5.Reverb = Reverb;

import Biquad from './effects/Biquad';
p5.Biquad = Biquad;

import {LowPass, HighPass, BandPass} from './effects/Biquad';
p5.LowPass = LowPass;
p5.HighPass = HighPass;
p5.BandPass = BandPass;

import PitchShifter from './effects/PitchShifter';
p5.PitchShifter = PitchShifter;

import Gain from './effects/Gain';
p5.Gain = Gain;

import Amplitude from './analysis/Amplitude';
p5.Amplitude = Amplitude;

import FFT from './analysis/FFT';
p5.FFT = FFT;

import Noise from './sources/Noise';
p5.Noise = Noise;

import Panner from './effects/Panner';
p5.Panner = Panner;

import Panner3D from './effects/Panner3D';
p5.Panner3D = Panner3D;

import SoundFile, { loadSound } from './sources/SoundFile';
p5.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;

import AudioIn from './sources/AudioIn';
p5.AudioIn = AudioIn;

//import Recorder from './Recorder';
//p5.prototype.Recorder = Recorder;