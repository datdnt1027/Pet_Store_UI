import React, { useState } from 'react';
import apiConfig from '../config/apiConfig';
import axios from 'axios';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const AccountManagement = () => {
  const [searchInput, setSearchInput] = useState('');
  const [customerInfo, setCustomerInfo] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

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

      // Update the customer information state with the search results
      setCustomerInfo(response.data);
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
      console.error('Error searching for user by phone number:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Enter user name, email, contact, address, first name, or last name"
      />
      <button onClick={handleEmailSearch}>Search by Email</button>
      <button onClick={handlePhoneSearch}>Search by Phone</button>

      {customerInfo.length > 0 && (
        <Table>
          <Thead>
            <Tr>
              <Th>userId</Th>
              <Th>email</Th>
              <Th>create_date</Th>
              <Th>update_date</Th>
              <Th>birth</Th>
              <Th>contact</Th>
              <Th>address</Th>
              <Th>avatar</Th>
              <Th>firstName</Th>
              <Th>lastName</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerInfo.map((customer) => (
              <Tr key={customer.userId}>
                <Td>{customer.userId}</Td>
                <Td>{customer.email}</Td>
                <Td>{customer.create_date}</Td>
                <Td>{customer.update_date}</Td>
                <Td>{customer.birth}</Td>
                <Td>{customer.contact}</Td>
                <Td>{customer.address}</Td>
                <Td>
                  <img src={customer.avatar} alt="Avatar" />
                </Td>
                <Td>{customer.firstName}</Td>
                <Td>{customer.lastName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      )}
    </div>
  );
};

export default AccountManagement;