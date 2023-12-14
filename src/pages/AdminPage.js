import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import ProductManagementPage from '../components/ProductManagementPage';
import OrderManagementPage from '../components/OrderManagementPage';
import AccountManagement from '../components/AccountManangement';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import '../components/css/AdminPage.css'
const AdminPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  const handleLogout = () => {
    localStorage.removeItem('user');
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

    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    });

    if (window.innerWidth < 768) {
      sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
      searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
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
      case 'team':
        return (
          <div></div>
        );
      default:
        return null;
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  useEffect(() => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
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
        setAvatar(response.data.avatar);
        console.log(response.data.avatar);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized. Logging out...');
          localStorage.clear('user');
          // Call the handleLogout function to log out the user
        } else {
          console.error('Error fetching profile data:', error);
        }
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
          <li className={activeMenuItem === 'accounts' ? 'active' : ''}>
            <a href="#" data-menu="accounts" onClick={() => handleMenuItemClick('accounts')}>
              <i className='bx bxs-doughnut-chart'></i>
              <span className="text">Quản lý tài khoản</span>
            </a>
          </li>
          <li className={activeMenuItem === 'staffs' ? 'active' : ''}>
            <a href="#" data-menu="staffs" onClick={() => handleMenuItemClick('staffs')}>
              <i className='bx bxs-message-dots'></i>
              <span className="text">Quản lý Account</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
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
        <nav>
          {/* Navigation content */}
          <i className='bx bx-menu'></i>
          <a href="#" className="nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className='bx bx-search'></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className='bx bxs-bell'></i>
            <span className="num">8</span>
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