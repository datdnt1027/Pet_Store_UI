import React from 'react';

const EditForm = ({ onClose, product }) => {
  // Check if a product is selected
  if (!product) {
    return null;
  }

  return (
    <div className="popup-form">
      <h2>Edit Product</h2>
      <form>
        <label htmlFor="product-name">Name:</label>
        <input type="text" id="product-name" value={product.product_name} />

        <label htmlFor="product-price">Price:</label>
        <input type="text" id="product-price" value={product.retail_price} />

        {/* Add more form fields for other product properties */}

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditForm;