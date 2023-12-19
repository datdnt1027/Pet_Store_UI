import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import sampleData from "../data/sampleData";
import sampleProduct from "../data/sampleProduct";
import CateSwiper from "../components/CateSwiper";
import axios from "axios";
import apiConfig from "../config/apiConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import CategoryList from "../components/CateList";
import Loading from "../components/Loading";

const HomePage = () => {
  const [products, setProducts] = useState(sampleProduct.products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7206/collections/products?page=1"
      ); // Replace with your API endpoint
      const data = await response.data;
      //console.log(data);
      setProducts(data); // Assuming the API response returns an array of product objects
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      {/* <CateSwiper/> */}
      <br />
      <br />
      <br />
      <CategoryList />
      <ProductList products={products} numberOfItemsToShow={5} />
    </div>
  );
};

export default HomePage;
