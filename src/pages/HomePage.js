import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import sampleData from '../data/sampleData';
import sampleProduct from '../data/sampleProduct';
import CateSwiper from '../components/CateSwiper';
import axios from 'axios';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import apiConfig from '../config/apiConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import CategoryList from '../components/CateList';

const HomePage = () => {
  const [products, setProducts] = useState(sampleProduct.products);
  const toast = useToast();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7206/collections/products?page=1'); // Replace with your API endpoint
      const data = await response.data;
      //console.log(data);
      setProducts(data); // Assuming the API response returns an array of product objects
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

  
  return (
    <div>
      
      {/* <CateSwiper/> */}
      <br/>
      <br/>
      <br/>
      <CategoryList/>
      <ProductList products={products} numberOfItemsToShow={5} />
    </div>
  );
};

export default HomePage;