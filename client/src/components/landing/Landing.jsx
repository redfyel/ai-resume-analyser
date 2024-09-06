import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main className="hero">
        <h2 className='mainT'>Welcome to ResumeAnalyzer</h2>
        <p>Your path to a perfect resume starts here.</p>
        <Link to="/upload-resume" className="cta-button">Upload Your Resume</Link>
      </main>

      <div className="cards-container">
        {features.map((feature, index) => (
          <div key={index} className="card ppp">
            <div className="card-inner">
              <div className="card-front">
                {feature.name}
              </div>
              <div className="card-back">
                <h5>{feature.name}</h5>
                <p className='lead'>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Resume Analysis',
    description: 'Dive deep into your resume with our comprehensive analysis, offering insights and recommendations to enhance its effectiveness.'
  },
  {
    name: 'Feature Comparison',
    description: 'Compare your resume features with industry standards to ensure it stands out and meets the expectations of recruiters.'
  },
  {
    name: 'Real-time Feedback',
    description: 'Get instant feedback on your resume as you make edits, helping you to continuously improve and refine your content.'
  },
  {
    name: 'Expert Tips',
    description: 'Access a library of expert tips and best practices to craft a resume that truly represents your skills and achievements.'
  }
];

export default LandingPage;
