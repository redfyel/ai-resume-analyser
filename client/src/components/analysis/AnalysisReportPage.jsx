import React, { useState } from 'react';
import './AnalysisReportPage.css';

const AnalysisReportPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyzeClick = () => {
    // const sampleData = {
    //   score: 85,
    //   strengths: [
    //     "Proficient in JavaScript, Python, and React with a strong grasp of modern frameworks and tools.",
    //     "Leadership experience in managing cross-functional teams and driving projects to successful completion.",
    //     "Excellent analytical and problem-solving skills with a focus on data structures, algorithms, and software optimization."
    //   ],
    //   weaknesses: [
    //     "Limited hands-on experience with cloud platforms like AWS or Azure.",
    //     "Could benefit from showcasing more interpersonal skills such as conflict resolution and stakeholder management.",
    //     "Resume layout is slightly crowded and could be better organized to highlight key sections."
    //   ],
    //   suggestions: [
    //     "Include measurable achievements (e.g., 'Improved app performance by 25%').",
    //     "Add a 'Professional Development' section for certifications or courses.",
    //     "Reorganize sections to highlight key skills and achievements first.",
    //     "Show context for technical skills by linking them to real-world projects.",
    //     "Customize the resume for each job with relevant keywords for ATS."
    //   ]
      
    // };
    const sampleData = {
      score: 65,
      strengths: [
        "Strong proficiency in front-end development using HTML, CSS, and JavaScript.",
        "Experience in UI/UX design collaboration during web application development.",
        "Proficient in using version control tools like Git for collaboration."
      ],
      weaknesses: [
        "Lack of a portfolio showcasing design-focused work.",
        "Limited experience in design software like Adobe XD, Figma, or Sketch.",
        "No direct experience in creating design mockups or wireframes."
      ],
      suggestions: [
        "Create a portfolio with case studies that highlight your front-end design contributions.",
        "Learn industry-standard design tools such as Figma, Sketch, or Adobe XD to strengthen your design skills.",
        "Consider working on projects where you lead the design aspect to better align with designer roles.",
        "Emphasize any collaboration you had with designers, showing your ability to translate design into functional interfaces.",
        "Show interest in design by taking online courses or certifications and mentioning them on your resume."
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
