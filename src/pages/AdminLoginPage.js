import React, { useState, useEffect } from 'react';
import apiConfig from '../config/apiConfig';
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

const AdminLogin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [error, setError] = useState();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiConfig.LOGIN_ADMIN, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Handle successful login
      console.log(response.data);
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      sessionStorage.setItem('admin',JSON.stringify(response.data));
      navigate('/admin');
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if(error.response) {
        message = `Error ${error.response.status}: ${error.response.data.message}`; 
      }
  
      toast({
        title: 'Login Failed',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  
      console.error(error);
  
    }
  };
  useEffect(() => {
    if(!error) return;
  
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);
  
    return () => clearTimeout(timer);
  
  }, [error]) 
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgImage="url('/admin.jpg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        width="400px"
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading mb={6}>Admin Login</Heading>
        <form onSubmit={handleLogin}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            _hover={{ bg: 'teal.500' }}
          >
            Login
          </Button>
          <Text mt={4} textAlign="center" color="gray.500">
            Forgot password? Contact the administrator.
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;