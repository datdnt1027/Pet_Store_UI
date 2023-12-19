import React, { useState } from 'react';
import { Box, Heading, Select, Input, Button, Grid, GridItem } from '@chakra-ui/react';
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
    <Box className="product-list-container" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        {cateName} Products
      </Heading>
      
      <Box mb={4}>
        <label htmlFor="numberOfItems">Items per page: </label>
        <Input
          type="number"
          id="numberOfItems"
          min="1"
          value={numberOfItemsToShow}
          onChange={handleNumberOfItemsChange}
          className="items-per-page-input"
        />
      </Box>

      <Box mb={4}>
        <label htmlFor="sortBy">Sort by: </label>
        <Select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </Select>
        <label htmlFor="sortOrder">Sort order: </label>
        <Select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {transitions((styles, product) => (
          <GridItem key={product.productId}>
            <Link to={`/detail/${product.productId}`} className="product-item-link">
              <animated.div style={styles} className="product-item">
                <Box className="product-image">
                  <img src={product.imageData} alt={product.productName} />
                </Box>
                <Box className="product-details">
                  <Heading as="h3" size="md" mb={2} className="product-name">
                    {product.productName}
                  </Heading>
                  <p className="product-price">${product.productPrice}</p>
                </Box>
              </animated.div>
            </Link>
          </GridItem>
        ))}
      </Grid>

      <Box className="pagination" mt={4}>
        <Button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          mr={2}
        >
          Previous
        </Button>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            className={`pagination-button ${pageNumber === currentPage + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(pageNumber - 1)}
            variant="outline"
            size="sm"
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          ml={2}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProductByCate;