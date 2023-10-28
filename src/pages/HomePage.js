import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import sampleData from '../data/sampleData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const HomePage = () => {


  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch('https://api.example.com/products'); // Replace with your API endpoint
  //     const data = await response.json();
  //     setProducts(data); // Assuming the API response returns an array of product objects
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };
  const [products, setProducts] = useState(sampleData);
  return (
    <div>
      <ProductList products={products} numberOfItemsToShow={4} />
    </div>
  );
};

export default HomePage;