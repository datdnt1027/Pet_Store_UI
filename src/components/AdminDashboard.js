import React, { useState } from 'react';

const AdminDashboard = () => {

  return (
    <div>
        
                {/* Content */}
                <div className="head-title">
                  <div className="left">
                    <h1>Dashboard</h1>
                    <ul className="breadcrumb">
                      <li>
                        <a href="#">Dashboard</a>
                      </li>
                      <li><i className='bx bx-chevron-right'></i></li>
                      <li>
                        <a className="active" href="#">Home</a>
                      </li>
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
                      <h3>Đơn gần đây</h3>
                      <i className='bx bx-search'></i>
                      <i className='bx bx-filter'></i>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Tên người dùng</th>
                          <th>Ngày</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img src='https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain' alt="User" />
                            <span className="user-name">John Doe</span>
                          </td>
                          <td>2023-11-15</td>
                          <td>Completed</td>
                        </tr>
                        <tr>
                          <td>
                            <img src='https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain' alt="User" />
                            <span className="user-name">Jane Smith</span>
                          </td>
                          <td>2023-11-14</td>
                          <td>Processing</td>
                        </tr>
                        <tr>
                          <td>
                            <img src='https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain' alt="User" />
                            <span className="user-name">Mike Johnson</span>
                          </td>
                          <td>2023-11-13</td>
                          <td>Cancelled</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              
    </div>
  );
};

export default AdminDashboard;