import React from 'react';
import '../components/css/FailedPaymentPage.css'; // Import the CSS file for the component

function FailedPaymentPage() {
  return (
    <div className="failed-payment-page"> {/* Add the CSS class to the div */}
      <h1>Payment Failed</h1>
      <p>We're sorry, but your payment was not successful.</p>
      <p>Please try again or contact customer support for assistance.</p>
    </div>
  );
}

export default FailedPaymentPage;