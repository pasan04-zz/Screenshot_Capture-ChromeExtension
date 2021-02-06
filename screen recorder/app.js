document.getElementById('startRecording').addEventListener('click', recordClick, false);
var recordedChunks = [];

var options = { mimeType: "video/webm; codecs=vp9" };

// mediaRecorder.ondataavailable = handleDataAvailable;
// mediaRecorder.start();

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
    // console.log(video.srcObject);
    console.log('function completed ......');
}

function handleDataAvailable(event) {
    console.log("data-available");
    console.log(event.data.size);
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      console.log(recordedChunks);
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
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('OKAAAAAAAAAAAAAY DOWNLOADED');
}
  

function failedStream(){
    console.log('Some sort of error !');
}

setTimeout(event => {
    console.log("stopping");
    mediaRecorder.stop();
  }, 200000);
