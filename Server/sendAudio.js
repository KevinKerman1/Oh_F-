import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

// Function to send the audio file to the OpenAI API
async function sendAudioFile(audioFilePath) {
    const formData = new FormData();

    // Log the path of the file being sent
    console.log('Sending file:', audioFilePath);

    // Check if file exists
    if (!fs.existsSync(audioFilePath)) {
        console.error('File not found:', audioFilePath);
        return;
    }

    const fileStream = fs.createReadStream(audioFilePath);

    // Log error if file stream fails
    fileStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });

    formData.append('file', fileStream);
    formData.append('model', 'whisper-1');

    try {
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ',
                ...formData.getHeaders()
            },
            body: formData
        });

        console.log('Response status:', response.status);

        const responseData = await response.json();
        console.log('Response from OpenAI API:', responseData);
    } catch (error) {
        console.error('Error sending audio file to OpenAI API:', error);
    }
}

module.exports = sendAudioFile;
