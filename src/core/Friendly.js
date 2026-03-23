const createDeprecatedClass = (className) => {
    return class {
        constructor(anyArgs) {
            console.warn(`${className} is deprecated in the new p5.sound.js. Try using the equivalent Tone.js class.`)
        }
    };
};

const MonoSynth = createDeprecatedClass('MonoSynth')
const EQ = createDeprecatedClass('EQ')
const Convolver = createDeprecatedClass('Convolver')
const Distortion = createDeprecatedClass('Distortion')
const OnsetDetect = createDeprecatedClass('OnsetDetect')
const Filter = createDeprecatedClass('Filter')
const Effect = createDeprecatedClass('Effect')
const Compressor = createDeprecatedClass('Compressor')
const AudioVoice = createDeprecatedClass('AudioVoice')
const Part = createDeprecatedClass('Part')
const Phrase = createDeprecatedClass('Phrase')
const PolySynth = createDeprecatedClass('PolySynth')
const Pulse = createDeprecatedClass('Pulse')
const Score = createDeprecatedClass('Score')
const SoundLoop = createDeprecatedClass('SoundLoop')

export { MonoSynth, EQ, Convolver, Distortion, OnsetDetect, Filter, Effect, Compressor, AudioVoice, Part, Phrase, PolySynth, Pulse, Score, SoundLoop };