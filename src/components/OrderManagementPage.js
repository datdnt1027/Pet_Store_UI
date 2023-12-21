import React, { useState, useEffect } from 'react';
import sampleOrder from '../data/sampleOrder';
import { Box, Button, Checkbox,Flex, Input, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import '../components/css/ProductsManager.css'
import PopupForm from '../components/PopupForm'
import apiConfig from '../config/apiConfig';
import axios from 'axios';
const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatuses, setFilterStatuses] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const authTokenString = sessionStorage.getItem('admin'); // Retrieve the token from localStorage
  const authToken = JSON.parse(authTokenString).token;
  console.log(authToken); // Replace with your actual auth token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
    const [selectedOrder, setSelectedOrder] = useState(null);
  
    const toggleForm = () => {
      setIsFormOpen(!isFormOpen);
    };
  
    const handleStatusFilter = (status) => {
      if (filterStatuses.includes(status)) {
        setFilterStatuses(filterStatuses.filter((s) => s !== status));
      } else {
        setFilterStatuses([...filterStatuses, status]);
      }
    };
  
    const handleClearStatusFilter = () => {
      setFilterStatuses([]);
    };
  
    // Fetch orders data (replace this with your own API call)
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get(apiConfig.ADMIN_ORDER, { headers });
        const data = response.data;
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };
  
    const handleDelete = (orderId) => {
      // Replace this with your own logic to delete the order
      // You can use the orderId to identify the order to be deleted
      console.log('Delete order with ID:', orderId);
  
      if (selectedOrderId === orderId) {
        setSelectedOrderId(null);
      }
    };
  
    const handleSort = (field) => {
      // Toggle the sort direction if the same field is clicked again
      const direction = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
      setSortBy(field);
      setSortDirection(direction);
    };
  
    const filteredOrders = orders.filter((order) => {
      const values = Object.values(order).map((value) => value.toString().toLowerCase());
      return (
        values.some((value) => value.includes(searchTerm.toLowerCase())) &&
        (filterStatuses.length === 0 || filterStatuses.includes(order.orderStatus))
      );
    });
  
    const statuses = [...new Set(orders.map((order) => order.orderStatus))];
  
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (sortBy) {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];
        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleItemsPerPageChange = (event) => {
      setItemsPerPage(parseInt(event.target.value));
    };
    const orderIds = [...new Set(orders.map((order) => order.orderStatus))];
    return (
      <Box id="order-management-container">
        <Text id="order-management-title" fontSize="xl" fontWeight="bold">
          Order Management
        </Text>
    
        <Box className="search-container" mt={4}>
          <Input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
    
        <Box className="status-filter" mt={4}>
  <Text htmlFor="status-filter">Filter by Status:</Text>
  <Flex alignItems="center">
    {orderIds.map((orderStatus) => (
      <Box key={orderStatus} display="flex" alignItems="center" mr={4}>
        <Checkbox
          id={`orderStatus-${orderStatus}`}
          className="orderStatus-checkbox"
          isChecked={filterStatuses.includes(orderStatus)}
          onChange={() => handleStatusFilter(orderStatus)}
        />
        <Text htmlFor={`category-${orderStatus}`}>{orderStatus}</Text>
      </Box>
    ))}
  </Flex>
  <Button id="clear-filter-button" onClick={handleClearStatusFilter} mt={2}>
    Clear Filter
  </Button>
</Box>
    
        <Table id="order-table" mt={4} variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort('orderId')}>
                Order ID {sortBy === 'orderId' && <Text as="span">{sortDirection === 'asc' ? '▲' : '▼'}</Text>}
              </Th>
              <Th onClick={() => handleSort('orderStatus')}>
                Order Status {sortBy === 'orderStatus' && <Text as="span">{sortDirection === 'asc' ? '▲' : '▼'}</Text>}
              </Th>
              <Th onClick={() => handleSort('paymentStatus')}>
                Payment Status {sortBy === 'paymentStatus' && <Text as="span">{sortDirection === 'asc' ? '▲' : '▼'}</Text>}
              </Th>
              <Th onClick={() => handleSort('customerEmail')}>
              User Email {sortBy === 'customerEmail' && <Text as="span">{sortDirection === 'asc' ? '▲' : '▼'}</Text>}
              </Th>
              <Th onClick={() => handleSort('expectedDeliveryStartDate')}>
                Create Date {sortBy === 'expectedDeliveryStartDate' && <Text as="span">{sortDirection === 'asc' ? '▲' : '▼'}</Text>}
              </Th>
              <Th onClick={() => handleSort('expectedDeliveryEndDate')}>
                Update Date {sortBy === 'expectedDeliveryEndDate' && <Text as="span">{sortDirection === 'asc' ? '▲' : '▼'}</Text>}
              </Th>
              
              
              
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((product) => (
              <Tr key={product.orderId}>
                <Td>{product.orderId}</Td>
                <Td>{product.orderStatus}</Td>
                <Td>{product.paymentStatus}</Td>
                <Td>{product.customerEmail}</Td>
                <Td>{product.expectedDeliveryStartDate}</Td>
                <Td>{product.expectedDeliveryEndDate}</Td>                
                <Td>
                  <Box>
                    <Button>Duyệt</Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
    
        <Box className="pagination-container" mt={4} display="flex" justifyContent="space-between">
          <Box className="pagination">
            {Array.from({ length: Math.ceil(sortedOrders.length / itemsPerPage) }).map((_, index) => (
              <Button
                key={index}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
          <Box className="items-per-page" display="flex" alignItems="center">
            <Text>Items per page:</Text>
            <Input type="number" min="1" value={itemsPerPage} onChange={handleItemsPerPageChange} placeholder="1" />
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default OrderManagementPage;