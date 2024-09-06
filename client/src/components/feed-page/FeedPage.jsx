import React, { useState, useEffect } from 'react';
import './FeedPage.css';

const FeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);

  // Function to fetch recruiter feed data from the backend API
  const fetchFeedData = async () => {
    try {
      const response = await fetch('http://localhost:4000/recruiter-api/recruiters-feed'); 
      const data = await response.json();
      setFeedItems(data.payload);
      console.log(data);
    } catch (error) {
      console.error('Error fetching recruiter feed data:', error);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  const handleLike = (id) => {
    setFeedItems(feedItems.map(item =>
      item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
    ));
  };

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1>Recruiters Feed</h1>
      </header>
      <main className="feed-content">
        {feedItems.length > 0 ? (
          feedItems.map(item => (
            <div key={item.id} className="feed-item">
              <h2>{item.recruiter} at <span>{item.company}</span></h2>
              <p>{item.description}</p>
              <div className="feed-actions">
                <button className="like-btn" onClick={() => handleLike(item.id)}>
                  👍 Like {item.likes ? `(${item.likes})` : ''}
                </button>
                <button className="comment-btn">💬 Comment</button>
                <button className="share-btn">🔗 Share</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading feed...</p>
        )}
      </main>
    </div>
  );
}

export default FeedPage;
