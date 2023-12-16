import React, { useState } from 'react';
import '../components/css/PopupForm.css';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { json } from 'react-router-dom';
const CreateForm = ({ onClose }) => {
  const [base64Image, setBase64Image] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  function removeBase64Prefix(base64Image) {
    // Split the base64 string at the comma
    const parts = base64Image.split(',');
  
    // Take the second part of the split result
    const imageWithoutPrefix = parts[1];
  
    return imageWithoutPrefix;
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        setBase64Image(base64String);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(base64Image);
    try {

      
      const formData = {
        categoryId: document.getElementById('pet_product_id').value,
       
        productName: document.getElementById('product_name').value,
        productDetail: document.getElementById('product_detail').value,
        productQuantity: parseInt(document.getElementById('quantity_on_hand').value),
        productPrice: parseFloat(document.getElementById('vendor_price').value),
        imageData: base64Image,
      };
      const payload = JSON.stringify(formData);
      console.log(payload)
      // Log all form input values
        const config = {
            headers: {
              'Content-Type': 'application/json', // Set the content type to multipart/form-data
            },
          };
          const response = await axios.post(apiConfig.CREATE_PRODUCT, formData, config);
    
        // Handle the response
        console.log(response.data);
    
      } catch (error) {
        // Handle any network or other errors
        console.error(error);
      }
    
    setLoading(false);
  };
  
  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <button className="close-button" onClick={onClose}>X</button>
        {/* Form fields */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="pet_product_id">Cate ID:</label>
            <input type="text" id="pet_product_id" name="categoryId" />
          </div>

          

          {previewImage && (
            <div>
              <label>Image Preview:</label>
              <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
          )}

          <div>
            <label htmlFor="product_name">Product Name:</label>
            <input type="text" id="product_name" name="productName" />
          </div>

          <div>
            <label htmlFor="product_detail">Product Detail:</label>
            <textarea id="product_detail" name="productDetail"></textarea>
          </div>

          <div>
            <label htmlFor="quantity_on_hand">Quantity on Hand:</label>
            <input type="number" id="quantity_on_hand" name="productQuantity" />
          </div>

          <div>
            <label htmlFor="vendor_price">Vendor Price:</label>
            <input type="number" step="0.01" id="vendor_price" name="productPrice" />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} />
          </div>
          <input type="submit" value={loading ? "Loading..." : "Add Product"} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default CreateForm;