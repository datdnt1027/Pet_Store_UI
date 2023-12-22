import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation  } from 'react-router-dom';
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
  let navigate = useNavigate();
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
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin không tồn tại.`; 
          }
          toast({
            title: 'Error',
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
      let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin không tồn tại.`; 
          }
          toast({
            title: 'Error',
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
      let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
  
    }
  };
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  const handlePlaceOrder = async () => {
   
    if (selectedPaymentMethod === 'momo') {
    const orderData = {
      redirectUrl: 'http://localhost:3000/order/payment/momo/',
    };
    const orderDataJson = JSON.stringify(orderData);
    try {
      //console.log('Check ' + apiConfig.PLACE_ORDER);
      const response = await axios.get(apiConfig.PLACE_ORDER, { headers });
      // Handle successful order placement
      //console.log(response.data);
      const { payUrl } = response.data;
      window.location.href = payUrl;
    } catch (error) {
      // Handle error in placing the order
      let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
    }}
    else
    {
      try {
        //console.log('Check ' + apiConfig.PLACE_ORDER);
        const response = await axios.get(apiConfig.PLACE_ORDER_COD, { headers });
        // Handle successful order placement
        //console.log(response.data);
        navigate('/order/payment/cod');
        //alert(response.data.paymentMessage);
      } catch (error) {
        // Handle error in placing the order
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin không tồn tại.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }

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
      <Flex direction="column" align="center">
        <Heading as="h3" size="md" mb={4}>
          Please select a payment method:
        </Heading>
        <Button
          variant="outline"
          colorScheme={selectedPaymentMethod === 'momo' ? 'green' : 'gray'}
          onClick={() => handlePaymentMethodSelect('momo')}
          mb={4}
        >
          MOMO payment
        </Button>
        <Button
          variant="outline"
          colorScheme={selectedPaymentMethod === 'cod' ? 'green' : 'gray'}
          onClick={() => handlePaymentMethodSelect('cod')}
        >
          Cash on Delivery
        </Button>
      </Flex>
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