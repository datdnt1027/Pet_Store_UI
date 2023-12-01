import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
const Sidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("");
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
  }, []);
  const renderMainContent = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return (
            <div></div>
        );
      case 'store':
        return (
          <div></div>
        );
      case 'analytics':
        return (
            <div></div>
        );
      case 'message':
        return (
            <div></div>
        );
      case 'team':
        return (
            <div></div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
      <a href="#" className="brand">
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
            <span className="text">Quản lý nhân viên</span>
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
  );
};

export default Sidebar;