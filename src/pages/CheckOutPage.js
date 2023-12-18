import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import '../components/css/CheckOut.css';
import {
  useToast,
} from '@chakra-ui/react';
import apiConfig from '../config/apiConfig';
import axios from 'axios';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
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
        console.log("Sanr phaamr"+products);
        setIsLoading(false);
      } catch (error) {
        let message = "Something went wrong. Please try again.";

      if(error.response) {
        message = `Error ${error.response.status}: ${error.response.data.message}`; 
      }
  
      toast({
        title: 'Load Failed',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const calculateTotal = () => {
    //console.log(products);
    let total = 0;

    if(products)
    {
    products.forEach(i => {
      console.log("Total"+i.product.productPrice);
      total += i.quantity * i.product.productPrice; 
    });
  }
    setTotalPrice(total);
  }
  
  useEffect(() => {
    // fetch data
  
    calculateTotal();
  
  }, []);

  const handleQuantityChange = async (index, newQuantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    const parsedQuantity = newQuantity.toString();
    setProducts(updatedProducts);
    const payload = {
      "orderProductId": products[index].orderProductId, 
      "quantity": parsedQuantity
    };
    //console.log(payload);
    try {
      // Call API to update quantity
      const response = await axios.post(apiConfig.UPDATE_CART, JSON.stringify(payload), {
        headers
      });
      // Handle success
      calculateTotal();
      console.log("Quantity updated successfully");
  
    } catch (error) {
  
      // Handle error
      let message = "Something went wrong. Please try again.";

      if(error.response) {
        message = `Error ${error}`; 
      }
  
      toast({
        title: 'Update Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  
    }
  };
  useEffect(() => {
    calculateTotal();
  }, [products, totalPrice])
  const handleDelete = async (index) => {
    const id = products[index].orderProductId;
    const updatedProducts = [...products];
    console.log(updatedProducts);
    updatedProducts.splice(index, 1);
    
    setProducts(updatedProducts);

    calculateTotal(); 
  
    console.log(updatedProducts);
    
    //console.log(apiConfig.DELETE_CART+id);
    try {
      // Call API to update quantity
      const response = await axios.delete(apiConfig.DELETE_CART+id, {
        headers
      });
      calculateTotal();
      // Handle success
      console.log("Quantity updated successfully");
  
    } catch (error) {
  
      // Handle error
      let message = "Something went wrong. Please try again.";

      if(error.response) {
        message = `Error ${error}`; 
      }
  
      toast({
        title: 'Update Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  
    }
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      redirectUrl: 'http://localhost:3000/order/payment/momo/',
    };
    const orderDataJson = JSON.stringify(orderData);
    try {
      //console.log('Check ' + apiConfig.PLACE_ORDER);
      const response = await axios.post(apiConfig.PLACE_ORDER, orderDataJson, { headers });
      // Handle successful order placement
      //console.log(response.data);
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
  //console.log(products);
  return (
    <Box className="cart-items-container">
      <Heading as="h2" size="lg" mb={4}>
        Cart Items
      </Heading>
      {products && products.length > 0 ? (
        products.map((i, index) => (
          <Flex key={index} alignItems="center" mb={4}>
            <Image src={`${i.product.imageData}`} alt={i.product.productName} boxSize={100} mr={4} />
            <Box flex="1">
              <Text fontSize="xl" fontWeight="bold" mb={2} >
                {i.product.productName}
              </Text>
              <Text fontSize="lg" mb={2} >
                Price: ${i.product.productPrice}
              </Text>
              <Flex alignItems="center">
                <IconButton
                  icon={<MinusIcon />}
                  aria-label="Decrease Quantity"
                  onClick={() => handleQuantityChange(index, i.quantity - 1)}
                  mr={2}
                  isDisabled={i.quantity === 1}
                />
                <Text fontSize="lg" mr={2} >
                  Quantity: {i.quantity}
                </Text>
                <IconButton
                  icon={<AddIcon />}
                  aria-label="Increase Quantity"
                  onClick={() => handleQuantityChange(index, i.quantity + 1)}
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