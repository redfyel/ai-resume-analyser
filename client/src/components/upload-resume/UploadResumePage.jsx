import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadResumePage.css';

const UploadResumePage = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [analysisVisible, setAnalysisVisible] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    
    if (file) {
        setUploadStatus('Uploading...');
        setAnalysisVisible(false);
        setFilePreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://localhost:4000/resume-api/upload-resume', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setUploadStatus('Upload Complete!');
                setAnalysisVisible(true);
            } else {
                setUploadStatus('Upload Failed: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            setUploadStatus('Upload Failed! ' + error.message);
        }
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
