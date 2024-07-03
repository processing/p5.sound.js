import * as Tone from "tone";

/**
 * Get sound from an input source, typically a computer microphone.
 * @class AudioIn
 * @constructor
 * @example
 * <div>
 * let mic, delay;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(startMic);
 *   background(220);
 *   mic = new AudioIn();
 *   mic.disonnect();
 *   mic.connect()
 *   textSize(10);
 *   textAlighn(CENTER);
 *   textWrap(WORD);
 *   text('watch out for feedback', 20);
 * }
 * 
 * function startMic() {
 *   mic.start();
 * }
 *   
 *   
 * <code>
 * </code>
 * </div>
 */
class AudioIn {
    constructor() {
        this.audioIn = new Tone.UserMedia().toDestination();
    }
    /**
     * Start the audio input.
     * @method start
     */
    start() {
        Tone.start();
        this.audioIn.open().then(() => {
            // promise resolves when input is available
            console.log("mic open");
            // print the incoming mic levels in decibels
        }).catch(e => {
            // promise is rejected when the user doesn't have or allow mic access
            console.log("mic not open");
        });
    }
    /**
     * Stop the audio input.
     * @method stop
     * @for AudioIn
     */
    stop() {
        this.audioIn.close();
    }
    
    getNode() {
        return this.audioIn;
      }
    
    connect(destination) {
    this.audioIn.connect(destination.getNode());
    }
    
    disconnect() {
        this.audioIn.disconnect(Tone.Context.destination);
    }
}

export default AudioIn;