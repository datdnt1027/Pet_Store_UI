import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { Link } from 'react-router-dom';
import '../components/css/CateList.css'
const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiConfig.CATE);
      console.log('Fetched');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
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