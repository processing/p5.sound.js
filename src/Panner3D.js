import * as Tone from "tone";

const clamp = (val, min=-1, max=1) => Math.min(Math.max(val, min), max)

class Panner3D {
  constructor() {
    this.panner3d= new Tone.Panner3D(0, 0, 0).toDestination();
  }

  set(x, y, z) {
    this.panner3d.positionX.value = x;
    this.panner3d.positionY.value = y;
    this.panner3d.positionZ.value = z;
  }

  orient(x, y, z) {
    this.panner3d.orientationX.value = x;
    this.panner3d.orientationY.value = y;
    this.panner3d.orientationZ.value = z;
  }

  setFallof(rolloffFactor, maxDistance) {
    this.panner3d.rolloffFactor = rolloffFactor;
    this.panner3d.maxDistance = maxDistance;
  }

  maxDist(d) {
    this.panner3d.maxDistance = d;
  }

  rolloff(r) {
    this.panner3d.rolloffFactor = r;
  }

  positionX(p) {
    this.panner3d.positionX.rampTo(clamp(p), 0.01);
  }

  positionY(p) {
    this.panner3d.positionY.rampTo(clamp(p), 0.01);
  }

  PositionZ(p) {
    this.panner3d.positionZ.rampTo(clamp(p), 0.01);
  }

  getNode() {
    return this.panner3d;
  }

  connect(destination) {
    this.panner3d.connect(destination.getNode());
  }

  disconnect() {
    this.panner3d.disconnect(Tone.Context.destination);
  }
}

export default Panner3D;