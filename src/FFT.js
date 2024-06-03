import * as Tone from "tone";

class FFT {
    constructor(fftSize) {
        if (fftSize === undefined) {
            fftSize = 32;
        }
        this.fftSize = fftSize;
        this.analyzer = new Tone.FFT({
            size: fftSize,
            normalRange: true,
        });
    }
    
    analyze() {
        return this.analyzer.getValue();
    }
}

export default FFT;