import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main className="hero">
        <h2 className="mainT">Welcome to ResumeRefine</h2>
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
                <p className="lead">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2 className="pricing-title">Choose Your Plan</h2>
        <div className="pricing-cards">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Link to={plan.link} className="choose-plan-btn">Choose Plan</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

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

const pricingPlans = [
  {
    name: 'Basic',
    price: '$19/month',
    features: ['Basic Resume Analysis', 'Standard Feedback', 'Email Support'],
    link: '/basic-plan'
  },
  {
    name: 'Pro',
    price: '$39/month',
    features: ['Advanced Resume Analysis', 'Real-time Feedback', 'Priority Support'],
    link: '/pro-plan',
    popular: true
  },
  {
    name: 'Premium',
    price: '$59/month',
    features: ['Full Resume Analysis', 'Expert Feedback', '1-on-1 Consultation', 'Premium Support'],
    link: '/premium-plan'
  }
];

export default LandingPage;
