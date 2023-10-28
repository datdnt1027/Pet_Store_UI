import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();

  // Use the productId to fetch the specific product details from your data source or API

  return (
    <div>
      <h2>Product Detail</h2>
      <p>Product ID: {productId}</p>
      {/* Render the detailed information for the selected product */}
    </div>
  );
};

export default ProductDetail;