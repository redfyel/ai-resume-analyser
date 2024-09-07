import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import './Register.css'; 

const Register = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      achievements: [{ value: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements"
  });
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  const interestsOptions = [
    "Software Developer", "Designer", "Data Scientist", "Product Manager", "DevOps Engineer"
  ];

  const handleInterestSelect = (event) => {
    const value = event.target.value;
    if (!selectedInterests.includes(value) && value !== "") {
      setSelectedInterests([...selectedInterests, value]);
    }
  };

  const removeInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const onSubmit = async (data) => {
    try {
      // Include selected interests in the data
      data.interests = selectedInterests;
      const response = await axios.post("http://localhost:4000/user-api/user", data);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div className="register-container">
      <div className="about-section">
        <h2>Registration</h2>
        <p>Fill in the form below to register and join our community. Your details are safe with us!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: "Name is required" })}
            className="form-control"
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: "Email is required" })}
            className="form-control"
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: "Password is required" })}
            className="form-control"
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            id="profilePicture"
            type="url"
            {...register('profilePicture')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            {...register('about')}
            className="form-control"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            id="position"
            type="text"
            {...register('position')}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            {...register('location')}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="interests">Job Interests</label>
          <select onChange={handleInterestSelect} className="form-control">
            <option value="">Select an interest</option>
            {interestsOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <div className="selected-interests">
            {selectedInterests.map((interest, index) => (
              <div key={index} className="interest-tag">
                {interest}
                <span className="remove-tag" onClick={() => removeInterest(interest)}>x</span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="achievements">Achievements (up to 5)</label>
          {fields.map((field, index) => (
            <div key={field.id} className="achievement-group">
              <input
                type="text"
                {...register(`achievements[${index}].value`)}
                className="form-control"
                placeholder={`Achievement ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="remove-button"
                disabled={fields.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fields.length < 5 && append({ value: "" })}
            className="add-button"
            disabled={fields.length >= 5}
          >
            Add Achievement
          </button>
          {fields.length === 5 && <span className="max-achievements-message">Maximum of 5 achievements allowed</span>}
        </div>

        
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
