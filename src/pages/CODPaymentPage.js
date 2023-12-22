import '../components/css/FailedPaymentPage.css'; // Import the CSS file for the component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';


function CODPaymentPage() {

  return (
    <div className="failed-payment-page"> {/* Add the CSS class to the div */}
      <div>
      <h1>COD Payment success</h1>
      <p>Your payment was successful.</p>
      <p>Thank you for your purchase.</p>
      </div>
    </div>
  );
}

export default CODPaymentPage;