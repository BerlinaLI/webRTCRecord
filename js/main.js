var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
var downloadButton = document.querySelector('button#download');

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
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  gumVideo.srcObject = stream;

  // start
  var options = {mimeType: 'video/webm', bitsPerSecond: 100000};
  recordedBlobs = [];
  mediaRecorder = new MediaRecorder(window.stream, options);
  mediaRecorder.ondataavailable = function(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }
  mediaRecorder.start(10);

  setTimeout(function() {
    // stop
    mediaRecorder.stop();
    // play
    var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
  }, 2500);
}
