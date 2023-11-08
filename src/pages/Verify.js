import React from 'react';
import '../components/css/VerifySuccessfulPage.css';
import endpoints from '../config/apiConfig'
import axios from 'axios';

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const VerifySuccessfulPage = () => {
  const { token } = useParams();
  console.log(token);
  let navigate = useNavigate();
  useEffect(() => {
    const postData = async () => {
      try {
        const payload = {
          VerificationToken: token,
        };

        const response = await axios.post(endpoints.VERIFY, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Handle response
        if (response.status === 200) {
          // POST request successful
          console.log('POST request successful');
          navigate('/login')
        } else {
          // POST request failed
          console.log('POST request failed');
        }
      } catch (error) {
        console.error('Error occurred during POST request:', error);
      }
    };

    postData();
  }, [token]);
  return (
    <div className="verify-successful-container">
      <h1 className="verify-successful-title">Verification Successful</h1>
      <p className="verify-successful-message">Your account has been successfully verified.</p>
      <p className="verify-successful-message">Thank you for verifying your email.</p>
    </div>
  );
};

export default VerifySuccessfulPage;