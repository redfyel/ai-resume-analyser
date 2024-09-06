import React from 'react';
import './FeedPage.css';

const FeedPage = () => {
  // Sample data
  const feedItems = [
    { id: 1, recruiter: 'Alice Smith', company: 'TechCorp', description: 'Looking for a senior developer...' },
    { id: 2, recruiter: 'Bob Johnson', company: 'Innovate Inc', description: 'Hiring junior designers...' },
  ];

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1>Recruiters Feed</h1>
      </header>
      <main className="feed-content">
        {feedItems.map(item => (
          <div key={item.id} className="feed-item">
            <h2>{item.recruiter} at <span>{item.company}</span></h2>
            <p>{item.description}</p>
            <div className="feed-actions">
              <button className="like-btn">👍 Like</button>
              <button className="comment-btn">💬 Comment</button>
              <button className="share-btn">🔗 Share</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default FeedPage;
