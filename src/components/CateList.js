import endpoints from '../config/apiConfig';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './css/CateSwiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';
function CategoryList() {

    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      fetchCategories(); 
    }, []);
  
    const fetchCategories = async () => {
        try {
          const response = await axios.get(endpoints.CATE);
          console.log('Fetched');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories', error);
        }
      }
  
    return (
        <div className="category-wrapper">
            <h1 className="category-title">Category</h1>
        <Swiper 
        navigation={true} modules={[Navigation]}
        className="mySwiper"
      >
        {categories.map(category => (
          <SwiperSlide key={category.categoryId}>
            <CategoryItem category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    );
  
  }
  
  function CategoryItem({ category }) {
  
    return (
        <a href='/{category.categoryName}' className="category">
          <h3>{category.categoryName}</h3>
        </a>
      );
  
  }
export default CategoryList;