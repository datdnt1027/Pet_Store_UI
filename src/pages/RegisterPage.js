import React, { useState } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';
import '../components/css/RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '', 
        email: '',
        password: '',
        confirmPassword: ''
    });

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
    
          if(response.status === 200) {
            // registration successful
            console.log('Registration successful');  
            navigate('/login');

          } else {
            // registration failed 
            throw new Error('Registration failed');
          }
    
        } catch (error) {
            console.error(error);
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