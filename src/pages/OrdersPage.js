import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Select, Text, Image,useToast } from '@chakra-ui/react';
import '../components/css/OrdersPage.css';
import apiConfig from '../config/apiConfig';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const toast = useToast();
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const sampleOrders = [
    {
      id: 1,
      date: '2021-12-01',
      status: 'Completed',
      shippingAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: 1,
          name: 'Product A',
          quantity: 2,
          price: 9.99
        },
        {
          id: 2,
          name: 'Product B',
          quantity: 1,
          price: 14.99
        }
      ]
    },
    {
      id: 2,
      date: '2021-11-25',
      status: 'Pending',
      shippingAddress: '456 Elm St, Othertown, USA',
      items: [
        {
          id: 3,
          name: 'Product C',
          quantity: 3,
          price: 7.99
        }
      ]
    },
    // Add more sample orders as needed
  ];
  const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
  const authToken = JSON.parse(authTokenString).token;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(apiConfig.USER_ORDER + '?page=1', { headers });
      const data = await response.data;
      const transformedData = transformOrdersData(data); // Transform the response data
      setOrders(transformedData);
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

  const transformOrdersData = (data) => {
    return data.map((order) => ({
      id: order.orderDate,
      date: new Date(order.orderDate).toLocaleDateString(),
      status: order.paymentType ? 'Completed' : 'Pending',
      shippingAddress: '', // Add the shipping address from the response if available
      items: order.orders.map((orderItem) => ({
        id: orderItem.orderProductId,
        name: orderItem.product.productName,
        quantity: orderItem.quantity,
        price: orderItem.product.productPrice,
        img: orderItem.product.imageData
      })),
    }));
  };

  const handleSeeMore = () => {
    setVisibleOrders((prevVisibleOrders) => prevVisibleOrders + 3);
  };

  const handleSeeLess = () => {
    setVisibleOrders(3);
    setShowAllOrders(false);
  };

  const calculateOrderSummary = (items) => {
    if (!items || items.length === 0) {
      return { quantity: 0, total: 0 };
    }

    const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    return { quantity, total };
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.date.includes(searchQuery) || order.status.includes(searchQuery)
  );

  const handleSortOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
  
    let sortedOrders = [];
  
    if (selectedOption === 'dateAsc') {
      sortedOrders = [...filteredOrders].sort((a, b) => a.date.localeCompare(b.date));
    } else if (selectedOption === 'dateDesc') {
      sortedOrders = [...filteredOrders].sort((a, b) => b.date.localeCompare(a.date));
    } else if (selectedOption === 'priceAsc') {
      sortedOrders = [...filteredOrders].sort((a, b) =>
        calculateOrderSummary(a.items).total - calculateOrderSummary(b.items).total
      );
    } else if (selectedOption === 'priceDesc') {
      sortedOrders = [...filteredOrders].sort((a, b) =>
        calculateOrderSummary(b.items).total - calculateOrderSummary(a.items).total
      );
    }
  
    setOrders(sortedOrders);
  };

  let sortedOrders = filteredOrders;

  if (sortOption === 'dateAsc') {
    sortedOrders = filteredOrders.slice().sort((a, b) => a.date.localeCompare(b.date));
  } else if (sortOption === 'dateDesc') {
    sortedOrders = filteredOrders.slice().sort((a, b) => b.date.localeCompare(a.date));
  }

  const visibleOrdersData = showAllOrders ? sortedOrders : sortedOrders.slice(0, visibleOrders);
  const hasMoreOrders = sortedOrders.length > visibleOrders;

  return (
    <Box className="orders-page-container">
      <Text className="orders-page-heading" as="h1" fontSize="2xl" mb="4">
        Orders Page
      </Text>
      <Box className="search-container" mb="4">
        <Select value={sortOption} onChange={handleSortOptionChange} w="40%">
          <option value="">Sort by</option>
          <option value="dateAsc">Date (Oldest to Newest)</option>
          <option value="dateDesc">Date (Newest to Oldest)</option>
          <option value="priceAsc">Total Price (Lowest to Highest)</option>
          <option value="priceDesc">Total Price (Highest to Lowest)</option>
        </Select>
      </Box>
      <Box className="orders-container">
        {visibleOrdersData.map((order) => (
          <Box key={order.id} className="order-card" p="4" borderWidth="1px" borderRadius="md" mb="4">
            <Text className="order-card-header" as="h2" fontSize="xl" mb="2">
              Order #{order.id}
            </Text>
            <Text>
              <strong>Date:</strong> {order.date}
            </Text>
            <Text>
              <strong>Status:</strong> {order.status}
            </Text>
            <Text>
              <strong>Shipping Address:</strong> {order.shippingAddress}
            </Text>
            <Box className="order-items" mt="4">
              <Text as="h3" fontSize="lg" mb="2">
                Items:
              </Text>
              {order.items.map((item) => (
                <Box key={item.id} className="item-card" p="2" borderWidth="1px" borderRadius="md" mb="2">
                  <Image src={item.img} width="50px" alt={item.name} mr="2"/>
                  <Text>
                    <strong>Name:</strong> {item.name}
                  </Text>
                  <Text>
                    <strong>Quantity:</strong> {item.quantity}
                  </Text>
                  <Text>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </Text>
                </Box>
              ))}
              <Text className="order-summary" mt="2">
                <strong>Order Summary:</strong> Quantity: {calculateOrderSummary(order.items).quantity}, Total:{' '}
                {calculateOrderSummary(order.items).total.toFixed(2)}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
      {hasMoreOrders && !showAllOrders && (
        <Button className="see-more-button" onClick={handleSeeMore} size="md">
          See More
        </Button>
      )}
      {showAllOrders && (
        <Button className="see-less-button" onClick={handleSeeLess} size="md">
          See Less
        </Button>
      )}
    </Box>
  );
};

export default OrdersPage;