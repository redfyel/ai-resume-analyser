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
        // Ensure the file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Path of the uploaded file
        const resumePath = req.file.path;

        // Process resume using AI logic (placeholder function)
        const processedData = await processResume(resumePath);

        // Get the collection to store the data
        const resumeCollection = req.app.get('resumeCollection');

        // Insert processed resume data into the 'resumes' collection
        const result = await resumeCollection.insertOne({
            filePath: resumePath,
            ...processedData,
            uploadedAt: new Date() // Add a timestamp for record purposes
        });

        // Respond to client with success
        res.status(200).json({ success: true, data: processedData, insertResult: result });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ success: false, message: 'Resume processing failed' });
    }
});

module.exports = resumeApp;
