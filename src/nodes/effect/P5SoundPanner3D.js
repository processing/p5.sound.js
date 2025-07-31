/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Panner3D as TonePanner3D } from "tone/build/esm/component/channel/Panner3D.js";
import { P5SoundEffectNode } from "../core/P5SoundEffectNode.js";
import { P5SoundParameter } from "../../P5SoundParameter.js";

/**
 * A 3D sound spatializer.
 * @class P5SoundPanner3D
 * @constructor
 * @example
 * <div>
 * <code>
 * let radius = 10 ; 
 * let soundSource, spatializer;
 * let font;
 * let cnv;
 * 
 * let x = 0;
 * let y = 0;
 * let z = 100;
 * 
 * let vX;
 * let vY;
 * let vZ;
 * 
 * function preload() {
 *   soundSource = loadSound('/assets/beat.mp3');
 *   font = loadFont('/assets/SourceSansPro-Regular.otf');
 * }
 * 
 * function setup() {
 *   describe(
 *     'A 3D shape with a sound source attached to it. The sound source is spatialized using the P5SoundPanner3D class. Click to play the sound.'
 *   );
 *   cnv = createCanvas(100, 100, WEBGL);
 *   cnv.mousePressed(playSound);
 * 
 *   camera(0, 0, 0, 0, 0, 1);
 *   
 *   textFont(font);
 *   textAlign(CENTER,CENTER);
 *   
 *   angleMode(DEGREES);
 * 
 *   vX = random(-0.5, 0.5);
 *   vY = random(-0.5, 0.5);
 *   vZ = random(-0.5, 0.5) * 1.5;
 * 
 *   spatializer = new p5.P5SoundPanner3D();
 *   spatializer.maxDist(100);
 *   soundSource.loop();
 *   soundSource.disconnect();
 *   soundSource.connect(spatializer);
 * }
 * 
 * function playSound() {
 *   soundSource.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   push();
 *   textSize(5);
 *   fill(0);
 *   translate(0,0,100);
 *   //text('click to play', 0, 0);
 *   pop();
 *   // Update Box and Sound Source Position
 *   push();
 *   moveSoundBox();
 *   box(5, 5, 5);
 *   pop();
 * }
 * 
 * // Rotate 1 degree per frame along all three axes
 * function moveSoundBox() {
 *   x = x + vX;
 *   y = y + vY;
 *   z = z + vZ;
 * 
 *   if (x > radius || x < -radius) {
 *     vX = -vX;
 *   }
 *   if (y > radius || y < -radius) {
 *     vY = -vY;
 *   }
 *   if (z > 250 || z < 80) {
 *     vZ = -vZ;
 *   }
 *   //set the position of the 3D panner
 *   spatializer.set(x, y, z);
 *   //set the postion of the box
 *   translate(x, y, z);
 *   rotateX(45 + frameCount);
 *   rotateZ(45);
 * }
 * </code>
 * </div>
 */
export class P5SoundPanner3D extends P5SoundEffectNode
{
  constructor()
  {
    super();

    this._tonePanner3DNode = new TonePanner3D
    (
      {
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 1
      }
    );

    this._positionX = new P5SoundParameter(this._tonePanner3DNode.positionX, 0);
    this._positionY = new P5SoundParameter(this._tonePanner3DNode.positionY, 0);
    this._positionZ = new P5SoundParameter(this._tonePanner3DNode.positionZ, 0);

    this.configureInput(this._tonePanner3DNode);
    this.configureOutput(this._tonePanner3DNode);
  }

  isP5SoundPanner3D = true;

  get positionX() { return this._positionX; }
  /**
   * Set the X position of the sound source.
   * @method positionX
   * @for P5SoundPanner3D
   * @param {Number} positionX the x position of the sound source.
   */
  set positionX(positionX) { this._positionX.value = positionX; }

  get positionY() { return this._positionY; }
  /**
   * Set the Y position of the sound source.
   * @method positionY
   * @for P5SoundPanner3D
   * @param {Number} positionY the y position of the sound source.
   */
  set positionY(positionY) { this._positionY.value = positionY; }

  get positionZ() { return this._positionZ; }
  /**
   * Set the Z position of the sound source.
   * @method positionZ
   * @for P5SoundPanner3D
   * @param {Number} positionZ the z position of the sound source.
   */
  set positionZ(positionZ) { this._positionZ.value = positionZ; }

  /**
   * Set the x, y, and z position of the 3D panner.
   * @method setPositionXYZ
   * @for P5SoundPanner3D
   * @param {Number} xPosition the x coordinate of the panner.
   * @param {Number} yPosition the y coordinate of the panner.
   * @param {Number} zPosition the z coordinate of the panner.
   */
  setPositionXYZ(xPosition, yPosition, zPosition)
  {
    this.positionX.rampTo(xPosition, 0.01);
    this.positionY.rampTo(yPosition, 0.01);
    this.positionZ.rampTo(zPosition, 0.01);
  }
  
  /**
   * The rolloff rate of the panner.
   * @method setFalloff
   * @for P5SoundPanner3D
   * @param {Number} rolloffFactor 
   * @param {Number} maxDistance 
   */
  setFalloff(rolloffFactor, maxDistance)
  {
    this._tonePanner3DNode.rolloffFactor = rolloffFactor;
    this._tonePanner3DNode.maxDistance = maxDistance;
  }

  get maxDistance() { return this._tonePanner3DNode.maxDistance; }
  /**
   * Set the maximum distance of the panner.
   * @method maxDist
   * @for P5SoundPanner3D
   * @param {Number} distance the maximum distance that the sound source can be heard from.
   */
  set maxDistance(distance) { this._tonePanner3DNode.maxDistance = distance; }

  get rolloff() { return this._tonePanner3DNode.rolloffFactor; }
  /**
   * Set the rolloff rate of the panner.
   * @method rolloff
   * @for P5SoundPanner3D
   * @param {Number} rolloff the rolloff rate of the panner.
   */
  set rolloff(rolloff) { this._tonePanner3DNode.rolloffFactor = rolloff; }
}
