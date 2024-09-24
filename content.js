console.log("Hi, I have been injected whoopie!!!");

var recorder = null;
function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);

    recorder.start();

    recorder.onstop = function() {
        stream.getTracks().forEach(function(track) {
            if (track.readyState === "live") {
                track.stop();
            }
        });
    };

    recorder.ondataavailable = function(event) {
        let recordedBlob = event.data;
        console.log(recordedBlob.type);

        // Create a FormData object to send the blob via POST request
        let formData = new FormData();
        formData.append("file", recordedBlob, "screen-recording.webm");

        // Make the POST request to the provided API URL
        fetch("https://prosolutiongroup.app.n8n.cloud/webhook-test/2acca4f5-a170-4d71-b257-81792fde0efe", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Successfully sent the blob:", data);
        })
        .catch(error => {
            console.error("Error sending the blob:", error);
        });
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "request_recording") {
        console.log("requesting recording");

        sendResponse(`processed: ${message.action}`);

        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: {
                width: 9999999999,
                height: 9999999999
            }
        }).then((stream) => {
            onAccessApproved(stream);
        });
    }

    if (message.action === "stopvideo") {
        console.log("stopping video");
        sendResponse(`processed: ${message.action}`);
        if (!recorder) return console.log("no recorder");

        recorder.stop();
    }
});
