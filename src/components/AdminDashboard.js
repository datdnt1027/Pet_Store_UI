import React, { useState, useEffect } from 'react';
import CategoryChart from '../components/CategoryChart'
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiConfig.CATE);
      console.log('Fetched');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };
  return (
    <div>
        
                {/* Content */}
                <div className="head-title">
                  <div className="left">
                    <h1>Dashboard</h1>
                    <ul className="breadcrumb">
                      
                    </ul>
                  </div>
                  <a href="#" className="btn-download">
                    <i className='bx bxs-cloud-download'></i>
                    <span className="text">Download PDF</span>
                  </a>
                </div>
      
                <ul className="box-info">
                  <li>
                    <i className='bx bxs-calendar-check'></i>
                    <span className="text">
                      <h3>1020</h3>
                      <p>Đơn hàng</p>
                    </span>
                  </li>
                  <li>
                    <i className='bx bxs-group'></i>
                    <span className="text">
                      <h3>2834</h3>
                      <p>Tài khoản</p>
                    </span>
                  </li>
                  <li>
                    <i className='bx bxs-dollar-circle'></i>
                    <span className="text">
                      <h3>$2543</h3>
                      <p>Tổng thu</p>
                    </span>
                  </li>
                </ul>
      
                <div className="table-data">
                  <div className="order">
                    <div className="head">
                      <h3>Summary</h3>
                      <i className='bx bx-search'></i>
                      <i className='bx bx-filter'></i>
                    </div>
                    <CategoryChart data={categories} />
                  </div>
                </div>
              
    </div>
  );
};

export default AdminDashboard;