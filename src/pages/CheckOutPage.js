import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import '../components/css/CheckOut.css';
import apiConfig from '../config/apiConfig';
import axios from 'axios';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
  const authToken = JSON.parse(authTokenString).token;
  console.log(authToken); // Replace with your actual auth token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get(apiConfig.ADD_TO_CART, { headers });
        const { orders, totalPrice } = response.data;
        setProducts(orders); // Update the state with fetched orders
        setTotalPrice(totalPrice);
        console.log(orders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      redirectUrl: 'http://localhost:3000/order/payment/momo/',
    };
    const orderDataJson = JSON.stringify(orderData);
    try {
      console.log('Check ' + apiConfig.PLACE_ORDER);
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
    <Box className="checkout-container" >
      <Box className="cart-items-container">
        <Heading as="h1" size="xl" mb={4}>
          Checkout
        </Heading>
        <CartItems products={products} handleQuantityChange={handleQuantityChange} handleDelete={handleDelete} />
      </Box>

      <Box className="form">
        <CheckoutForm totalPrice={totalPrice} />
        <Button
          className="place-order-button"
          onClick={handlePlaceOrder}
          size="lg"
          mt={4}
          w="100%"
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
}

function CartItems({ products, handleQuantityChange, handleDelete }) {
  console.log(products);
  return (
    <Box className="cart-items-container">
      <Heading as="h2" size="lg" mb={4}>
        Cart Items
      </Heading>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <Flex key={index} alignItems="center" mb={4}>
            <Image src={`data:image/png;base64, ${product.imageData}`} alt={product.productName} boxSize={100} mr={4} />
            <Box flex="1">
              <Text fontSize="xl" fontWeight="bold" mb={2} >
                {product.productName}
              </Text>
              <Text fontSize="lg" mb={2} >
                Price: ${product.productPrice}
              </Text>
              <Flex alignItems="center">
                <IconButton
                  icon={<MinusIcon />}
                  aria-label="Decrease Quantity"
                  onClick={() => handleQuantityChange(index, product.quantity - 1)}
                  mr={2}
                  isDisabled={product.quantity === 1}
                />
                <Text fontSize="lg" mr={2} >
                  Quantity: {product.quantity}
                </Text>
                <IconButton
                  icon={<AddIcon />}
                  aria-label="Increase Quantity"
                  onClick={() => handleQuantityChange(index, product.quantity + 1)}
                  mr={2}
                  
                />
                <IconButton
                  icon={<CloseIcon />}
                  aria-label="Delete"
                  onClick={() => handleDelete(index)}
                  colorScheme="red"
                />
              </Flex>
            </Box>
          </Flex>
        ))
      ) : (
        <Text fontSize="lg" >
          No products found
        </Text>
      )}
    </Box>
  );
}

function CheckoutForm({ totalPrice }) {
  return (
    <Box as="form" className="form">
      <Heading as="h2" size="lg" mb={4}>
        Checkout
      </Heading>
      <Text fontSize="xl" fontWeight="bold" mb={4} >
        Total: ${totalPrice}
      </Text>
      {/* Other fields */}
    </Box>
  );
}

export default Checkout;