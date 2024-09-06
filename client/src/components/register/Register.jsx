import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/user-api/user", {
        name,
        email,
        password,
        profilePicture,
      });
      
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div className="register-container">
      <div className="about-section">
        <h2>About Registration</h2>
        <p>Fill in the form below to register and join our community. Your details are safe with us!</p>
      </div>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            id="profilePicture"
            type="url"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
