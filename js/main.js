var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var mediaRecorder2;
var recordedBlobs2;

var mediaRecorder3;
var recordedBlobs3;

var mediaRecorder4;
var recordedBlobs4;


var windowstream;

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
var downloadButton = document.querySelector('button#download');

var c1 = document.getElementById("c1");
var ctx1 = c1.getContext("2d");

var c2 = document.getElementById("c2");
var ctx2 = c2.getContext("2d");

var width = 640;
var height = 400;


var constraints = {
  audio: false,
  video: true
};

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

navigator.mediaDevices.getUserMedia(
  constraints
).then(
  successCallback
);

function successCallback(stream) {
  windowstream = stream;
  gumVideo.srcObject = stream;
  gumVideo.addEventListener("canplay", function() {
      timerCallback();
  }, false);

  var options = {mimeType: 'video/webm', bitsPerSecond: 100000};

  // start
  recordedBlobs = [];
  mediaRecorder = new MediaRecorder(windowstream, options);
  mediaRecorder.ondataavailable = function(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }
  mediaRecorder.start(1);

  setTimeout(function() {
    // stop
    mediaRecorder.stop();
    // play
    var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    console.log('1st')
  }, 5000);
}

function timerCallback() {
    if (gumVideo.paused || gumVideo.ended) {
        return;
    }
    computeFrame();
    let self = this;
    setTimeout(function () {
        self.timerCallback();
        // console.log('loop')
    }, 0);
}

function computeFrame() {
    ctx1.drawImage(gumVideo, 0, 0, width, height);
    let frame = this.ctx1.getImageData(0, 0, width, height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      // 89 87 89
      // 35 140 110
      // 50 200 200
      if ( r < 50 && g < 130 && b < 90) {
      // if (g < 100 && r < 100 && b < 100) {
        frame.data[i * 4 + 3] = 0;
      }
    }
    ctx2.putImageData(frame, 0, 0);
    console.log('compute')
    return;
}
