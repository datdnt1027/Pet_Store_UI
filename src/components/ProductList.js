import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import './css/ProductList.css';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  console.log(products);
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
        const nameA = a.productName.toUpperCase();
        const nameB = b.productName.toUpperCase();
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
        const priceA = parseFloat(a.productPrice);
        const priceB = parseFloat(b.productPrice);
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
      <h1 className="product-list-title">Products</h1>
      
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

            <ul className="grid grid-cols-4 gap-[20px]">
                {transitions((styles, product) => (
                    <animated.li style={styles}>
                        <ProductItem product={product} isNew={false} />
                    </animated.li>
                ))}
            </ul>
{ products.length > 0 ? (
            <div className="flex items-center py-[20px] justify-center">
                <button
                    style={{
                        backgroundColor: "#fff",
                        border: "1px solid #fdd444",
                        borderRadius: "6px",
                        color: "#fdd444"
                    }}
                    className="pagination-button font-[500]"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}>
                    Previous
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        style={{
                            backgroundColor: `${pageNumber === currentPage + 1 ? '#fdd444' : '#fff'}`,
                            border: "1px solid #fdd444",
                            borderRadius: "6px",
                            color: `${pageNumber === currentPage + 1 ? '#fff' : '#fdd444'}`
                        }}
                        className={`pagination-button font-[500] ${pageNumber === currentPage + 1 ? 'active' : ''}`}
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber - 1)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    style={{
                        backgroundColor: "#fff",
                        border: "1px solid #fdd444",
                        borderRadius: "6px",
                        color: "#fdd444"
                    }}
                    className="pagination-button font-[500]"
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>) : null
            }
        </div>
    );
};

export default ProductList;