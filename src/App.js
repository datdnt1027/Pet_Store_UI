import React from 'react';
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage';
import RegistrationForm from './pages/RegisterPage';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import ProductDetailPage from './pages/ProductDetailPage';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import VerifySuccessfulPage from './pages/Verify'
import PasswordResetForm from './pages/PasswordResetPage';
import AdminPage from './pages/AdminPage';
import { CartContext , CartProvider } from './components/CartContext';

const App = () => {

  return (

    <ChakraProvider>
      <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" />
          <Route path="/contact" />
          <Route path="/signup" element={<RegistrationForm />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/passwordreset" element={<PasswordResetForm />}/>
          <Route path="/detail/:id" element={<ProductDetailPage />} />
          <Route path="/register/token/:token" element={<VerifySuccessfulPage />} />
          <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        </Routes>
      </Layout>
      </CartProvider>
    </ChakraProvider>

  );
};

export default App;