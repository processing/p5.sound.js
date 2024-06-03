import * as Tone from "tone";

class AudioIn {
    constructor() {
        this.audioIn = new Tone.UserMedia().toDestination();
    }
    
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