import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import ProductManagementPage from '../components/ProductManagementPage';
import OrderManagementPage from '../components/OrderManagementPage';
import StaffManagementPage from './StaffManagementPage'
import AccountManagement from '../components/AccountManangement';
import CategoryManagementPage from '../components/CategoryManagementPage';
import axios from 'axios';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import apiConfig from '../config/apiConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import '../components/css/AdminPage.css'
import AdminProfilePage from '../components/AdminProfile';
const AdminPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const [avatar, setAvatar] = useState();
  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    localStorage.clear()
    navigate("/");
  };
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  useEffect(() => {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach((item) => {
      const li = item.parentElement;

      item.addEventListener('click', function () {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');

        // Get the data-menu attribute to identify the selected menu item
        const selectedMenuItem = item.getAttribute('data-menu');
        handleMenuItemClick(selectedMenuItem);
      });
    });

    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    });

    



    const switchMode = document.getElementById('switch-mode');

    switchMode.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });

  }, []);
  const renderMainContent = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return (
          <div><AdminDashboard /></div>
        );
      case 'cate':
        return (
          <div><CategoryManagementPage /></div>
        );
      case 'products':
        return (
          <div><ProductManagementPage /></div>
        );
      case 'accounts':
        return (
          <div><OrderManagementPage /></div>
        );
      case 'staffs':
        return (
          <div><AccountManagement /></div>
        );
      case 'profile':
        return (
          <div><AdminProfilePage/></div>
        );
      case 'staff':
        return (
          <div><StaffManagementPage/></div>
        );
      default:
        return null;
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  useEffect(() => {
    const authTokenString = sessionStorage.getItem('admin'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token;
    console.log(authToken);
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(apiConfig.GET_ADMIN, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProfile(response.data);
        console.log(response.data.avatar);
        if (response.data.avatar) {
          setAvatar(response.data.avatar);
        } else {
          setAvatar('../../public/admin.jpg'); // Set a default image path when avatar is null
        }
        console.log(avatar);
        console.log(response.data);
      } catch (error) {

        let message = `Error ${error.response.status}: ${error.response.data.message}`;

          if(error.response.status === 403) {
            message = `Xin lỗi tài khoản này không có quyền.`; 
          }
          if(error.response.status === 401) {
            message = `Vui lòng đăng nhập lại.`; 
          }
          if(error.response.status === 409) {
            message = `Thông tin bị trùng.`; 
          }
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }
    };

    fetchData();
  }, []);
  return (
    <div id='all'>
      {/* Sidebar */}
      <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
        <a href="" className="brand">
          <i className='bx bxs-smile'></i>
          <span className="text">Admin PETCAL</span>
        </a>
        <ul className="side-menu top">
          <li className={activeMenuItem === 'dashboard' ? 'active' : ''}>
            <a href="#" data-menu="dashboard" onClick={() => handleMenuItemClick('dashboard')}>
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={activeMenuItem === 'products' ? 'active' : ''}>
            <a href="#" data-menu="products" onClick={() => handleMenuItemClick('products')}>
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Quản lý sản phẩm</span>
            </a>
          </li>
          <li className={activeMenuItem === 'cate' ? 'active' : ''}>
            <a href="#" data-menu="cate" onClick={() => handleMenuItemClick('cate')}>
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Quản lý danh mục</span>
            </a>
          </li>
          <li className={activeMenuItem === 'accounts' ? 'active' : ''}>
            <a href="#" data-menu="accounts" onClick={() => handleMenuItemClick('accounts')}>
              <i className='bx bxs-doughnut-chart'></i>
              <span className="text">Quản lý đơn Hàng</span>
            </a>
          </li>
          <li className={activeMenuItem === 'staffs' ? 'active' : ''}>
            <a href="#" data-menu="staffs" onClick={() => handleMenuItemClick('staffs')}>
              <i className='bx bxs-message-dots'></i>
              <span className="text">Quản lý khách hàng</span>
            </a>
          </li>
          <li className={activeMenuItem === 'staff' ? 'active' : ''}>
            <a href="#" data-menu="staff" onClick={() => handleMenuItemClick('staff')}>
              <i className='bx bxs-message-dots'></i>
              <span className="text">Quản lý nhân viên</span>
            </a>
          </li>

          
        </ul>
        <ul className="side-menu">
          
          <li className={activeMenuItem === 'profile' ? 'active' : ''}>
            <a href="#" data-menu="profile" onClick={() => handleMenuItemClick('profile')}>
              <i className='bx bxs-message-dots'></i>
              <span className="text">Quản lý Profile</span>
            </a>
          </li>
          <li>
            <a href="" onClick={handleLogout} className="logout">
              <i className='bx bxs-log-out-circle'></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* Main content */}
      <section id="content">
        {/* Navigation */}
        <nav className='information'>
          {/* Navigation content */}
          <i className='bx bx-menu'></i>
          
          
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className='bx bxs-bell'></i>
          </a>
          <a href='/admin/profile' className="profile">
            <img src={avatar} alt="Profile" />
          </a>
        </nav>

        {/* Main content */}
        <main> {renderMainContent()}</main>
      </section>
    </div>
  );
};

export default AdminPage;