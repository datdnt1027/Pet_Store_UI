import React, { useState, useEffect } from 'react';
import sampleData from '../data/sampleData';
import '../components/css/ProductsManager.css'
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import CreateForm from '../components/CreateForm'
import EditForm from '../components/EditForm'
import axios from 'axios';
import apiConfig from '../config/apiConfig';


const ProductManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterCategoryIds, setFilterCategoryIds] = useState([]);
  const [filterStatuses, setFilterStatuses] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const sortProducts = (field, direction) => {
    setSortBy(field);
    setSortDirection(direction);
  };
  const handleStatusFilter = (status) => {
    if (filterStatuses.includes(status)) {
      setFilterStatuses(filterStatuses.filter((s) => s !== status));
    } else {
      setFilterStatuses([...filterStatuses, status]);
    }
  };
  const handleEdit = (productId) => {
    const product = products.find((product) => product.productId === productId);
    setSelectedProductForEdit(product);
    setIsEditFormOpen(true);
  };
  const handleClearStatusFilter = () => {
    setFilterStatuses([]);
  };
  // Fetch products data (you can replace this with your own API call)
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    // Make an API call to fetch the products
    try {
      const response = await fetch('https://localhost:7206/collections/products?page=1');
      const data = await response.json();
      console.log(data);
      setProducts(data);
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
  console.log(categories);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiConfig.CATE);
      console.log('Fetched');
      setCategories(response.data);
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
  const handleDelete = (productId) => {
    // Replace this with your own logic to delete the product
    // You can use the productId to identify the product to be deleted
    console.log('Delete product with ID:', productId);

    if (selectedProductId === productId) {
      setSelectedProductId(null);
    }
  };

  const handleSort = (field) => {
    const direction = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    sortProducts(field, direction);
  };
  const handleCheckAll = () => {
    setFilterCategoryIds([]); // Clear the filterCategoryIds state to decheck all checkboxes
  };
  const handleFilter = (categoryId) => {
    //console.log(categoryId)
    if (filterCategoryIds.includes(categoryId)) {
      setFilterCategoryIds(filterCategoryIds.filter((id) => id !== categoryId));
    } else {
      setFilterCategoryIds([...filterCategoryIds, categoryId]);
    }
  };

  const filterProducts = (searchTerm, categoryIds, statuses) => {
    setSearchTerm(searchTerm);
    setFilterCategoryIds(categoryIds);
    setFilterStatuses(statuses);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredProducts = products.filter((product) => {
    const values = Object.values(product).map((value) =>
      value.toString().toLowerCase()
    );
    return (
      values.some((value) => value.includes(searchTerm.toLowerCase())) &&
      (filterCategoryIds.length === 0 ||
        filterCategoryIds.includes(product.categoryId)) &&
      (filterStatuses.length === 0 || filterStatuses.includes(product.status))
    );
  });
  const statuses = [...new Set(products.map((product) => product.status))];
  const sortedAndFilteredProducts = filteredProducts
    .sort((a, b) => {
      if (sortBy) {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];
        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const currentItems = sortedAndFilteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
  };
  // Get unique category IDs from the products
  const categoryIds = [...new Set(products.map((product) => product.categoryId))];

  return (
    <div id="product-management-container">
      <h1 id="product-management-title">Product Management</h1>

      <div className="search-container">
        <input
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="category-filter">
        <label htmlFor="category-filter">Filter by Category ID:</label>
        {categoryIds.map((categoryId) => (
          <div key={categoryId}>
            <input
              type="checkbox"
              id={`category-${categoryId}`}
              className="category-checkbox"
              checked={filterCategoryIds.includes(categoryId)}
              onChange={() => handleFilter(categoryId)}
            />
           <label htmlFor={`category-${categoryId}`}>
  {categories.find(category => category.categoryId === categoryId)?.categoryName || '-'}
</label>
          </div>
        ))}
        <button id="decheck-all-btn" className="filter-button" onClick={handleCheckAll}>Decheck All</button>

      </div>

      <div className="status-filter">
        <label htmlFor="status-filter">Filter by Status:</label>

        {statuses.map((status) => (
          <div key={status}>
            <input
              type="checkbox"
              id={`status-${status}`}
              className="status-checkbox"
              checked={filterStatuses.includes(status)}
              onChange={() => handleStatusFilter(status)}
            />
            <label htmlFor={`status-${status}`}>{status}</label>
          </div>
        ))}
        <button id="clear-status-btn" className="filter-button" onClick={handleClearStatusFilter}>Clear</button>
      </div>
      <div>
        <button id="add-btn" className="filter-button" onClick={toggleForm}>Create</button>
        {isFormOpen && <CreateForm onClose={toggleForm} />}
      </div>
      <div className="items-per-page">
        <span>Items Per Page:</span>
        <input
          type="number"
          min="1"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
      </div>


      <table id="product-table" className="product-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('productName')} className={sortBy === 'productName' ? sortDirection : ''}>
              Product Name
            </th>
            <th onClick={() => handleSort('productPrice')} className={sortBy === 'productPrice' ? sortDirection : ''}>
              Price
            </th>
            <th onClick={() => handleSort('productDetail')} className={sortBy === 'productDetail' ? sortDirection : ''}>
              Detail
            </th>
            <th onClick={() => handleSort('productQuantity')} className={sortBy === 'productQuantity' ? sortDirection : ''}>
              Quantity
            </th>
            <th>Image</th>
            <th>Category</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredProducts.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productDetail}</td>
              <td>{product.productQuantity}</td>
              <td>
                {product.imageData && (
                  <img src={product.imageData} alt="Product" />
                )}
              </td>
              <td>
                {categories.find(category => category.categoryId === product.categoryId)?.categoryName}
              </td>
              <td>{product.createdDateTime}</td>
              <td>{product.updatedDateTime}</td>
              <td>
                <div>
                  <div>
                    <button onClick={() => handleEdit(product.productId)}>Edit</button>
                    {isEditFormOpen && selectedProductForEdit && selectedProductForEdit.productId === product.productId && (
                      <EditForm product={selectedProductForEdit} onClose={() => setIsEditFormOpen(false)} />
                    )}
                  </div>

                </div>
                {/* <div>
                  <button onClick={() => handleDelete(product.productId)}>Delete</button>
                </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;