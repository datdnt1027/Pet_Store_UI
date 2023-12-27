import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Heading } from '@chakra-ui/react';
import ProductsByCate from '../components/ProductsByCate';
import { useParams } from 'react-router-dom';
import sampleProduct from '../data/sampleProduct';

import '../components/css/ItemListPage.css'
import apiConfig from '../config/apiConfig';import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import '../components/css/ProductList.css';

const ItemListPage = () => {
  const [cate, setCate] =  useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId } = useParams();
  const toast = useToast();
  useEffect(() => {
    fetchItems();
  }, [currentPage, categoryId]);

  const fetchItems = async () => {
    const payload = {
      "categoryId": categoryId
    }
    try {
      const response = await axios.post(apiConfig.GET_BY_CATE + '?page=' + currentPage,payload); // Replace with your API endpoint
      const data = response.data;
      //console.log(data);
      setItems(data.products);
      setCate(data.categoryName)
      console.log(data); // Assuming the API response returns an array of product objects
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
    <div> {/* Add a container class */}
      <ProductList products={items} cateName={cate} />
    </div>
  );
};

export default ItemListPage;