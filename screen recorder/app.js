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
        video.srcObject = stream;
    } catch (error) {
        console.log('error occured')
    }
    console.log(video.srcObject);
    console.log('function completed ......');
}

function failedStream(){
    console.log('Some sort of error !');
}
