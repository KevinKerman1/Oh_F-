import express from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import sendAudioFile from './sendAudio.js'; 

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/api/upload', upload.single('videoBlob'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const outputAudioPath = path.join(__dirname, 'output', `audio_${Date.now()}.mp3`);

    ffmpeg(filePath)
        .audioCodec('libmp3lame')
        .noVideo()
        .setStartTime(0)
        .setDuration(30)
        .save(outputAudioPath)
        .on('end', () => {
            console.log('Audio extracted and trimmed successfully.');

            sendAudioFile(outputAudioPath);

            res.json({ message: 'Audio extracted and sent to external API.', audioPath: outputAudioPath });
        })
        .on('error', (err) => {
            console.error('Error processing video file:', err);
            res.status(500).json({ error: 'Error processing video file.' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
