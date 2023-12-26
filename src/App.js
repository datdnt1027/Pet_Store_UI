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
import { CartContext, CartProvider } from './components/CartContext';
import ItemListPage from './pages/ItemListPage';
import Checkout from './pages/CheckOutPage';
import UpdateProfile from './pages/UpdateProfile';
import Orders from './pages/OrdersPage';
import FailedPaymentPage from './pages/FailedPaymentPage'
import AdminProfilePage from './components/AdminProfile';
import AdminLogin from './pages/AdminLoginPage';
import AdminRoute from './components/AdminRoute'
import CODPaymentPage from '..//src/pages/CODPaymentPage'
import Product from './pages/Product';
const App = () => {

  return (

    <ChakraProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Product />} />
            <Route path="/contact" />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordResetForm />} />
            <Route path="/detail/:id" element={<ProductDetailPage />} />
            <Route path="/register/token/:token" element={<VerifySuccessfulPage />} />
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path='/category/:categoryId' element={<ItemListPage />} />
            <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path='/admin/profile' element={<AdminRoute><AdminProfilePage /></AdminRoute>} />
            <Route path='/order/payment/momo-return' element={<PrivateRoute><FailedPaymentPage /></PrivateRoute>} />
            <Route path='/order/payment/cod' element={<PrivateRoute><CODPaymentPage /></PrivateRoute>} />
          </Routes>
        </Layout>
      </CartProvider>
    </ChakraProvider>

  );
};

export default App;