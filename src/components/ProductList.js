import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import './css/ProductList.css';
import ProductDetailPage from '../pages/ProductDetailPage';

const ProductList = ({ products, numberOfItemsToShow }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - numberOfItemsToShow);
    }
  };

  const handleNext = () => {
    if (startIndex + numberOfItemsToShow < products.length) {
      setStartIndex(startIndex + numberOfItemsToShow);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + numberOfItemsToShow);

  const transitions = useTransition(visibleProducts, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Pet Products</h1>
      <ul className="product-grid">
        {transitions((styles, product) => (
          <Link to={`/detail/${product.pet_product_id}`} key={product.pet_product_id} className="product-item-link">
            <animated.li style={styles} className="product-item">
              <div className="product-image">
                <img src={product.image} alt={product.product_name} />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-description">{product.product_detail}</p>
                <p className="product-price">Price: ${product.retail_price}</p>
                <p className="product-quantity">Quantity: {product.quantity_on_hand}</p>
              </div>
            </animated.li>
          </Link>
        ))}
      </ul>
      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={startIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={startIndex + numberOfItemsToShow >= products.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;