import * as Tone from "tone";
import { clamp } from "./Utils";

/**
 * A 3D sound spatializer.
 * @class Panner3D
 * @constructor
 * @example
 * <div>
 * <code>
 * </code>
 * </div>
 */
class Panner3D {
  constructor() {
    this.panner3d= new Tone.Panner3D({
      coneInnerAngle:360,
      coneOuterAngle:360,
      coneOuterGain:1,
      positionX:0,
      positionY:0,
      positionZ:0,
    }).toDestination();
  }

  /**
   * Connects an input source to the 3D panner.
   * @method process
   * @for Panner3D
   * @param {Object} input an input source to process with the 3D panner.
   */
  process(input) {
    input.getNode().connect(this.panner3d);
  }

  /**
   * Set the x, y, and z position of the 3D panner.
   * @method set
   * @for Panner3D
   * @param {Number} xPosition the x coordinate of the panner.
   * @param {Number} yPosition the y coordinate of the panner.
   * @param {Number} zPosition the z coordinate of the panner.
   */
  set(x, y, z) {
    this.panner3d.positionX.value = x;
    this.panner3d.positionY.value = y;
    this.panner3d.positionZ.value = z;
  }

  setFalloff(rolloffFactor, maxDistance) {
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
    this.panner3d.positionX.rampTo(clamp(p, -1, 1), 0.01);
  }

  positionY(p) {
    this.panner3d.positionY.rampTo(clamp(p, -1, 1), 0.01);
  }

  PositionZ(p) {
    this.panner3d.positionZ.rampTo(clamp(p), 0.01);
  }

  connect(destination) {
    this.panner3d.connect(destination.getNode());
  }

  disconnect() {
    this.panner3d.disconnect(Tone.Context.destination);
  }

  getNode() {
    return this.panner3d;
  }
}

export default Panner3D;