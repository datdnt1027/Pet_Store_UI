import React, { useEffect, useState } from 'react';
import '../components/css/OrdersPage.css'
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const sampleOrders = [
    {
      id: 1,
      date: '2023-12-01',
      items: [
        { id: 1, name: 'Item 1', quantity: 2, price: 10.99 },
        { id: 2, name: 'Item 2', quantity: 1, price: 19.99 }
      ],
      shippingAddress: '123 Main St, City, State',
      status: 'Delivered'
    },
    {
      id: 2,
      date: '2023-11-28',
      items: [
        { id: 3, name: 'Item 3', quantity: 3, price: 9.99 },
        { id: 4, name: 'Item 4', quantity: 2, price: 14.99 }
      ],
      shippingAddress: '456 Elm St, City, State',
      status: 'Shipped'
    },
    {
        id: 4,
        date: '2023-11-23',
        status: 'Pending',
        shippingAddress: '321 Pine St, San Francisco, CA',
        items: [
          { id: 9, name: 'Product I', quantity: 2, price: 10 },
          { id: 10, name: 'Product J', quantity: 1, price: 15 },
        ],
      },
      {
        id: 5,
        date: '2023-11-20',
        status: 'Shipped',
        shippingAddress: '654 Cedar St, Seattle, WA',
        items: [
          { id: 11, name: 'Product K', quantity: 3, price: 12 },
          { id: 12, name: 'Product L', quantity: 1, price: 20 },
        ],
      },
      {
        id: 6,
        date: '2023-11-18',
        status: 'Delivered',
        shippingAddress: '987 Maple St, Miami, FL',
        items: [
          { id: 13, name: 'Product M', quantity: 2, price: 8 },
          { id: 14, name: 'Product N', quantity: 4, price: 18 },
          { id: 15, name: 'Product O', quantity: 3, price: 10 },
        ],
      },
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
    <div>
      <h1 className="orders-page">Orders Page</h1>
<div className="search-container">
  <input
    type="text"
    placeholder="Search by date or status"
    value={searchQuery}
    onChange={handleSearchInputChange}
  />
  <select value={sortOption} onChange={handleSortOptionChange}>
    <option value="">Sort by</option>
    <option value="dateAsc">Date (Oldest to Newest)</option>
    <option value="dateDesc">Date (Newest to Oldest)</option>
  </select>
</div>
<div className="order-list">
  {visibleOrdersData.map(order => (
    <div key={order.id} className="order-item">
      <div className="order-item-header">
        <h2>{order.date}</h2>
        <span>Status: {order.status}</span>
      </div>
      <div className="order-item-summary">
        <p>Quantity: {calculateOrderSummary(order.items).quantity}</p>
        <p>Total: {calculateOrderSummary(order.items).total}</p>
      </div>
      <div className="order-item-details">
      <p class="shipping-address">Shipping Address: {order.shippingAddress}</p>
        {/* Display individual order items */}
        {order.items.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
{hasMoreOrders && !showAllOrders && (
  <button className='see-more-button' onClick={handleSeeMore}>See More</button>
)}
{showAllOrders && (
  <button onClick={handleSeeLess}>See Less</button>
)}
    </div>
  );
};

export default OrdersPage;