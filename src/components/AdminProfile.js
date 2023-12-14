import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const AdminProfilePage = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('/api/admin/profile');
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Box p={4}>
      <Flex direction="column" align="center" maxW="md" mx="auto">
        <Heading mb={4}>Admin Profile</Heading>
        {adminData ? (
          <Box borderWidth={1} p={4} borderRadius="md">
            <Text fontWeight="bold">Name:</Text>
            <Text>{adminData.name}</Text>
            <Text fontWeight="bold" mt={2}>Email:</Text>
            <Text>{adminData.email}</Text>
            <Text fontWeight="bold" mt={2}>Role:</Text>
            <Text>{adminData.role}</Text>
          </Box>
        ) : (
          <Text>Loading admin data...</Text>
        )}
      </Flex>
    </Box>
  );
};

export default AdminProfilePage;