import React, { useState } from 'react';
import '../components/css/RegistrationForm.css';

const RegistrationForm = () => {
    const [customer, setCustomer] = useState({
        customerCode: '',
        avatar: '',
        customerName: '',
        emailAddress: '',
        contactNumber: '',
        completeAddress: '',
        username: '',
        password: '',
        status: '1',
        userId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or validation here
        console.log(customer);
    };

    return (
        <div className="registration-container">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="input-container">
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={customer.customerName}
                        onChange={handleChange}
                        required
                        placeholder= "Họ và tên"
                    />
                </div>
                <div className="input-container">
                    
                    <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        value={customer.emailAddress}
                        onChange={handleChange}
                        required
                        placeholder= "Email"
                    />
                </div>
                <div className="input-container">
                    
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={customer.contactNumber}
                        onChange={handleChange}
                        required
                        placeholder= "Số điện thoại"
                    />
                </div>
                <div className="input-container">
                    
                    <textarea
                        id="completeAddress"
                        name="completeAddress"
                        value={customer.completeAddress}
                        onChange={handleChange}
                        required
                        placeholder= "Địa chỉ"
                    />
                </div>
                <div className="input-container">
                    
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={customer.username}
                        onChange={handleChange}
                        required
                        placeholder= "Tài khoản"
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
                <div className="button-container">
                    <button type="submit">Đăng ký</button>
                </div>
            </form >
        </div >
    );
};

export default RegistrationForm;