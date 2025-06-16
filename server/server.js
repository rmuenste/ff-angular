const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Load environment file if it exists
function loadEnvFile(envFile) {
    const envPath = path.join(__dirname, envFile);
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#') && line.includes('=')) {
                const [key, value] = line.split('=', 2);
                if (!process.env[key.trim()]) {
                    process.env[key.trim()] = value.trim();
                }
            }
        });
    }
}

// Load environment configuration
const environment = process.env.NODE_ENV || 'development';
loadEnvFile(`.env.${environment}`);
loadEnvFile('.env');

const app = express();

// Environment variables with defaults
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'];
const DATA_DIRECTORY = process.env.DATA_DIRECTORY || 'data';

// Security configuration
const ENABLE_RATE_LIMITING = process.env.ENABLE_RATE_LIMITING !== 'false';
const RATE_LIMIT_REQUESTS = parseInt(process.env.RATE_LIMIT_REQUESTS || '1000'); // Generous for intranet
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600') * 1000; // Convert to milliseconds

// Rate limiting storage
const requestCounts = new Map();

function validateFilename(filename) {
    if (!filename || filename.length > 100) {
        return { valid: false, sanitized: '' };
    }
    
    // Check for dangerous patterns BEFORE sanitization
    const dangerousPatterns = ['..', '/', '\\', '\0', '.env', 'config', 'passwd', 'shadow', 'hosts'];
    for (const pattern of dangerousPatterns) {
        if (filename.toLowerCase().includes(pattern)) {
            return { valid: false, sanitized: '' };
        }
    }
    
    // Remove dangerous characters, keep only alphanumeric, hyphens, underscores
    const sanitized = filename.replace(/[^\w\-_]/g, '');
    
    // Ensure it's not empty after sanitization
    if (!sanitized) {
        return { valid: false, sanitized: '' };
    }
    
    // Prevent hidden files
    if (sanitized.startsWith('.')) {
        return { valid: false, sanitized: '' };
    }
    
    // Must contain at least one letter or number
    if (!/[a-zA-Z0-9]/.test(sanitized)) {
        return { valid: false, sanitized: '' };
    }
    
    // Basic pattern validation
    if (!/^[a-zA-Z0-9_\-]+$/.test(sanitized)) {
        return { valid: false, sanitized: '' };
    }
    
    return { valid: true, sanitized };
}

function secureFilePath(baseDir, filename) {
    const validation = validateFilename(filename);
    if (!validation.valid) {
        return { valid: false, path: '' };
    }
    
    try {
        const basePath = path.resolve(baseDir);
        const filePath = path.resolve(basePath, `${validation.sanitized}.json`);
        
        // Ensure file is within base directory
        if (!filePath.startsWith(basePath + path.sep)) {
            return { valid: false, path: '' };
        }
        
        return { valid: true, path: filePath };
    } catch (error) {
        return { valid: false, path: '' };
    }
}

function checkRateLimit(clientIp) {
    if (!ENABLE_RATE_LIMITING) {
        return true;
    }
    
    const now = Date.now();
    
    // Get existing requests for this IP
    let requests = requestCounts.get(clientIp) || [];
    
    // Clean old requests
    requests = requests.filter(reqTime => now - reqTime < RATE_LIMIT_WINDOW);
    
    // Check limit
    if (requests.length >= RATE_LIMIT_REQUESTS) {
        return false;
    }
    
    // Record this request
    requests.push(now);
    requestCounts.set(clientIp, requests);
    
    return true;
}

function validateFileRequest(fileNames) {
    if (!Array.isArray(fileNames)) {
        return { valid: false, error: 'fileNames should be an array' };
    }
    
    if (fileNames.length === 0) {
        return { valid: false, error: 'fileNames cannot be empty' };
    }
    
    if (fileNames.length > 20) {
        return { valid: false, error: 'Too many files requested (max 20)' };
    }
    
    for (const filename of fileNames) {
        if (!filename || filename.length > 100) {
            return { valid: false, error: `Invalid filename length: ${filename}` };
        }
        
        if (!/^[a-zA-Z0-9_\-\.]+$/.test(filename)) {
            return { valid: false, error: `Invalid filename format: ${filename}` };
        }
    }
    
    return { valid: true };
}

app.use(cors({origin: ALLOWED_ORIGINS}));

// Middleware to parse JSON body
app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    console.log(`Request: ${req.method} ${req.path} from ${clientIp}`);
    
    const originalSend = res.send;
    res.send = function(data) {
        console.log(`Response: ${res.statusCode} for ${req.method} ${req.path}`);
        return originalSend.call(this, data);
    };
    
    next();
});

// Endpoint to handle requests for JSON data by filename
app.post('/get-json', (req, res) => {
    const { fileName } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    console.log(`Got fileName: ${fileName} from ${clientIp}`);

    // Rate limiting check
    if (!checkRateLimit(clientIp)) {
        console.log(`Rate limit exceeded for ${clientIp}`);
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    // Secure file path validation
    const result = secureFilePath(DATA_DIRECTORY, fileName);
    if (!result.valid) {
        console.log(`Invalid filename rejected: ${fileName} from ${clientIp}`);
        return res.status(400).json({ error: 'Invalid filename' });
    }

    console.log(`Reading file: ${result.path}`);
    
    // Check if the file exists and read it
    fs.readFile(result.path, 'utf8', (err, data) => {
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
    const clientIp = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    console.log(`Multiple file request: ${JSON.stringify(fileNames)} from ${clientIp}`);

    // Rate limiting check
    if (!checkRateLimit(clientIp)) {
        console.log(`Rate limit exceeded for ${clientIp}`);
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    // Input validation
    const validation = validateFileRequest(fileNames);
    if (!validation.valid) {
        console.log(`Invalid request from ${clientIp}: ${validation.error}`);
        return res.status(400).json({ error: validation.error });
    }

    const jsonResponses = [];

    // Read all files in the fileNames array
    fileNames.forEach(fileName => {
        // Secure file path validation
        const result = secureFilePath(DATA_DIRECTORY, fileName);
        
        if (!result.valid) {
            console.log(`Invalid filename rejected: ${fileName} from ${clientIp}`);
            jsonResponses.push({ error: `Invalid filename: ${fileName}` });
            return;
        }

        // Check if the file exists and read it
        try {
            const data = fs.readFileSync(result.path, 'utf8');
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
