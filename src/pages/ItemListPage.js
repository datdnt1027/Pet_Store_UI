import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading } from '@chakra-ui/react';
import ProductsByCate from '../components/ProductsByCate';
import { useParams } from 'react-router-dom';
import sampleProduct from '../data/sampleProduct';
import '../components/css/ItemListPage.css'
import apiConfig from '../config/apiConfig';
import '../components/css/ProductList.css';

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId } = useParams();
  
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
      console.log(data); // Assuming the API response returns an array of product objects
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div> {/* Add a container class */}
      <ProductsByCate products={items} cateName={sampleProduct.categoryName} numberOfItemsToShow={5} />
    </div>
  );
};

export default ItemListPage;