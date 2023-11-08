import React, { useState, useEffect } from 'react';
import './css/Navbar.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteBrandText, setSiteBrandText] = useState('PETCAL');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 420) {
        setSiteBrandText('MAS');
      } else {
        setSiteBrandText('PETCAL');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className="p-3 bg-dark text-white">
        <div className="flexMain">
          <div className="flex1"></div>
          <div className="flex2 text-center">
          </div>
          <div className="flex1"></div>
        </div>
      </div>
      <div id="menuHolder" className={isMenuOpen ? 'drawMenu' : ''}>
        <div role="navigation" className="sticky-top border-bottom border-top" id="mainNavigation">
          <div className="flexMain">
            <div className="flex2">
              <button className="whiteLink siteLink" style={{ borderRight: '1px solid #eaeaea' }} onClick={handleMenuToggle}>
                <i className="fas fa-bars me-2"></i> MENU
              </button>
            </div>
            
            <div className="flex3 text-center" id="siteBrand">
            <a href='/'>
              {siteBrandText}
              </a>
            </div>
            
            <div className="flex2 text-end d-block d-md-none">
              <button className="whiteLink siteLink"><i className="fas fa-search"></i></button>
            </div>
            <div className="flex2 text-end d-none d-md-block">
              <a href="/signup"><button  className="whiteLink siteLink">REGISTER</button></a>
              <a href="/login"><button className="blackLink siteLink">Login</button></a>
            </div>
          </div>
        </div>

        <div id="menuDrawer">
          <div className="p-4 border-bottom">
            <div className="row">
              <div className="col">
                <select className="noStyle">
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="italian">Italian</option>
                  <option value="hebrew">Hebrew</option>
                </select>
              </div>
              <div className="col text-end">
                <i className="fas fa-times" role="btn" onClick={handleMenuToggle}></i>
              </div>
            </div>
          </div>
          <div>
            <a href="/" className="nav-menu-item"><i className="fas fa-home me-3"></i>Home</a>
            <a href="#" className="nav-menu-item"><i className="fab fa-product-hunt me-3"></i>Products</a>
            <a href="#" className="nav-menu-item"><i className="fas fa-search me-3"></i>Explore</a>
            <a href="#" className="nav-menu-item"><i className="fas fa-wrench me-3"></i>Services</a>
            <a href="#" className="nav-menu-item"><i className="fas fa-dollar-sign me-3"></i>Pricing</a>
            <a href="#" className="nav-menu-item"><i className="fas fa-file-alt me-3"></i>Blog</a>
          <a href="#" className="nav-menu-item"><i className="fas fa-building me-3"></i>About Us</a>
        </div>
      </div>
    </div>
    
    </div>
    
  );
}

export default Header;