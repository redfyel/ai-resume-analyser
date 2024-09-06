import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { name } = useParams(); 
  let navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user-api/user/${name}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, [name]); // Re-fetch data if username changes

  if (error) {
    return <div className="error-message">Oops! We couldn't find the user. Please check the URL or <button onClick={() => navigate('/login')}>login</button> to access your profile.</div>;
  }

  if (!userData) {
    return (
      <div className="loading-message">
        <p>Loading your profile...</p>
        <p>If you are not logged in, please <button onClick={() => navigate('/login')}>log in</button> to view your profile.</p>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate(`/edit-profile/${name}`); // Replace with the actual route for editing profiles
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img src={userData.profilePicture || "data:image/jpeg;base64,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"}
         alt="Profile" className="profile-picture" />
        <h1 className="profile-name">{userData.name}</h1>
        <p className="profile-email">{userData.email}</p>
        <p className="profile-position">{userData.position}</p>
        <p className="profile-location">{userData.location}</p>
        <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
      </header>
      <section className="profile-about">
        <h2>About</h2>
        <p>{userData.about ? userData.about : 'No information available'}</p>
      </section>
      <section className="profile-achievements">
        <h2>Achievements</h2>
        <ul>
          {userData.achievements && userData.achievements.map((achievement, index) => (
            <li key={index}>{achievement.value}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProfilePage;
