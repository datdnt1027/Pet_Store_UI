import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import './css/ProductList.css';

const ProductByCate = ({ products, cateName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('name');

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(products.length / numberOfItemsToShow);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * numberOfItemsToShow;
  const endIndex = startIndex + numberOfItemsToShow;
  const visibleProducts = products.slice(startIndex, endIndex);

  const transitions = useTransition(visibleProducts, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 20 },
  });

  const totalPages = Math.ceil(products.length / numberOfItemsToShow);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNumberOfItemsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setNumberOfItemsToShow(value);
      setCurrentPage(0);
    }
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortProducts = (products) => {
    if (sortBy === 'name') {
      return products.sort((a, b) => {
        const nameA = a.productName ? a.productName.toUpperCase() : '';
        const nameB = b.productName ? b.productName.toUpperCase() : '';
        if (nameA < nameB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (sortBy === 'price') {
      return products.sort((a, b) => {
        const priceA = a.productPrice ? parseFloat(a.productPrice) : 0;
        const priceB = b.productPrice ? parseFloat(b.productPrice) : 0;
        if (priceA < priceB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (priceA > priceB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return products;
  };

  const sortedProducts = sortProducts(products);

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">{cateName} Products</h1>
      
      <div className="items-per-page">
        <label htmlFor="numberOfItems">Items per page: </label>
        <input
          type="number"
          id="numberOfItems"
          min="1"
          value={numberOfItemsToShow}
          onChange={handleNumberOfItemsChange}
          className="items-per-page-input"
        />
      </div>

      <div className="sort-options">
        <label htmlFor="sortBy">Sort by: </label>
        <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <label htmlFor="sortOrder">Sort order: </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className="product-grid">
        {transitions((styles, product) => (
          <Link to={`/detail/${product.productId}`} key={product.productId} className="product-item-link">
            <animated.li style={styles} className="product-item">
              <div className="product-image">
                <img src={product.imageData} alt={product.productName} />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-price">${product.productPrice}</p>
              </div>
            </animated.li>
          </Link>
        ))}
      </ul>

      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            className={`pagination-button ${pageNumber === currentPage + 1 ? 'active' : ''}`}
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber - 1)}
          >
            {pageNumber}
          </button>
        ))}
        <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductByCate;