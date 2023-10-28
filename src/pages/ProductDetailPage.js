import React from 'react';
import { useParams } from 'react-router-dom';
import sampleData from '../data/sampleData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = sampleData.find((product) => product.pet_product_id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Product Detail Page</h1>
      <h3>{product.product_name}</h3>
      <p>Price: ${product.retail_price}</p>
      <p>Quantity: {product.quantity_on_hand}</p>
      <p>Product Detail: {product.product_detail}</p>
    </div>
  );
};

export default ProductDetailPage;