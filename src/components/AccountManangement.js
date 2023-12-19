import React, { useState } from 'react';
import {Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
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

    // Toggle locked state
    setIsLocked(prev => !prev);
  
    try {
  
      // Get auth token
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;
  
      // API endpoint
      const url = `${apiConfig.LOCK_USER}/${customerInfo.id}`; 
  
      // Make request
      const response = await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`  
        }
      });
  
      // Handle success
      console.log('User locked/unlocked successfully');
  
    } catch (error) {
  
      // Handle error
      console.error('Error locking/unlocking user', error);
  
    }
  
  }
  const handleEmailSearch = async () => {
    try {
      // Get your authentication token from sessionStorage
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;

      // Make an HTTP POST request to search for the user by email
      const response = await axios.post(apiConfig.SEARCH_USER, {
        email: searchInput,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      // Update the customer information state with the search results
      
      setCustomerInfo(response.data);
      console.log(customerInfo.length);
    } catch (error) {
      console.error('Error searching for user by email:', error);
    }
  };

  const handlePhoneSearch = async () => {
    try {
      // Get your authentication token from sessionStorage
      const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;

      // Make an HTTP POST request to search for the user by phone number
      const response = await axios.post(apiConfig.SEARCH_USER, {
        phoneNumber: searchInput,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Update the customer information state with the search results
      setCustomerInfo(response.data);
    } catch (error) {
      setError('T')
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
                <Button onClick={handleLock} colorScheme={isLocked ? 'red' : 'green'}>
                  {isLocked ? 'Unlock' : 'Lock'}
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