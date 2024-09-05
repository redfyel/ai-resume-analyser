import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadResumePage.css';

const UploadResumePage = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [analysisVisible, setAnalysisVisible] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadStatus('Uploading...');
      setAnalysisVisible(false);
      setFilePreview(URL.createObjectURL(file));  // Create a preview URL for the uploaded file
      setTimeout(() => {
        setUploadStatus('Upload Complete!');
        setAnalysisVisible(true);
      }, 2000);
    }
  };

  const handleViewAnalysis = () => {
    navigate('/analysis');
  };

  return (
    <div className="upload-resume-page">
      <header>
        <h1>Upload Your Resume</h1>
      </header>
      <main>
        <div className="upload-area">
          <label className="file-input-label">
            <input type="file" accept=".pdf, .doc, .docx" onChange={handleFileUpload} />
            <span>Choose File</span>
          </label>
          <div className="upload-status">
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </div>
        {filePreview && (
          <div className="file-preview">
            <h3>File Preview:</h3>
            <iframe src={filePreview} title="File Preview" className="file-iframe" />
          </div>
        )}
        {analysisVisible && (
          <div className="analysis-section">
            <h2>Resume Analysis</h2>
            <p>Your resume has been analyzed successfully!</p>
            <button className="view-analysis-btn" onClick={handleViewAnalysis}>
              View Detailed Analysis
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UploadResumePage;
