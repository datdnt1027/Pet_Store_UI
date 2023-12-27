import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import './css/ProductList.css';
import { Select } from 'antd';
import ProductItem from './ProductItem';

const ProductList = ({ products, cateName }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(8);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('name');
    console.log(products);
    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        const totalPages = Math.ceil(products.length / numberOfItemsToShow);
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = currentPage * numberOfItemsToShow;
    const endIndex = startIndex + numberOfItemsToShow;
    const visibleProducts = products.slice(startIndex, endIndex);

    const transitions = useTransition(visibleProducts, {
        from: { opacity: 0, transform: 'translateY(50px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 300, friction: 20 },
    });

    const totalPages = Math.ceil(products.length / numberOfItemsToShow);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleNumberOfItemsChange = (value) => {
        setNumberOfItemsToShow(value);
        setCurrentPage(0);
    };

    const handleSortByChange = (value) => {
        setSortBy(value);
    };

    const handleSortOrderChange = (value) => {
        setSortOrder(value);
    };

    const sortProducts = (products) => {
        if (sortBy === 'name') {
            return products.sort((a, b) => {
                const nameA = a.productName.toUpperCase();
                const nameB = b.productName.toUpperCase();
                if (nameA < nameB) {
                    return sortOrder === 'asc' ? -1 : 1;
                }
                if (nameA > nameB) {
                    return sortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            });
        } else if (sortBy === 'price') {
            return products.sort((a, b) => {
                const priceA = parseFloat(a.productPrice);
                const priceB = parseFloat(b.productPrice);
                if (priceA < priceB) {
                    return sortOrder === 'asc' ? -1 : 1;
                }
                if (priceA > priceB) {
                    return sortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return products;
    };

    const sortedProducts = sortProducts(products);

    return (
        <div className="product-list-container mt-[74px]">
            <h1 className="product-list-title">
                {cateName ? cateName : "Products"}
            </h1>

            <div className='flex items-center justify-between px-[10px] pt-[10px] pb-[20px]'>
                <div className='flex items-center'>
                    <label htmlFor="numberOfItems" className='text-[16px] text-[#333] font-[500] mr-[8px]'>
                        Items per page:
                    </label>

                    <Select
                        className='w-[120px]'
                        defaultValue={numberOfItemsToShow}
                        onChange={handleNumberOfItemsChange}
                        options={[
                            {
                                value: 8,
                                label: '8 products'
                            },
                            {
                                value: 16,
                                label: '16 products'
                            },
                            {
                                value: 24,
                                label: '24 products'
                            }
                        ]}
                    />
                </div>

                <div className="sort-options">
                    <label htmlFor="sortBy" className='text-[16px] text-[#333] font-[500] mr-[8px]'>
                        Sort by:
                    </label>
                    <Select
                        className='w-[100px]'
                        defaultValue={sortBy}
                        onChange={handleSortByChange}
                        options={[
                            {
                                value: "name",
                                label: 'Name'
                            },
                            {
                                value: "price",
                                label: 'Price'
                            }
                        ]}
                    />
                    <label htmlFor="sortOrder" className='ml-[20px] text-[16px] text-[#333] font-[500] mr-[8px]'>
                        Sort order:
                    </label>
                    <Select
                        className='w-[120px]'
                        defaultValue={sortOrder}
                        onChange={handleSortOrderChange}
                        options={[
                            {
                                value: "asc",
                                label: 'Ascending'
                            },
                            {
                                value: "desc",
                                label: 'Descending'
                            }
                        ]}
                    />
                </div>
            </div>

            <ul className="grid grid-cols-4 gap-[20px]">
                {transitions((styles, product) => (
                    <animated.li style={styles}>
                        <ProductItem product={product} isNew={false} />
                    </animated.li>
                ))}
            </ul>
{ products.length > 0 ? (
            <div className="flex items-center py-[20px] justify-center">
                <button
                    style={{
                        backgroundColor: "#fff",
                        border: "1px solid #fdd444",
                        borderRadius: "6px",
                        color: "#fdd444"
                    }}
                    className="pagination-button font-[500]"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}>
                    Previous
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        style={{
                            backgroundColor: `${pageNumber === currentPage + 1 ? '#fdd444' : '#fff'}`,
                            border: "1px solid #fdd444",
                            borderRadius: "6px",
                            color: `${pageNumber === currentPage + 1 ? '#fff' : '#fdd444'}`
                        }}
                        className={`pagination-button font-[500] ${pageNumber === currentPage + 1 ? 'active' : ''}`}
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber - 1)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    style={{
                        backgroundColor: "#fff",
                        border: "1px solid #fdd444",
                        borderRadius: "6px",
                        color: "#fdd444"
                    }}
                    className="pagination-button font-[500]"
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>) : null
            }
        </div>
    );
};

export default ProductList;