const exp = require("express");
const resumeApp = exp.Router();
const multer = require("multer");
const { execFile } = require('child_process');
const path = require('path');
const upload = multer({ dest: 'uploads/' });


// Add body parser middleware
resumeApp.use(exp.json());

// Function to run Python script
const runPythonScript = (scriptPath, args) => {
    return new Promise((resolve, reject) => {
        execFile('python', [scriptPath, ...args], (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                resolve(JSON.parse(stdout));
            }
        });
    });
};

resumeApp.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const resumePath = req.file.path;
        const scriptPath = path.join(__dirname, '../utils/resumeParser.py');
        const args = [resumePath];
        const processedData = await runPythonScript(scriptPath, args);
        res.status(200).json({ success: true, data: processedData });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ success: false, message: 'Resume processing failed', error: error.message });
    }
});

module.exports = resumeApp;
