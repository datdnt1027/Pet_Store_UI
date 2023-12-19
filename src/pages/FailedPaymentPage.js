import '../components/css/FailedPaymentPage.css'; // Import the CSS file for the component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';


function FailedPaymentPage() {
  const [data,setData] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryString = urlParams.toString(); // Get the entire query string after the "?"
      
      const response = await axios.get(`https://localhost:7206/order/payment/momo-return?${queryString}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="failed-payment-page"> {/* Add the CSS class to the div */}
    {data.title && (
      <div>
        <h1>{data.title}</h1>
        <p>We're sorry, but your payment was not successful.</p>
      <p>Please try again or contact customer support for assistance.</p>
      </div>
      )}
    {data.paymentMessage && (
      <div>
      <h1>{data.paymentMessage}</h1>
      <p>Your payment was successful.</p>
      <p>Thank you for your purchase.</p>
      </div>
    )}
    </div>
  );
}

export default FailedPaymentPage;