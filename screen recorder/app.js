document.getElementById('startRecording').addEventListener('click', recordClick, false);
document.getElementById('stopRecording').addEventListener('click',stopRecording,false);
var recordedChunks = [];

var options = { mimeType: "video/webm; codecs=vp9" };

function recordClick(){
    chrome.desktopCapture.chooseDesktopMedia(["screen","window"], accessToRecord);
}


function accessToRecord(id){
    var screenId = id;
    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId:screenId
            }
        }
    }, startStream,failedStream);
}

function startStream(stream) {
    console.log('Receiving Data from User');
    const mediaStream = new MediaStream();
    const video = document.getElementById('screenMain');
    try {
        mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
    } catch (error) {
        console.log('error occured')
    }
    console.log('function completed...');
}

function handleDataAvailable(event) {
    console.log("data-available");
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      download();
    } else {
      console.log("Data not avaiable !!");
    }
}


function download() {
    var blob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "video.webm";
    recordedChunks = [];
    a.click();
    window.URL.revokeObjectURL(url);
}
  

function failedStream(){
    console.log('Some error occured in the streaming the video !');
}

function stopRecording(){
    mediaRecorder.stop();
}

setTimeout(event => {
    console.log("stopping");
    mediaRecorder.stop();
}, 200000);


chrome.runtime.sendMessage({command: "fetch"}, (response) => {
    showData(response.data);
});
  
  
chrome.runtime.sendMessage({command: "post", data:"Test Data"}, (response) => {
    showData(response.data);
});
  
  
var showData = function(data) {
    console.log('From Extension--', data);
}