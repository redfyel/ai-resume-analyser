import React, { useState } from 'react';
import './AnalysisReportPage.css';

const AnalysisReportPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyzeClick = () => {
    const sampleData = {
      score: 85,
      strengths: [
        "Strong technical skills in JavaScript, Python, and React.",
        "Experience in leading projects and collaborating with teams.",
        "Good problem-solving ability with data structures and algorithms."
      ],
      weaknesses: [
        "Lack of experience with cloud platforms like AWS or Azure.",
        "Needs improvement in soft skills section (communication, leadership).",
        "Resume formatting could be more concise."
      ],
      suggestions: [
        "Add a dedicated section for soft skills with examples.",
        "Include experience with cloud technologies to enhance technical stack.",
        "Consider optimizing the design and readability for ATS (Applicant Tracking Systems)."
      ]
    };
    setAnalysisResult(sampleData);
  };

  return (
    <div className="analysis-report-page">
      <header className="report-header">
        <h1>Resume Analysis Report</h1>
        <p>Your personalized resume analysis</p>
      </header>
      <main>
        {!analysisResult ? (
          <button onClick={handleAnalyzeClick} className="analyze-btn">
            Analyze Resume
          </button>
        ) : (
          <div className="analysis-result">
            <section className="score-section">
              <div className="score-circle">
                <span>{analysisResult.score}%</span>
              </div>
              <p className="score-text">Your resume is almost there!</p>
            </section>

            <section className="details">
  <div className="report-section strengths">
    <h3>Strengths</h3>
    <ul>
      {analysisResult.strengths.map((strength, index) => (
        <li key={index}>{strength}</li>
      ))}
    </ul>
  </div>

  <div className="report-section weaknesses">
    <h3>Weaknesses</h3>
    <ul>
      {analysisResult.weaknesses.map((weakness, index) => (
        <li key={index}>{weakness}</li>
      ))}
    </ul>
  </div>

  <div className="report-section suggestions">
    <h3>Suggestions</h3>
    <ul>
      {analysisResult.suggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
      ))}
    </ul>
  </div>
</section>

          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisReportPage;
