import * as Tone from "tone";

function loadSound (url) {
  
  const encoded =  encodeURI(url);
  //encoded = encodeURI(encoded);
  console.log(encoded);
  const buffer = new Tone.ToneAudioBuffer(encoded, () => {
    console.log('this buffer was loaded ' + encoded);
  });
  const player = new SoundFile(buffer, console.log('none'));
  self._decrementPreload();
  return player;
}

/*
function loadSound (url) {
  let player;
  const buffer = new Tone.ToneAudioBuffer(url, () => {
    console.log('buffer loaded');
    player = new SoundFile(buffer, () => {
      self._decrementPreload();
    });
  });
  return player;
}
*/

class SoundFile {
  constructor(buffer) {
    this.soundfile = new Tone.Player(buffer).toDestination();
    this.soundfile.volume.value = -10;
  }

  getNode() {
    return this.soundfile;
  }

  connect(destination) {
    console.log(destination.getNode());
    this.soundfile.connect(destination.getNode());
  }

  disconnect() {
    this.soundfile.disconnect(Tone.Context.destination);
  }

  start() {
    this.soundfile.start();
  }

  play() {
    this.soundfile.start();
  }

  stop() {
    this.soundfile.stop();
  }
}

export default SoundFile;
export { loadSound };