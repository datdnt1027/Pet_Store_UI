import React, { useState } from 'react';
import endpoints from '../config/apiConfig';
import axios from 'axios';
import '../components/css/RegistrationForm.css';

const PasswordResetForm = () => {
  const [resetData, setResetData] = useState({
    token: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetData((prevResetData) => ({
      ...prevResetData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resetData);
    if (resetData.password !== resetData.confirmPassword) {
      // show error
      return;
    }
    try {
      // Call API using Axios
      const response = await axios.post(endpoints.RESET, resetData);

      if (response.status === 200) {
        // password reset successful
        console.log('Password reset successful');
      } else {
        // password reset failed
        throw new Error('Password reset failed');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Password Reset Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            id="token"
            name="token"
            value={resetData.token}
            onChange={handleChange}
            required
            placeholder="Token"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            value={resetData.password}
            onChange={handleChange}
            required
            placeholder="New Password"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={resetData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
          />
        </div>
        <div className="button-container">
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;