document.addEventListener("DOMContentLoaded", () => {
    // WebSocket setup
    const ws = new WebSocket('ws://localhost:8080'); // Connect to the WebSocket server

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.action === "transcription_received") {
            displayTranscription(message.transcription);
        } else if (message.action === "chat_completion") {
            displayChatCompletion(message.message);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    const transcriptionText = document.querySelector("#transcription_text"); // For displaying the transcription
    const chatCompletionText = document.querySelector("#chat_completion_text"); // For displaying the chat completion

    // Function to display transcription
    function displayTranscription(transcription) {
        transcriptionText.textContent = transcription;
    }

    // Function to display chat completion
    function displayChatCompletion(message) {
        chatCompletionText.textContent = message;
    }
});
