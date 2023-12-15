import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Select, Text } from '@chakra-ui/react';
import '../components/css/OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Simulating API call
      // const response = await fetch('your-api-url');
      // const data = await response.json();
      setOrders(sampleOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSeeMore = () => {
    setVisibleOrders(prevVisibleOrders => prevVisibleOrders + 3);
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

  const filteredOrders = orders.filter(order =>
    order.date.includes(searchQuery) || order.status.includes(searchQuery)
  );

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
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
      <Text className="orders-page-heading" as="h1">
        Orders Page
      </Text>
      <Box className="search-container">
        <Input
          type="text"
          placeholder="Search by date or status"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Select value={sortOption} onChange={handleSortOptionChange}>
          <option value="">Sort by</option>
          <option value="dateAsc">Date (Oldest to Newest)</option>
          <option value="dateDesc">Date (Newest to Oldest)</option>
        </Select>
      </Box>
      <Box className="order-list">
        {visibleOrdersData.map(order => (
          <Box key={order.id} className="order-item">
            <Box className="order-item-header">
              <Text className="order-date" as="h2">
                {order.date}
              </Text>
              <Text className={`order-status ${order.status.toLowerCase()}`} as="span">
                {order.status}
              </Text>
            </Box>
            <Box className="order-item-details">
              <Box className="order-summary">
                <Text className="summary-label" as="p">
                  Quantity:
                </Text>
                <Text className="summary-value" as="p">
                  {calculateOrderSummary(order.items).quantity}
                </Text>
                <Text className="summary-label" as="p">
                  Total:
                </Text>
                <Text className="summary-value" as="p">
                  ${calculateOrderSummary(order.items).total.toFixed(2)}
                </Text>
              </Box>
              <Box className="shipping-details">
                <Text className="shipping-address-heading" as="h3">
                  Shipping Address:
                </Text>
                <Text className="shipping-address-value" as="p">
                  {order.shippingAddress}
                </Text>
              </Box>
              <Box className="order-items-list">
                <Text className="order-items-heading" as="h3">
                  Order Items:
                </Text>
                {order.items.map(item => (
                  <Box key={item.id} className="order-item-details">
                    <Text className="item-name" as="p">
                      {item.name}
                    </Text>
                    <Text className="item-quantity" as="p">
                      Quantity: {item.quantity}
                    </Text>
                    <Text className="item-price" as="p">
                      Price: ${item.price.toFixed(2)}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {hasMoreOrders && !showAllOrders && (
        <Button className="see-more-button" onClick={handleSeeMore}>
          See More
        </Button>
      )}
      {showAllOrders && (
        <Button className="see-less-button" onClick={handleSeeLess}>
          See Less
        </Button>
      )}
    </Box>
  );
};

export default OrdersPage;