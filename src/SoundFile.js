import * as Tone from "tone";

function loadSound (url) {
  let player;
  const buffer = new Tone.ToneAudioBuffer(url, () => {
    console.log('buffer loaded');
  });
  player = new SoundFile(buffer, console.log('buffer loaded'));
  self._decrementPreload();
  return player;
}

class SoundFile {
  constructor(buffer) {
    this.soundfile = new Tone.Player(buffer).toDestination();
    this.soundfile.volume.value = -10;
  }

  connect(destination) {
    this.soundfile.connect(Object.values(destination)[0].input);
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