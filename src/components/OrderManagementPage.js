import React, { useState, useEffect } from 'react';
import sampleOrder from '../data/sampleOrder';
import '../components/css/ProductsManager.css'
import PopupForm from '../components/PopupForm'
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
      // Replace this with your own API endpoint to fetch the orders
      // const response = await fetch('https://api.example.com/orders');
      // const data = await response.json();
      setOrders(sampleOrder);
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
  
    return (
        <div id="order-management-container">
        <h1 id="order-management-title">Order Management</h1>
      
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Search orders..."
            value=""
          />
        </div>
      
        <div className="status-filter">
          <label htmlFor="status-filter">Filter by Status:</label>
      
          <div>
            <input type="checkbox" id="Pending" name="Pending" checked="" />
            <label htmlFor="Pending">Pending</label>
          </div>
      
          <div>
            <input type="checkbox" id="Processing" name="Processing" checked="" />
            <label htmlFor="Processing">Processing</label>
          </div>
      
          <div>
            <input type="checkbox" id="Completed" name="Completed" checked="" />
            <label htmlFor="Completed">Completed</label>
          </div>
      
          <button id="clear-filter-button">Clear Filter</button>
        </div>
      
        <table id="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Create Date</th>
              <th>Update Date</th>
              <th>Customer ID</th>
              <th>Order Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map((product) => (
        <tr key={product.orderId}>
          <td>{product.create_date}</td>
          <td>{product.update_date}</td>
          <td>{product.customerID}</td>
          <td>{product.orderStatus}</td>
          <td>
              <div>
                <button >Edit</button>
                {isFormOpen && <PopupForm onClose={toggleForm} product={selectedOrder} />}
              </div>
              <div>
                <button onClick={() => handleDelete(product.orderId)}>Delete</button>
              </div>
          </td>
        </tr>
      ))}
          </tbody>
        </table>
      
        <div className="pagination-container">
          <div className="pagination-info">
            Showing 1 to 5 of 10 orders
          </div>
          <div className="pagination">
            <button className="active">1</button>
            <button>2</button>
          </div>
          <div className="items-per-page">
            <span>Items per page:</span>
            <select>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      
        <div id="popup-form"></div>
      </div>
    );
  };
  
  export default OrderManagementPage;