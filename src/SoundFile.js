import * as Tone from "tone";

function loadSound (path) {
  let player = new SoundFile(
    path,
    function () { 
      self._decrementPreload();
    }
  );
  return player;
}

class SoundFile {
  constructor(buffer, callback) {
    this.soundfile = new Tone.Player(buffer, callback).toDestination();
    this.soundfile.volume.value = 0;
  }

  getNode() {
    return this.soundfile;
  }

  connect(destination) {
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