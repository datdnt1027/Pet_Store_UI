import React, { useEffect,useState } from 'react';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import '../components/css/EditForm.css';

const EditForm = ({ onClose, product }) => {
  const [productId, setProductId] = useState(product.productId);
  const toast = useToast();
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [productName, setProductName] = useState(product.productName);
  const [productDetail, setProductDetail] = useState(product.productDetail);
  const [productQuantity, setProductQuantity] = useState((product.productQuantity).toString());
  const [productPrice, setProductPrice] = useState((product.productPrice).toString());
  const [image, setImage] = useState(product.imageData);
  const [categories, setCategories] = useState([]);
  console.log(image);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    const imageData = await new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  
    setImage(imageData);
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
  
  function removeBase64Prefix(base64Image) {
    // Split the base64 string at the comma
    const parts = base64Image.split(',');
  
    // Take the second part of the split result and remove leading/trailing spaces
    const imageWithoutPrefix = parts[1].trim();
  
    return imageWithoutPrefix;
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const imageWithoutPrefix = removeBase64Prefix(image);
    console.log(imageWithoutPrefix);
    const updatedProduct = {
      productId,
      categoryId,
      productName,
      productDetail,
      productQuantity,
      productPrice,
      imageData: imageWithoutPrefix, // Update imageData with the new image data
    };
  
    const authTokenString = sessionStorage.getItem('admin');
    const authToken = JSON.parse(authTokenString).token;
    console.log(JSON.stringify(updatedProduct));
  
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.patch(apiConfig.CREATE_PRODUCT, JSON.stringify(updatedProduct), config);
      console.log(response.data); // Handle the response as needed
      onClose(); // Close the form after successful update
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
      // Handle the error
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Edit Product</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="category">Category:</label>
          <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <label htmlFor="product-detail">Product Detail:</label>
          <input
            type="text"
            id="product-detail"
            value={productDetail}
            onChange={(e) => setProductDetail(e.target.value)}
          />

          <label htmlFor="product-quantity">Product Quantity:</label>
          <input
            type="text"
            id="product-quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />

          <label htmlFor="product-price">Product Price:</label>
          <input
            type="text"
            id="product-price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <label htmlFor="product-image">Product Image:</label>
          <input
            type="file"
            id="product-image"
            onChange={handleImageChange}
            accept="image/*"
          />
          <img src={image} alt="Product Image" />

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>X</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;