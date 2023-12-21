import React, { useEffect, useState } from 'react';
import {useToast, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const StaffManagementPage = () => {
    const [staffData, setStaffData] = useState([]);
    const [isCreatingStaff, setIsCreatingStaff] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const authTokenString = sessionStorage.getItem('admin');
    const authToken = JSON.parse(authTokenString).token;
    const toast = useToast();
  console.log(authToken); // Replace with your actual auth token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  const [newStaffData, setNewStaffData] = useState({
    userRoleId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Fetch staff data from API using Axios
    axios.get(apiConfig.GET_STAFF, {headers})
      .then(response => {
        setStaffData(response.data);
      })
      .catch(error => {
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
      });
  }, []);
  console.log(staffData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaffData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send new staff data to the API using Axios
    axios.post(apiConfig.CREATE_SALE, newStaffData,{headers})
      .then(response => {
        // Handle success response
        console.log('New staff created:', response.data);
        
        // Reset the form and close the overlay
        setNewStaffData({
          userRoleId: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setIsCreatingStaff(false);
        toast({
            title: 'Thêm Nhân viên',
            description: 'Thành công.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
      })
      .catch(error => {
        // Handle error response
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
      });
  };
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, reset staffData to original data
      axios.get(apiConfig.GET_STAFF, { headers })
        .then(response => {
          setStaffData(response.data);
        })
        .catch(error => {
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
        });
    } else {
      // Filter staffData based on the search query
      const filteredData = staffData.filter(staff => {
        const fullName = `${staff.firstName} ${staff.lastName}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });
  
      setStaffData(filteredData);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>LastName</Th>
            <Th>FirstName</Th>
            <Th>Email</Th>
            
          </Tr>
        </Thead>
        <Tbody>
          {staffData.map(staff => (
            <Tr key={staff.userId}>
              <Td>{staff.userId}</Td>
              <Td>{staff.lastName}</Td>
              <Td>{staff.firstName}</Td>
              <Td>{staff.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <FormControl>
        <FormLabel>Search</FormLabel>
        <Input
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Enter a name"
        />
        <Button mt={2} onClick={handleSearch}>Search</Button>
      </FormControl>
      <Button onClick={() => setIsCreatingStaff(true)}>Create Staff</Button>

      <Modal isOpen={isCreatingStaff} onClose={() => setIsCreatingStaff(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>User Role ID</FormLabel>
              <Input
                name="userRoleId"
                value={newStaffData.userRoleId}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={newStaffData.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={newStaffData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={newStaffData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={newStaffData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={newStaffData.confirmPassword}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button variant="ghost" onClick={() => setIsCreatingStaff(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StaffManagementPage;