document.getElementById('startRecording').addEventListener('click', recordClick, false);

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
                chromeMediaSourceId:id
            }
        }
    }, startStream,failedStream);
}

function startStream(stream) {
    console.log('Receiving Data from User');
    const mediaStream = new MediaStream();
    const video = document.getElementById('screenMain');
    video.srcObject = mediaStream;
    stream.onended = function (){
        console.log("Video Recording Session Ended");
    }
}

function failedStream(){
    console.log('Some sort of error !');
}
