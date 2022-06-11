const ScreenCapture = function(el, options) {

  if(!(el instanceof Element || el instanceof HTMLDocument)) {
    throw new Error('screen video slot is not defined');
  }

  this._videoSlot = el;
  this._mediaRecorder = null;
  // Attributes
  this._attribute = {
    segmentSize: 5000, // ms
    version: '!!#Version#!!'
  }
  // Options
  this._options = Object.assign({
    video: {
      cursor: 'always'
    },
    audio: false
  }, options)
}
ScreenCapture.prototype.start = async function() {
  console.log('start capture');
  try {
    this._videoSlot.srcObject = await navigator.mediaDevices.getDisplayMedia(this._options);
    this.dump();
  } catch (e) {
    console.log(e);
  }
}
ScreenCapture.prototype.stop = function() {
  console.log('stop capture');
  const tracks = this._videoSlot.srcObject.getTracks();
  console.log(tracks);
  tracks.forEach(track => track.stop());
  this._videoSlot.srcObject = null;
}
ScreenCapture.prototype.dump = function() {
  const videoTrack = this._videoSlot.srcObject.getVideoTracks()[0];
  console.log(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
ScreenCapture.prototype.startRecording = function() {
  console.log('start screen recording');
}
ScreenCapture.prototype.stopRecording = function() {
  console.log('stop screen recording');
}
ScreenCapture.prototype.getVersion = function() {
  return this._attribute.version;
}

export default ScreenCapture;
