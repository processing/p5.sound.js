// // Sound samples from Damscray - "Dancing Tiger",
// // Creative Commons BY-NC-SA

// function preload() {
//   soundFormats('ogg', 'mp3');
//   soundFile = loadSound('../_files/Damscray_01');
// }

// function setup() {
//   createCanvas(400, 200);

//   text('File is ready!  Click to pause / play.', 50, 10);

//   soundFile.rate(0.8);
//   soundFile.reverseBuffer();
//   soundFile.loop();

//   peaks = soundFile.getPeaks();
//   beginShape();
//   for (i = 0; i < peaks.length; i++) {
//     vertex(map(i, 0, peaks.length, 0, width), map(peaks[i], -1, 1, height, 0));
//   }
//   endShape();
// }

// function mousePressed() {
//   if (soundFile.isPlaying()) {
//     soundFile.pause();
//   } else {
//     soundFile.play();
//   }
// }
