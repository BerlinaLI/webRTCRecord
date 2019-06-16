var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;


var mediaRecorder2;
var recordedBlobs2;

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
  window.stream = stream;
  gumVideo.srcObject = stream;
  var options = {mimeType: 'video/webm', bitsPerSecond: 100000};

  var seconds = new Date().getTime() / 1000;
  // setInterval
  setInterval(function(){
    // alert("Hello"); },
    console.log('seconds', seconds)},
  1000);


  // start
  recordedBlobs = [];
  mediaRecorder = new MediaRecorder(window.stream, options);
  mediaRecorder.ondataavailable = function(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }
  mediaRecorder.start(1);

  // PLAY
  setTimeout(function() {
    // stop
    mediaRecorder.stop();
    // play
    var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    console.log('vid1', window.URL.createObjectURL(superBuffer))
    recordedVideo.src = window.URL.createObjectURL(superBuffer);

    // start 2
    recordedBlobs2 = [];
    mediaRecorder2 = new MediaRecorder(window.stream, options);
    mediaRecorder2.ondataavailable = function(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs2.push(event.data);
      }
    }
    mediaRecorder2.start(1);
    console.log('1st')
  }, 5000);


  // PLAY 2
  setTimeout(function() {
    // stop
    mediaRecorder2.stop();
    // play
    var superBuffer2 = new Blob(recordedBlobs2, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer2);
    console.log('2nd')
  }, 10000);

}
