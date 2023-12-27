import React, { useState, useEffect, useRef } from 'react';
import './css/Navbar.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../components/UserNavBar'
import { Input, Button, Box, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import apiConfig from '../config/apiConfig';
import { LoginOutlined } from '@ant-design/icons';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [siteBrandText, setSiteBrandText] = useState('PETCAL');
    const [shouldRenderUserNavbar, setShouldRenderUserNavbar] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const boxRef = useRef(null);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isFixed, setIsFixed] = useState(false)
    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
        setShowResults(false);
    }
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleResultClick = (result) => {
        // Do something with the selected search result, such as navigating to a product page or displaying more details
        console.log("Selected search result: ", result);
    };
    const handleStorageChange = () => {
        const storedUser = localStorage.getItem('user');
        setShouldRenderUserNavbar(!!storedUser);
    };
    const handleSearchButtonClick = () => {
        axios.get(apiConfig.SEARCH + searchInput)
            .then(response => {

                const searchResults = response.data;

                setSearchResults(searchResults);
                setIsSearchPerformed(true);
            })
            .catch(error => {
                // Handle the error
                console.error('Error fetching search results:', error);
            });
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.clear();
        setShouldRenderUserNavbar(false);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setShouldRenderUserNavbar(!!storedUser);

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setIsSearchPerformed(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 420) {
            setSiteBrandText('MAS');
        } else {
            setSiteBrandText('PETCAL');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', () => {

            window.scrollY > 0 ? setIsFixed(true) : setIsFixed(false)
        })
    }, [])

    return (
        <div className={`fixed border-b top-0 left-0 right-0 z-50 ${isFixed && "border-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]"}`}>

            <div id="menuHolder" className={isMenuOpen ? 'drawMenu' : ''}>
                <div role="navigation" className="sticky-top border-bottom border-top" id="mainNavigation">
                    <div className="flexMain">
                        <div className="flex2">
                            <button className="whiteLink siteLink" style={{ borderRight: '1px solid #eaeaea' }} onClick={handleMenuToggle}>
                                <p className="font-[600]">MENU</p>
                            </button>
                        </div>

                        <div className="flex3 text-center" id="siteBrand">
                            <Link to='/'>
                                {siteBrandText}
                            </Link>
                        </div>
                        <Box display="flex" alignItems="center" position="relative">
                            <Input
                                type="text"
                                placeholder="Search"
                                onChange={handleSearchInputChange}
                                value={searchInput}
                            />

                            {isSearchPerformed && (
                                <Box
                                    ref={boxRef}
                                    mt={2}
                                    position="absolute"
                                    top="100%"
                                    left="0"
                                    backgroundColor="white"
                                    boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                                    padding="10px"
                                    zIndex="1"
                                    display="block"
                                    width="100%"
                                >
                                    {searchResults.length > 0 ? (

                                                <Box>
                                                    {searchResults.map((result) => (
                                                        <Link key={result.productId} to={`/detail/${result.productId}`}>
                                                            <Box p={2} mb={2} borderWidth="1px" borderRadius="md">
                                                                <Text fontWeight="bold">{result.productName}</Text>
                                                                <Text>{result.productDetail}</Text>
                                                                <Text>Price: {result.productPrice}</Text>
                                                                {/* You can display other relevant information from the search results */}
                                                            </Box>
                                                        </Link>
                                                    ))}
                                                </Box>
                                    ) : (
                                        <Text>No results found.</Text>
                                    )}
                                </Box>
                            )}
                            <Button
                                ml={2}
                                onClick={handleSearchButtonClick}
                                colorScheme="blue"
                                size="sm"
                                aria-label="Search"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 15l6-6M9 15l-6-6M8 6h8"
                                    />
                                </svg>
                            </Button>
                        </Box>
                        <div className="flex2 text-end d-block d-md-none">
                            <button className="whiteLink siteLink"><i className="fas fa-search"></i></button>
                        </div>
                        {shouldRenderUserNavbar ? (

                            <UserNavbar onLogout={handleLogout} />
                        ) : (

                            <div className="flex-[2] h-full flex items-center">
                                <Link to="/signup">
                                    <button className="flex items-center">
                                        <p className='font-[600] ml-[6px]'>
                                            REGISTER
                                        </p>
                                    </button>
                                </Link>
                                <Link to="/login">
                                    <button className="flex items-center ml-[10px] text-white bg-[#232323] h-[74px] px-[20px]">
                                        <LoginOutlined className='font-[600]' />
                                        <p className='font-[600] ml-[6px]'>
                                            Login
                                        </p>
                                    </button>
                                </Link>
                            </div>
                        )}
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
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fas fa-home me-3"></i>Home</Link>
                        <Link to="/products" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fab fa-product-hunt me-3"></i>Products</Link>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fas fa-search me-3"></i>Explore</Link>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fas fa-wrench me-3"></i>Services</Link>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fas fa-dollar-sign me-3"></i>Pricing</Link>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fas fa-file-alt me-3"></i>Blog</Link>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-menu-item"><i className="fas fa-building me-3"></i>About Us</Link>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Header;