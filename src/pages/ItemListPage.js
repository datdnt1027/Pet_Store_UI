import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { useParams } from 'react-router-dom';

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId } = useParams();
  console.log("rednerd");
  useEffect(() => {
    console.log("rednerd");
    fetchItems();
  }, [currentPage, categoryId]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiConfig.CATE}/category?page=${currentPage}`, {
        data: categoryId
      });

      const data = response.data;
      setItems(data.products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div>
      <h1>Item List Page</h1>
      <p>Current Page: {currentPage}</p>
      <ul>
        {items.map(item => (
          <li key={item.productId}>
            <h2>{item.productName}</h2>
            <p>Price: {item.productPrice}</p>
            <img src={`data:image/png;base64,${item.imageData}`} alt={item.productName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListPage;