import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config();

// Function to send the audio file to the OpenAI API (Whisper)
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
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                ...formData.getHeaders()
            },
            body: formData
        });

        console.log('Response status (API 1):', response.status);

        const responseData = await response.json();
        console.log('Response from API 1 (transcription):', responseData);

        if (responseData && responseData.text) {
            // Call the second API with the transcription from API 1
            await sendChatCompletion(responseData.text);
        }
    } catch (error) {
        console.error('Error sending audio file to OpenAI API:', error);
    }
}

// Function to send the result of the first API call (transcription) to the second API
async function sendChatCompletion(transcriptionText) {
    const chatRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant. You will be given a transcript of the last 2 minutes of a Zoom call. The user was called upon but was not paying attention."
            },
            {
                role: "user",
                content: `Here is the transcript: ${transcriptionText}. Based on this, please provide the following:\n1. What was the last question that was asked?\n2. Three two-sentence key points summarizing what was said in the last two minutes.\n3. Three potential answers I could give in response to the question.`
            }
        ]
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatRequestBody)
        });

        console.log('Response status (API 2):', response.status);

        const responseData = await response.json();
        console.log('Response from API 2 (chat completion):', responseData.choices[0].message.content);
    } catch (error) {
        console.error('Error sending chat request to OpenAI API:', error);
    }
}

export default sendAudioFile;
