import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { Link } from 'react-router-dom';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import '../components/css/CateList.css'
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  useEffect(() => {
    fetchCategories();
  }, []);

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

  return (
    <div className="category-wrapper">
      <h1 className="category-title">Category</h1>
      {categories.map(category => (
        <CategoryItem key={category.categoryId} category={category} />
      ))}
    </div>
  );
};

function CategoryItem({ category }) {
  const { categoryId, categoryName } = category;

  return (
    <Link to={`/category/${categoryId}`} className="category">
      <h3>{categoryName}</h3>
    </Link>
  );
}

export default CategoryList;