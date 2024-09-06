const exp = require("express");
const resumeApp = exp.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const { processResume } = require("../utils/resumeParser"); 

// Add body parser middleware
resumeApp.use(exp.json());

// POST: /upload-resume
resumeApp.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        const resumePath = req.file.path;

        // Process resume using your AI logic
        const processedData = processResume(resumePath);

        // Store processed data into MongoDB
        const resumeCollection = req.app.get('resumeCollection');
        await resumeCollection.insertOne({
            filePath: resumePath,
            ...processedData
        });

        res.status(200).json({ success: true, data: processedData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Resume processing failed' });
    }
});

module.exports = resumeApp;
