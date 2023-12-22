import React, { useEffect, useState } from 'react';
import {
  useToast,
  Table,
  Thead,
  Tbody,
  Select,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const StaffManagementPage = () => {
  const [staffData, setStaffData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
   const [isCreatingStaff, setIsCreatingStaff] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const authTokenString = sessionStorage.getItem('admin');
  const authToken = JSON.parse(authTokenString).token;
  const toast = useToast();
  
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
    fetchStaff();
    fetchRoles();
  }, []);
  const fetchRoles = async () => {
    axios
      .get(apiConfig.GET_ROLES, { headers })
      .then(response => {
        setRolesData(response.data);
      })
      .catch(error => {
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

        if (error.response.status === 403) {
          message = `Xin lỗi tài khoản này không có quyền.`;
        }
        if (error.response.status === 401) {
          message = `Vui lòng đăng nhập lại.`;
        }
        if (error.response.status === 409) {
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
  const fetchStaff = async () => {
    axios
      .get(apiConfig.GET_STAFF, { headers })
      .then(response => {
        setStaffData(response.data);
      })
      .catch(error => {
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

        if (error.response.status === 403) {
          message = `Xin lỗi tài khoản này không có quyền.`;
        }
        if (error.response.status === 401) {
          message = `Vui lòng đăng nhập lại.`;
        }
        if (error.response.status === 409) {
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewStaffData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send new staff data to the API using Axios
    axios
      .post(apiConfig.CREATE_SALE, newStaffData, { headers })
      .then(response => {
        // Handle success response
        toast({
          title: 'Thông báo',
          description: 'Tạo thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

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
        fetchStaff();
      })
      .catch(error => {
        // Handle error response
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

        if (error.response.status === 403) {
          message = `Xin lỗi tài khoản này không có quyền.`;
        }
        if (error.response.status === 401) {
          message = `Vui lòng đăng nhập lại.`;
        }
        if (error.response.status === 409) {
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
      fetchStaff();
    } else {
      // Filter staffData based on the search query
      const filteredData = staffData.filter(staff => {
        const fullName = `${staff.firstName} ${staff.lastName}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });

      setStaffData(filteredData);
    }
  };

  return (
    <Box>
      <Stack direction="row" mb={4}>
        <FormControl>
          <Input
            type="text"
            placeholder="Search staff"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </FormControl>
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={() => setIsCreatingStaff(true)}
        >
          Add Staff
        </Button>
      </Stack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>User ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staffData.map(staff => (
            <Tr key={staff.id}>
              <Td>{staff.firstName}</Td>
              <Td>{staff.lastName}</Td>
              <Td>{staff.email}</Td>
              <Td>{staff.userId}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isCreatingStaff} onClose={() => setIsCreatingStaff(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
            <FormControl>
  <FormLabel>User Role</FormLabel>
  <Select
    name="userRoleId"
    value={newStaffData.userRoleId}
    onChange={handleInputChange}
    placeholder="Select a role"
  >
    {rolesData.map(role => (
      <option key={role.userRoleId} value={role.userRoleId}>
        {role.userRoleName}
      </option>
    ))}
  </Select>
</FormControl>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={newStaffData.firstName}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={newStaffData.lastName}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
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
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StaffManagementPage;