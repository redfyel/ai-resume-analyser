import React from 'react';
import './JobAlertsPage.css';

const JobAlertsPage = () => {
  const jobAlerts = [
    { id: 1, title: 'Senior Developer', company: 'TechCorp', location: 'New York, NY', description: 'Looking for a senior developer with experience in React and Node.js to join our team.' },
    { id: 2, title: 'Junior Designer', company: 'DesignCo', location: 'San Francisco, CA', description: 'Hiring junior designers with a passion for creativity and innovation.' },
  ];

  return (
    <div className="job-alerts-page">
      <header className='header'>
        <h1>Job Alerts</h1>
      </header>
      <main className="cards-container">
        {jobAlerts.map(alert => (
          <div key={alert.id} className="job-card">
            <div className="job-card-body">
              <h2>{alert.title}</h2>
              <h3>{alert.company}</h3>
              <p className="location">{alert.location}</p>
              <p className="description">{alert.description}</p>
            </div>
            <div className="job-card-footer">
              <button className="apply-btn">Apply Now</button>
              <button className="save-btn">Save for Later</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default JobAlertsPage;
