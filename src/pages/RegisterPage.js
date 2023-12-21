import React, { useState } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';
import '../components/css/RegistrationForm.css';
import {useToast,Center, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Image, Box, HStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '', 
        email: '',
        password: '',
        confirmPassword: ''
    });
    const toast = useToast();
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        console.error("Handle Submit");
        e.preventDefault();
        if(customer.password !== customer.confirmPassword) {
            // show error
            return; 
        }
        try {
            // Call the API using Axios
            const response = await axios.post(endpoints.REGISTER, customer);
            console.log("Thoong tin" + response);
          if(response.status === 200) {
            // registration successful
            console.log('Registration successful');
            alert("Đằng ký thành công.");
            navigate('/login');

          } else {
            // registration failed 
            throw new Error('Registration failed');
          }
    
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

    return (
        <div className='all'>
        <div className="registration-container">
            
            <form className='register-form' onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className='row-input-container'>
                <div className="input-container">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleChange}
                        required
                        placeholder= "FIRST NAME"
                    />
                </div>
                <div className="input-container">
                    
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleChange}
                        required
                        placeholder= "LASTNAME"
                    />
                </div>
                </div>
                <div className="input-container">
                    
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        required
                        placeholder= "EMAIL"
                    />
                </div>
                <div className="input-container">
                    
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={customer.password}
                        onChange={handleChange}
                        required
                        placeholder= "Mật khẩu"
                    />
                </div>
                <div className="input-container">
                    
                    <input
                        type="confirmPassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={customer.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder= "Xac nhan Mật khẩu"
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Đăng ký</button>
                </div>
            </form >
        </div >
        </div>
    );
};

export default RegistrationForm;