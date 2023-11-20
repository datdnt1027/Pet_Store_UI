import React, { useState, useEffect } from 'react';
import sampleData from '../data/sampleData';
import '../components/css/ProductsManager.css'
import PopupForm from '../components/PopupForm'
const ProductManagementPage = () => {
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
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  const handleEdit = (productId) => {
    const product = products.find((product) => product.pet_product_id === productId);
    setSelectedProduct(product);
    toggleForm();
  };
  const handleClearStatusFilter = () => {
    setFilterStatuses([]);
  };
  // Fetch products data (you can replace this with your own API call)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Replace this with your own API endpoint to fetch the products
    // const response = await fetch('https://api.example.com/products');
    // const data = await response.json();
    setProducts(sampleData);
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
    // Toggle the sort direction if the same field is clicked again
    const direction = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
  };
  const handleCheckAll = () => {
    setFilterCategoryIds([]); // Clear the filterCategoryIds state to decheck all checkboxes
  };
  const handleFilter = (categoryId) => {
    if (filterCategoryIds.includes(categoryId)) {
      setFilterCategoryIds(filterCategoryIds.filter((id) => id !== categoryId));
    } else {
      setFilterCategoryIds([...filterCategoryIds, categoryId]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const values = Object.values(product).map((value) => value.toString().toLowerCase());
    return (
      values.some((value) => value.includes(searchTerm.toLowerCase())) &&
      (filterCategoryIds.length === 0 || filterCategoryIds.includes(product.product_category_id)) && (filterStatuses.length === 0 || filterStatuses.includes(product.status))
    );
  });
  const statuses = [...new Set(products.map((product) => product.status))];
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
  };
  // Get unique category IDs from the products
  const categoryIds = [...new Set(products.map((product) => product.product_category_id))];

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
        <label htmlFor={`category-${categoryId}`}>{categoryId}</label>
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
    {isFormOpen && <PopupForm onClose={toggleForm} />}
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
        <th onClick={() => handleSort('product_name')}>
          Name {sortBy === 'product_name' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('retail_price')}>
          Price {sortBy === 'retail_price' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('product_code')}>
          Code {sortBy === 'product_code' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('product_detail')}>
          Detail {sortBy === 'product_detail' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('product_category_id')}>
          Category ID {sortBy === 'product_category_id' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('quantity_on_hand')}>
          Quantity {sortBy === 'quantity_on_hand' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('vendor_price')}>
          Vendor Price {sortBy === 'vendor_price' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('discount')}>
          Discount {sortBy === 'discount' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('vendor_id')}>
          Vendor ID {sortBy === 'vendor_id' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('status')}>
          Status {sortBy === 'status' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th onClick={() => handleSort('user_id')}>
          User ID {sortBy === 'user_id' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
        </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((product) => (
        <tr key={product.pet_product_id}>
          <td>{product.product_name}</td>
          <td>{product.retail_price}</td>
          <td>{product.product_code}</td>
          <td>{product.product_detail}</td>
          <td>{product.product_category_id}</td>
          <td>{product.quantity_on_hand}</td>
          <td>{product.vendor_price}</td>
          <td>{product.discount}</td>
          <td>{product.vendor_id}</td>
          <td>{product.status}</td>
          <td>{product.user_id}</td>
          <td>
              <div>
                <button onClick={() => handleEdit(product.pet_product_id)}>Edit</button>
                {isFormOpen && <PopupForm onClose={toggleForm} product={selectedProduct} />}
              </div>
              <div>
                <button onClick={() => handleDelete(product.pet_product_id)}>Delete</button>
              </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="pagination">
        {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }).map((_, index) => (
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