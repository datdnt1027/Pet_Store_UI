import React from 'react';
import '../components/css/PopupForm.css'
const PopupForm = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-form">
      <button onClick={onClose}>X</button>
        {/* Form fields */}
        <form>
  <div>
    <label htmlFor="pet_product_id">Pet Product ID:</label>
    <input type="text" id="pet_product_id" name="pet_product_id" />
  </div>

  <div>
    <label htmlFor="image">Image URL:</label>
    <input type="text" id="image" name="image" />
  </div>

  <div>
    <label htmlFor="product_code">Product Code:</label>
    <input type="text" id="product_code" name="product_code" />
  </div>

  <div>
    <label htmlFor="product_name">Product Name:</label>
    <input type="text" id="product_name" name="product_name" />
  </div>

  <div>
    <label htmlFor="product_detail">Product Detail:</label>
    <textarea id="product_detail" name="product_detail"></textarea>
  </div>

  <div>
    <label htmlFor="product_category_id">Product Category ID:</label>
    <input type="text" id="product_category_id" name="product_category_id" />
  </div>

  <div>
    <label htmlFor="quantity_on_hand">Quantity on Hand:</label>
    <input type="number" id="quantity_on_hand" name="quantity_on_hand" />
  </div>

  <div>
    <label htmlFor="vendor_price">Vendor Price:</label>
    <input type="number" step="0.01" id="vendor_price" name="vendor_price" />
  </div>

  <div>
    <label htmlFor="retail_price">Retail Price:</label>
    <input type="number" step="0.01" id="retail_price" name="retail_price" />
  </div>

  <input type="submit" value="Add Product" />
</form>
        
      </div>
    </div>
  );
};
export default PopupForm;