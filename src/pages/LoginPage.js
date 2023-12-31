import React, { useState, useEffect } from 'react';
import '../components/css/LoginForm.css'; // CSS file for styling
import endpoints from '../config/apiConfig'
import axios from 'axios';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';


const Login = () => {
    let navigate = useNavigate();
    const toast = useToast();
    const [lemail, setEmail] = useState('');
    const [lpassword, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const payload = {
            email: lemail
        }
        if (lemail !== lemail) {
            // show error
            return;
        }
        try {
            // Call API using Axios
            const response = await axios.post(endpoints.FORGOT, payload);

            if (response.status === 200) {
                // registration successful
                console.log('Password forgot successful');

                navigate('/passwordreset');
            } else {
                // registration failed 
                throw new Error('Password forgot failed');
            }

        } catch (error) {

            let message = `Error ${error.response.status}: ${error.response.data.message}`;

            if (error.response.status === 403) {
                message = `Xin lỗi tài khoản này không có quyền.`;
            }
            if (error.response.status === 401) {
                message = `Vui lòng đăng nhập lại.`;
            }
            if (error.response.status === 409) {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: lemail,
            password: lpassword
        };
        try {
            // Call API using Axios
            console.log(lemail + " / " + lpassword);
            const response = await axios.post(endpoints.LOGIN, payload);
            console.log(response)

            if (response.status === 200) {
                // registration successful
                toast({
                    title: 'Login Successful',
                    description: 'You have successfully logged in.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                localStorage.setItem('user', JSON.stringify(response.data));

                navigate('/');
            } else {
                // registration failed 
                throw new Error('Login failed');
            }

        } catch (error) {
            let message = `Error ${error.response.status}: ${error.response.data.message}`;

            if (error.response.status === 403) {
                message = `Xin lỗi tài khoản này không có quyền.`;
            }
            if (error.response.status === 401) {
                message = `Vui lòng đăng nhập lại.`;
            }
            if (error.response.status === 409) {
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
        if (rememberMe) {
            localStorage.setItem('emal', lemail);
            localStorage.setItem('password', lpassword);
        }
    };
    useEffect(() => {

        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }

    }, []);
    return (
        <div className='all'>
            <div className="login-container">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="form-group">
                            <input
                                type="email"
                                value={lemail}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Email'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                value={lpassword}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Password'
                            />
                        </div>
                        <div className='remember'>
                            <div className='remember-wrapper'>
                                <label>
                                    <input type='checkbox' checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)} />
                                </label>
                                <div>Remember me</div>
                            </div>
                            <a className='forgot' href="" onClick={handleForgotPassword}>Forgot password</a>
                        </div>
                        <button className='btn' type="submit">Login</button>
                        <div className='register-link'>
                            <p>Don't have an account <a href='/signup'>Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;