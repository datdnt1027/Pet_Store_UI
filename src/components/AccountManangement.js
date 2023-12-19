import React, { useState } from 'react';
import { Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import apiConfig from '../config/apiConfig';
import axios from 'axios';

const AccountManagement = () => {
  const [searchInput, setSearchInput] = useState('');
  const [customerInfo, setCustomerInfo] = useState([]);
  const [error, setError] = useState('');
  const [isLocked, setIsLocked] = useState(false); 

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleLock = async () => {
    setIsLocked(prev => !prev); // Toggle locked state
    
    const payload = {
      customerId: customerInfo.customerId,
      status: isLocked ? "0" : "1"
    };

    console.log(payload);

    try {
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;

      const response = await axios.patch(apiConfig.LOCK_USER, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`  
        }
      });

      console.log('User locked/unlocked successfully');
      
      // Update the customer information state with the updated lock status
      setCustomerInfo(prevCustomerInfo => ({
        ...prevCustomerInfo,
        status: isLocked ? "False" : "True"
      }));
    } catch (error) {
      console.error('Error locking/unlocking user', error);
    }
  };

  const handleEmailSearch = async () => {
    try {
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;

      const response = await axios.post(apiConfig.SEARCH_USER, {
        email: searchInput,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      setCustomerInfo(response.data);
    } catch (error) {
      console.error('Error searching for user by email:', error);
    }
  };

  const handlePhoneSearch = async () => {
    try {
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;

      const response = await axios.post(apiConfig.SEARCH_USER, {
        phoneNumber: searchInput,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      setCustomerInfo(response.data);
    } catch (error) {
      setError('T');
      console.error('Error searching for user by phone number:', error);
    }
  };

  return (
    <Box p={4}>
      <Input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Enter email, contact."
        mb={4}
      />
      <HStack spacing={4} mb={4}>
        <Button onClick={handleEmailSearch} colorScheme="blue">Search by Email</Button>
        <Button onClick={handlePhoneSearch} colorScheme="blue">Search by Phone</Button>
      </HStack>
  
      {customerInfo.length !== 0 && (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Address</Th>
              <Th>Last Name</Th>
              <Th>First Name</Th>
              <Th>Phone Number</Th>
              <Th>Sex</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key={customerInfo.email}>
              <Td>
                <Image src={customerInfo.avatar} boxSize={10} borderRadius="full" />
             </Td>
              <Td>{customerInfo.address}</Td>
              <Td>{customerInfo.lastName}</Td>
              <Td>{customerInfo.firstName}</Td>
              <Td>{customerInfo.phoneNumber}</Td>
              <Td>{customerInfo.sex}</Td>
              <Td>{customerInfo.status}</Td>
              <Td>
                <Button
                  onClick={handleLock}
                  colorScheme={customerInfo.status === "False" ? 'green' : 'red'}
                >
                  {customerInfo.status === "False" ? "Unlock" : "Lock"}
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default AccountManagement;