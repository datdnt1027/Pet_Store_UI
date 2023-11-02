import React from 'react';
import '../components/css/VerifySuccessfulPage.css';

const VerifySuccessfulPage = () => {
  return (
    <div className="verify-successful-container">
      <h1 className="verify-successful-title">Verification Successful</h1>
      <p className="verify-successful-message">Your account has been successfully verified.</p>
      <p className="verify-successful-message">Thank you for verifying your email.</p>
    </div>
  );
};

export default VerifySuccessfulPage;