import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import ProductsByCate from '../components/ProductsByCate';
import { useParams } from 'react-router-dom';
import sampleProduct from '../data/sampleProduct';
import '../components/css/ItemListPage.css'
import '../components/css/ProductList.css';

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId } = useParams();
  
  useEffect(() => {
    fetchItems();
  }, [currentPage, categoryId]);

  const fetchItems = async () => {
    try {
      // //const response = await axios.get(`${apiConfig.CATE}/category?page=${currentPage}`, {
      //   params: {
      //     categoryId: categoryId
      //   }
      // });

      // const data = response.data;
      setItems(sampleProduct.products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div> {/* Add a container class */}
      <ProductsByCate products={items} cateName={sampleProduct.categoryName} numberOfItemsToShow={5} />
    </div>
  );
};

export default ItemListPage;