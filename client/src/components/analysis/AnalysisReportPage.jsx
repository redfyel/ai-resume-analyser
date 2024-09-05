import React, { useState } from 'react';
import './AnalysisReportPage.css';

const AnalysisReportPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyzeClick = () => {
    // Simulate analysis
    setAnalysisResult({
      score: 85,
      strengths: ['Great formatting', 'Strong skills section'],
      weaknesses: ['Lacks specific achievements', 'Needs better summary'],
      suggestions: ['Add more specific achievements', 'Improve the summary section']
    });
  };

  return (
    <div className="analysis-report-page">
      <header>
        <h1>Resume Analysis Report</h1>
      </header>
      <main>
        {!analysisResult ? (
          <button onClick={handleAnalyzeClick} className="analyze-btn">
            Analyze Resume
          </button>
        ) : (
          <div className="analysis-result">
            <h2>Analysis Report</h2>
            <div className="score-section">
              <div className="score-circle">{analysisResult.score}%</div>
              <p className="score-text">Your resume is almost there!</p>
            </div>
            <div className="details">
              <div className="strengths">
                <h3>Strengths</h3>
                <ul>
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="weaknesses">
                <h3>Weaknesses</h3>
                <ul>
                  {analysisResult.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
              <div className="suggestions">
                <h3>Suggestions</h3>
                <ul>
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisReportPage;
