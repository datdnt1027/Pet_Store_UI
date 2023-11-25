import React, { useState, useEffect } from 'react';
import '../components/css/LoginForm.css'; // CSS file for styling
import endpoints from '../config/apiConfig'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  let navigate = useNavigate();
  const [lemail, setEmail] = useState('');
  const [lpassword, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const payload = {
      email: lemail
    }
    if (lemail !== lemail) {
      // show error
      return;
    }
    try {
      // Call API using Axios
      const response = await axios.post(endpoints.FORGOT, payload);

      if (response.status === 200) {
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

      if (response.status === 200) {
        // registration successful
        console.log('Login successful');
        
        sessionStorage.setItem('user', response);  
        navigate('success');
      } else {
        // registration failed 
        throw new Error('Login failed');
      }

    } catch (error) {
      console.error(error);
    }
    if(rememberMe) {
      localStorage.setItem('emal', lemail);
      localStorage.setItem('password', lpassword); 
    }
  };
  useEffect(() => {

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if(storedEmail && storedPassword) {
      setEmail(storedEmail);  
      setPassword(storedPassword);
      setRememberMe(true);
    }

  }, []);
  return (
    <div className='all'>
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <input
              type="email"
              value={lemail}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={lpassword}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
          <div className='remember'>
            <div className='remember-wrapper'>
              <label>
                <input type='checkbox' checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)} />
              </label>
              <div>Remember me</div>
            </div>
            <a className='forgot' href="" onClick={handleForgotPassword}>Forgot password</a>
          </div>
          <button className='btn' type="submit">Login</button>
          <div className='register-link'>
            <p>Don't have an account <a href='/signup'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;