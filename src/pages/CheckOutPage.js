import React, { useEffect, useState } from 'react';
import '../components/css/CheckOut.css';
import apiConfig from '../config/apiConfig';
import axios from 'axios';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
  const authToken = JSON.parse(authTokenString).token;
  console.log(authToken) // Replace with your actual auth token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  };
  useEffect(() => {
    // Define an async function to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get(apiConfig.ADD_TO_CART,{headers});
        const { products, totalPrice } = response.data;
        setProducts(products);
        setTotalPrice(totalPrice);
        console.log(totalPrice);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handlePlaceOrder = async () => {
    const orderData = {
      redirectUrl: "http://localhost:3000/order/payment/momo/"
    };
    const orderDataJson = JSON.stringify(orderData);
    try {
      console.log("Check " + apiConfig.PLACE_ORDER);
      const response = await axios.post(apiConfig.PLACE_ORDER, orderDataJson, { headers });
      // Handle successful order placement
      console.log(response.data);
      const { payUrl } = response.data;
      window.location.href = payUrl;
    } catch (error) {
      // Handle error in placing the order
      console.error('Error placing order:', error);
    }
  };
  return (
    <div className="checkout-container">
      <div className="cart-items-container">
        <h1 className="title">Checkout</h1>
        <CartItems products={products} />
      </div>

      <div className="form">
        <CheckoutForm totalPrice={totalPrice} />
        <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
}

function CartItems({ products }) {
  console.log(products)
  return (
    <div className="cart-items-container">
      <h2 className="cart-title">Cart Items</h2>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <div className="item-container" key={index}>
            <img className="item-image" src={`data:image/png;base64, ${product.imageData}`} alt={product.productName} />
            <div className="item-details">
              <p className="item-name">{product.productName}</p>
              <p className="item-price">${product.productPrice}</p>
              <p className="item-quantity">{product.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

function CheckoutForm({ totalPrice }) {
  return (
    <form className="form">
      <h2 className="form-title">Checkout</h2>
      <label className="form-label">
        <p className="item-price">Total: ${totalPrice}</p>
      </label>
      {/* Other fields */}
    </form>
  );
}

export default Checkout;