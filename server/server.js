const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Endpoint to handle requests for JSON data by filename
app.post('/get-json', (req, res) => {
    const { fileName } = req.body;
    console.log(`Got fileName: ${fileName}`);

    // Construct the file path based on the filename sent in the request
    const filePath = path.join(__dirname, 'data', `${fileName}.json`);
    console.log(`filePath: ${filePath}`);
    // Check if the file exists and read it
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }
        try {
            // Parse and send the JSON data
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

// Endpoint to handle requests for multiple JSON files
app.post('/get-multiple-json', (req, res) => {
    const { fileNames } = req.body;

    if (!Array.isArray(fileNames)) {
        return res.status(400).json({ error: 'fileNames should be an array' });
    }

    const jsonResponses = [];

    // Read all files in the fileNames array
    fileNames.forEach(fileName => {
        const filePath = path.join(__dirname, 'data', `${fileName}.json`);

        // Check if the file exists and read it
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            jsonResponses.push(JSON.parse(data));
        } catch (err) {
            jsonResponses.push({ error: `File not found: ${fileName}` });
        }
    });

    // Send back an array of JSON responses
    res.json(jsonResponses);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
