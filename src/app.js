import { getAudioContext, setAudioContext, userStartAudio, userStopAudio } from './Utils';
p5.prototype.getAudioContext = getAudioContext;
p5.prototype.setAudioContext = setAudioContext;
p5.prototype.userStartAudio = userStartAudio;
p5.prototype.userStopAudio = userStopAudio;

import { p5soundNode } from "./core/p5soundNode";
import { p5soundSource } from "./core/p5soundSource";
import { p5soundEffect } from "./core/p5soundEffect";
p5.p5soundEffect = p5soundEffect;
p5.p5soundNode = p5soundNode;
p5.p5soundSource = p5soundSource;
import Oscillator from './sources/Oscillator';
p5.Oscillator = Oscillator;

import {SawOsc, SinOsc, TriOsc, SqrOsc} from './sources/Oscillator';
p5.SawOsc = SawOsc;
p5.SinOsc = SinOsc;
p5.TriOsc = TriOsc;
p5.SqrOsc = SqrOsc;

import Envelope from './Envelope';
p5.Envelope = Envelope;

import Delay from './effects/Delay';
p5.Delay = Delay;

import Reverb from './Reverb';
p5.Reverb = Reverb;

import Biquad from './Biquad';
p5.Biquad = Biquad;

import {LowPass, HighPass, BandPass} from './Biquad';
p5.LowPass = LowPass;
p5.HighPass = HighPass;
p5.BandPass = BandPass;

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

import SoundFile, { loadSound } from './SoundFile';
p5.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;

import AudioIn from './AudioIn';
p5.AudioIn = AudioIn;

//import Recorder from './Recorder';
//p5.prototype.Recorder = Recorder;