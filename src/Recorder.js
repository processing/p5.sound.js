import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { Recorder as ToneRecorder } from "tone/build/esm/component/channel/Recorder.js";

/**
 * A Recorder effect to capture audio input and save as a file.
 * @class Recorder
 * @constructor
 * @example
* <div>
 * <code>
 * let osc, recorder;
 * let recording = false;
 * let recordStartTime = 0;
 * let recordDuration = 3000; // in ms
 * 
 * function setup() {
 *   let cnv = createCanvas(200, 100);
 *   textAlign(CENTER, CENTER);
 *   textSize(16);
 * 
 *   osc = new p5.Oscillator('sine');
 *   osc.amp(0.5);
 * 
 *   recorder = new p5.Recorder();
 *   osc.connect(recorder);
 * 
 *   cnv.mousePressed(startRecording);
 *   describe('Click to record a 3-second sine wave and download it.');
 * }
 * 
 * async function startRecording() {
 *   if (recording) return;
 *   recording = true;
 *   recordStartTime = millis();
 * 
 *   recorder.start();
 *   osc.start();
 * 
 *   setTimeout(async () => {
 *     let audioBlob = await recorder.stop();
 *     recorder.download(audioBlob, 'recording.webm');
 *     osc.stop();
 *     recording = false;
 *   }, recordDuration);
 * }
 * 
 * function draw() {
 *   background(220);
 * 
 *   if (recording) {
 *     let remaining = Math.ceil((recordDuration - (millis() - recordStartTime)) / 1000);
 *     remaining = max(0, remaining);
 *     text(`Recording: ${remaining}`, width / 2, height / 2);
 *   } else {
 *     text('Click to record', width / 2, height / 2);
 *   }
 * }
 * </code>
 * </div>
 */
class Recorder {
  constructor(mimeType = 'audio/webm'){
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      throw new Error(`MIME type "${mimeType}" is not supported by this browser.`);
    }
    this.recorder = new ToneRecorder({mimeType});
  }

  /**
   * Start recording audio.
   * @method start
   */
  start() {
    this.recorder.start();
  }

  /**
   * Stop recording and return the audio Blob.
   * @method stop
   * @return {Promise<Blob>} A Promise that resolves to the recorded audio Blob.
   */
  async stop() {
    return await this.recorder.stop();
  }

  /**
   * Download the recorded audio as a file.
   * @method download
   * @param {Blob} recording The recorded audio Blob.
   * @param {String} filename The name of the downloaded file.
   */
  download(recording, filename = "recording.webm") {
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
  }

  /**
   * Get the underlying node for connecting inputs.
   * @method getNode
   * @return {Object} The recorder node.
   */
  getNode() {
    return this.recorder;
  }

  /**
   * Connect an input source to the recorder.
   * @method connect
   * @param {Object} source A p5.sound source (Oscillator, Soundfile, etc.).
   */
  connect(source) {
    if (typeof source.getNode === "function") {
      source.getNode().connect(this.recorder);
    } else {
      source.connect(this.recorder);
    }
  }

  disconnect() {
    this.recorder.disconnect(ToneContext.destination);
  }
}

export default Recorder;
