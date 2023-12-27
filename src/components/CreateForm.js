import React, { useEffect, useState } from 'react';
import '../components/css/PopupForm.css';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import { json } from 'react-router-dom';
const CreateForm = ({ onClose, fetchProducts  }) => {
  const [base64Image, setBase64Image] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
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
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categories);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiConfig.CATE);
      console.log('Fetched');
      setCategories(response.data);
    } catch (error) {
      let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
    }
  };
  const handleSubmit = async (event) => {
    const authTokenString = sessionStorage.getItem('admin');
      const authToken = JSON.parse(authTokenString).token;
    event.preventDefault();
    setLoading(true);
    console.log(base64Image);
    try {

      
      const formData = {
        categoryId: document.getElementById('pet_product_id').value,
       
        productName: document.getElementById('product_name').value,
        productDetail: document.getElementById('product_detail').value,
        productQuantity: (document.getElementById('quantity_on_hand').value),
        productPrice: (document.getElementById('vendor_price').value),
        imageData: base64Image,
      };
      const payload = JSON.stringify(formData);
      console.log(payload)
      // Log all form input values
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          };
          const response = await axios.post(apiConfig.CREATE_PRODUCT, formData, config);
    
        // Handle the response
        console.log(response.data);
        toast({
          title: 'Success',
          description: 'Tạo sản phẩm thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onclose();
        fetchProducts();
        
      } catch (error) {
        if(error.response) {
        // Handle any network or other errors
        let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
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
  <label htmlFor="pet_product_id">Category:</label>
  <select id="pet_product_id" name="categoryId" value={selectedCategoryId} onChange={(event) => setSelectedCategoryId(event.target.value)}>
    <option value="">Select a category</option>
    {categories.map((category) => (
      <option key={category.categoryId} value={category.categoryId}>
        {category.categoryName}
      </option>
    ))}
  </select>
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