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

  // *************************** 1 ST **************************
  // PLAY
  setTimeout(function() {
    // stop 1
    mediaRecorder.stop();
    // play 1
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


  // *************************** 2 ND **************************``
  setTimeout(function() {
    // stop 2
    mediaRecorder2.stop();
    // play 2
    var superBuffer = new Blob(recordedBlobs2, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    console.log('2nd')

    // start 3
    recordedBlobs3 = [];
    mediaRecorder3 = new MediaRecorder(window.stream, options);
    mediaRecorder3.ondataavailable = function(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs3.push(event.data);
      }
    }
    mediaRecorder3.start(1);
    console.log('2nd')
  }, 10000);

  // *************************** 3 RD **************************``
  setTimeout(function() {
    // stop 3
    mediaRecorder3.stop();
    // play 3
    var superBuffer = new Blob(recordedBlobs3, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);

    // start 4
    recordedBlobs4 = [];
    mediaRecorder4 = new MediaRecorder(window.stream, options);
    mediaRecorder4.ondataavailable = function(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs4.push(event.data);
      }
    }
    mediaRecorder4.start(1);
    console.log('3rd')
  }, 15000);


  // *************************** 4 TH **************************``
  setTimeout(function() {
    // stop 4
    mediaRecorder4.stop();
    // play 4
    var superBuffer = new Blob(recordedBlobs4, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    console.log('4TH')
  }, 20000);

}
