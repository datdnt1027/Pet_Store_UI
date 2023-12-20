import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    products:[]
  });

  useEffect(() => {
    axios
      .get(apiConfig.CATE)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleClose = () => {
    setIsCreating(false);
    setNewCategory({ categoryName: '', productCount: 0 });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const authTokenString = sessionStorage.getItem('admin');
    const authToken = JSON.parse(authTokenString).token;
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    console.log(JSON.stringify(newCategory));
    try {
      const response = await axios.post(apiConfig.ADMIN_CATE, JSON.stringify(newCategory),config);
      // Handle the response or perform any additional logic here
      console.log('New category created:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="md">Category Management</Heading>
        <Button colorScheme="teal" size="sm" onClick={handleCreate}>
          Create Category
        </Button>
      </Box>
      <Table variant="simple" colorScheme="teal" mt={4}>
        <TableCaption>Manage your categories</TableCaption>
        <Thead>
          <Tr>
            <Th>Category ID</Th>
            <Th>Category Name</Th>
            <Th>Product Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map(category => (
            <Tr key={category.categoryId}>
              <Td>{category.categoryId}</Td>
              <Td>{category.categoryName}</Td>
              <Td>{category.productCount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isCreating} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Create Category</ModalHeader>
            <ModalBody>
              <FormControl id="categoryName" mb={4}>
                <FormLabel>Category Name</FormLabel>
                <Input
                  type="text"
                  name="categoryName"
                  value={newCategory.categoryName}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" type="submit">
                Create
              </Button>
              <Button ml={2} onClick={handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoryManagementPage;