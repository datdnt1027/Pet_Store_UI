import React from 'react';
import '../components/css/VerifySuccessfulPage.css';
import endpoints from '../config/apiConfig';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import axios from 'axios';

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const VerifySuccessfulPage = () => {
  const { token } = useParams();
  console.log(token);
  const toast = useToast();
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