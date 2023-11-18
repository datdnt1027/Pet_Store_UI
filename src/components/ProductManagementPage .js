import React, { useState, useEffect } from 'react';
import sampleData from '../data/sampleData';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

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
  };

  const handleSort = (field) => {
    // Toggle the sort direction if the same field is clicked again
    const direction = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
  };

  const filteredProducts = products.filter((product) => {
    const values = Object.values(product).map((value) => value.toString().toLowerCase());
    return values.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy) {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <h1>Product Management</h1>

      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('product_name')}>
              Name {sortBy === 'product_name' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('retail_price')}>
              Price {sortBy === 'retail_price' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </th>
            {/* Add table headers for other properties */}
            <th>Code</th>
            <th>Detail</th>
            <th>Category ID</th>
            <th>Quantity</th>
            <th>Vendor Price</th>
            <th>Discount</th>
            <th>Vendor ID</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.pet_product_id}>
              <td>{product.product_name}</td>
              <td>{product.retail_price}</td>
              {/* Render other properties */}
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
                <button onClick={() => handleDelete(product.pet_product_id)}>Delete</button>
                {/* Add edit button and functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add add product form and functionality here */}
    </div>
  );
};

export default ProductManagementPage;