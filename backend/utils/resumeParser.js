// resumeParser.js
const fs = require('fs');
const path = require('path');


const { parse } = require('resume-parser');

const processResume = async (resumePath) => {
    try {
        const resumeData = await parse(resumePath);
        return resumeData;
    } catch (error) {
        console.error('Error parsing resume:', error);
        throw error;
    }
};

module.exports = { processResume };
