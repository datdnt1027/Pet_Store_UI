import React from 'react';
import HomePage from './pages/HomePage';
import RegistrationForm from './pages/RegisterPage';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import ProductDetailPage from './pages/ProductDetailPage';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';



const App = () => {

  return (

    <ChakraProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" />
          <Route path="/contact" />
          <Route path="/signup" element={<RegistrationForm />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/detail/:id" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
    </ChakraProvider>

  );
};

export default App;