import React, { useState } from 'react';

const AccountManagement = () => {
  const [searchInput, setSearchInput] = useState('');
  const [customerInfo, setCustomerInfo] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    // Perform the search (e.g., make an API call to fetch customer information)
    // Replace the following code with your actual implementation
    // You can use any method to fetch customer information (e.g., Axios, fetch)

    // Example customer information
    const customerData = [
      {
        userId: '123',
        email: 'example1@example.com',
        create_date: '2021-01-01',
        update_date: '2021-02-01',
        birth: '1990-01-01',
        contact: '1234567890',
        address: '123 Street, City',
        avatar: 'https://example.com/avatar1.png',
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        userId: '456',
        email: 'example2@example.com',
        create_date: '2021-03-01',
        update_date: '2021-04-01',
        birth: '1995-01-01',
        contact: '9876543210',
        address: '456 Street, City',
        avatar: 'https://example.com/avatar2.png',
        firstName: 'Jane',
        lastName: 'Smith',
      },
      // Add more customer data as needed
    ];

    // Filter the customer data based on the search input
    const filteredData = customerData.filter(
      (customer) =>
        customer.userId === searchInput ||
        customer.email === searchInput ||
        customer.contact === searchInput ||
        customer.address === searchInput ||
        customer.firstName === searchInput ||
        customer.lastName === searchInput
    );

    // Update the customer information state
    setCustomerInfo(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Enter user name, email, contact, address, first name, or last name"
      />
      <button onClick={handleSearch}>Search</button>

      {customerInfo.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>userId</th>
              <th>email</th>
              <th>create_date</th>
              <th>update_date</th>
              <th>birth</th>
              <th>contact</th>
              <th>address</th>
              <th>avatar</th>
              <th>firstName</th>
              <th>lastName</th>
            </tr>
          </thead>
          <tbody>
            {customerInfo.map((customer) => (
              <tr key={customer.userId}>
                <td>{customer.userId}</td>
                <td>{customer.email}</td>
                <td>{customer.create_date}</td>
                <td>{customer.update_date}</td>
                <td>{customer.birth}</td>
                <td>{customer.contact}</td>
                <td>{customer.address}</td>
                <td>
                  <img src={customer.avatar} alt="Avatar" />
                </td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountManagement;