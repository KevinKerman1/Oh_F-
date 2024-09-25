Overview

This Chrome extension allows users to capture audio from a web application (such as Zoom) in real-time, extract the audio using an API, and regenerate it client-side. The audio is processed and sent back to the user in a meaningful format, such as transcription, summaries, or AI-generated responses.

Features

	•	Audio Capture: Extracts the last few moments of audio during a meeting or session using the extension.
	•	API Integration: Sends the extracted audio to a server API for processing (e.g., transcription or AI-based summarization).
	•	Audio Processing: The backend API processes the audio and generates output in text or audio format (e.g., summary, follow-up actions).
	•	Client-Side Display: The processed response is delivered back to the user and displayed within the Chrome extension UI.
	•	Real-Time Functionality: Provides real-time processing with minimal delay to ensure quick feedback during meetings.

Table of Contents

	•	Installation
	•	How It Works
	•	Technologies Used
	•	API Endpoints
	•	Usage
	•	Contributing
	•	License

Installation

Prerequisites

	•	Google Chrome browser
	•	Node.js installed for local development
	•	API credentials (if required for the audio processing API)

Steps

	1.	Clone the Repository:
 git clone https://github.com/your-username/audio-chrome-extension.git

 2.	Install Dependencies:
Inside the project directory, run:
npm install

3.	Build the Project:
Run the following command to bundle the extension:
npm run build

4.	Load the Extension in Chrome:
	1.	Open Chrome and navigate to chrome://extensions/.
	2.	Enable Developer mode.
	3.	Click Load unpacked and select the dist/ folder where your bundled extension files are located.
	5.	Run the Extension:
	•	Once loaded, you should see the extension icon in the Chrome toolbar. Click on it to access the interface and use the audio extraction functionality.

How It Works

	1.	Capture Audio:
The Chrome extension uses the MediaDevices API to capture real-time audio from the user’s microphone or other audio input. This is initiated when the user clicks a “Start Recording” button in the extension.
	2.	Send Audio to API:
The captured audio is sent to a backend API using fetch or Axios for processing. This could involve sending the raw audio data to an external service that provides transcription, summarization, or AI-based insights.
	3.	Process Audio (Server-Side):
The backend API (which you may be using from a third-party service or your own API) processes the audio. Common tasks might include:
	•	Speech-to-text transcription.
	•	AI-based response generation (e.g., OpenAI GPT or a custom NLP model).
	•	Summarization of the content.
	4.	Return Processed Data:
The processed data (text, transcription, AI response) is returned to the extension, which displays it within the UI.
	5.	Regenerate and Display:
The regenerated audio or text is displayed to the user in real-time, allowing them to take actions such as sending a follow-up message or saving the generated content.

Technologies Used

	•	React: Used for building the UI of the Chrome extension.
	•	Axios/Fetch: For making API requests to extract and regenerate audio.
	•	MediaDevices API: To capture the user’s audio input.
	•	Node.js: Used to run the backend API server.
	•	Webpack: Bundling the Chrome extension for deployment.
	•	Babel: Transpiling modern JavaScript for cross-browser compatibility.
	•	Chrome Extensions API: To handle permissions, background scripts, and content injection.

API Endpoints

POST /api/extract-audio

	•	Description: Receives the audio data from the Chrome extension and processes it (e.g., transcribes or sends it to an AI for response generation).
	•	Input: Raw audio data or streaming data.
	•	Output: Transcribed text or AI-generated response in JSON format.

Example Request:
POST /api/extract-audio
Content-Type: application/json
{
  "audioData": "BASE64_ENCODED_AUDIO"
}

Response:
{
  "transcript": "This is the transcribed text of the audio.",
  "summary": "This meeting discussed the following action points..."
}

Usage

	1.	Start Recording:
	•	Click on the extension icon and select “Start Recording” to capture the last few moments of audio from your Zoom or web meeting.
	2.	View Processed Response:
	•	The captured audio is sent to the API for transcription or processing.
	•	The processed response (text or summary) is displayed in the extension popup.
	3.	Download or Save:
	•	Users can download the transcript or generated response or save it for future use.

Contributing

Contributions are welcome! Please follow these steps to contribute:

	1.	Fork the repository.
	2.	Create a new branch (git checkout -b feature/your-feature).
	3.	Make your changes.
	4.	Push to your branch (git push origin feature/your-feature).
	5.	Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.
