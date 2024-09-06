const fs = require('fs');
const path = require('path');
const { parse } = require('resume-parser'); 

// Function to process the resume file and extract data
const processResume = (filePath) => {
    return new Promise((resolve, reject) => {
        // Call the parsing library or custom logic
        parseResumeFile(filePath)
            .then((parsedData) => {
                const processedData = {
                    name: parsedData.name || "Unknown",
                    experience: parsedData.experience || 0,
                    skills: parsedData.skills || [],
                    education: parsedData.education || "Unknown",
                    email: parsedData.email || "Unknown",
                    contact: parsedData.phone || "Unknown",
                };
                resolve(processedData);
            })
            .catch((error) => {
                console.error("Error parsing resume:", error);
                reject("Resume parsing failed.");
            });
    });
};

// Helper function to read and parse the resume file
const parseResumeFile = (filePath) => {
    return new Promise((resolve, reject) => {
        // This assumes you have a library like 'resume-parser'
        parse(filePath, (error, data) => {
            if (error) {
                return reject(error);
            }
            // Return parsed data
            resolve(data);
        });
    });
};

module.exports = { processResume };
