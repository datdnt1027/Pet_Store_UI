import React, { useState } from 'react';
import '../components/css/LoginForm.css'; // CSS file for styling
import endpoints from '../config/apiConfig'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  let navigate = useNavigate();
  const [lemail, setEmail] = useState('');
  const [lpassword, setPassword] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const payload = {
      email: lemail
    }
    if(lemail !== lemail) {
      // show error
      return; 
    }
    try {
      // Call API using Axios
      const response = await axios.post(endpoints.FORGOT, payload);

      if(response.status === 200) {
        // registration successful
        console.log('Password forgot successful');  
        navigate('/passwordreset');
      } else {
        // registration failed 
        throw new Error('Password forgot failed');
      }

    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: lemail,
      password: lpassword
    };
    try {
      // Call API using Axios
      console.log(lemail + " / " + lpassword);
      const response = await axios.post(endpoints.LOGIN, payload);

      if(response.status === 200) {
        // registration successful
        console.log('Login successful');  
        navigate('success');
      } else {
        // registration failed 
        throw new Error('Login failed');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={lemail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={lpassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <a href= "" onClick={handleForgotPassword}>Forgot password</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;