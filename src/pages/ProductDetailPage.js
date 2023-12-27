import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/css/ProductDetails.css'
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import sampleDetail from '../data/sampleDetail';
import ProductList from '../components/ProductList';
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
const ProductDetailPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [imgId, setImgId] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [authToken, setAuthToken] = useState(null);

  const data = {
    productId: id,
    // Include other data you want to send for the product
    // For example:
    // productName: 'Product Name',
    // productPrice: 9.99,
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  useEffect(() => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage

    if (authTokenString) {
      const authToken = JSON.parse(authTokenString).token; // Parse the JSON and access the 'token' property
      setAuthToken(authToken);
    } else {
      setAuthToken(null);
    }
  }, []);
  const addToCart = async () => {
    const parsedQuantity = parseInt(quantity, 10); // Parse the quantity as an integer
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token; // Parse the JSON and access the 'token' property
    console.log(authToken);
    // Set the headers with the authentication token
    const headers = {
      Authorization: `Bearer ${authToken}`
    };
    try {
      // Call the API to update the cart on the server
      await axios.post(apiConfig.ADD_TO_CART, {
        productId: product.productId,
        quantity: parsedQuantity
      }, { headers });

            toast({
                title: 'Cart Item',
                description: 'You have added.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            if(error)
            {
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
        }
    };


    useEffect(() => {
        // Fetch product data from API based on the id
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`${apiConfig.DETAIL}`, {
                    productId: id
                });
                console.log("Gett" + response.data);
                ////
                setProduct(response.data);
                console.log("fetttt");
            } catch (error) {
                if(error)
                {
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
            }
        };

        fetchProduct();
    }, [id]);

    React.useEffect(() => {

        if (product) {

            //fetchRelatedProduct()
        }
    }, [product])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='all'>
      <div className='product-container'>
        <div className="card-wrapper">
          <div className="card">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  {/* Render the product image dynamically */}
                  <img src={product.imageData} alt="toy image" />
                  <img src='https://i5.walmartimages.com/asr/b2136392-ee08-4e60-88ff-83b4ac15f8bc.c7838a34676861321f4b6f0c66e790ef.jpeg' alt="toy image" />
                  <img src={product.imageData} alt="toy image" />
                  <img src={product.imageData} alt="toy image" />
                </div>
              </div>
              <div className="img-select">
                <div className="img-item">
                  <a href="#" data-id="1">
                    <img src={product.imageData} alt="toy image" />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="2">
                    <img src='https://i5.walmartimages.com/asr/b2136392-ee08-4e60-88ff-83b4ac15f8bc.c7838a34676861321f4b6f0c66e790ef.jpeg' alt="toy image" />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="3">
                    <img src={product.imageData} alt="toy image" />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="4">
                    <img src={product.imageData} alt="toy image" />
                  </a>
                </div>
              </div>
            </div>
            <div className="product-content">
              <h2 className="product-title">{product.productName}</h2>
              <p className="product-price">${product.productPrice}</p>
              <div className="product-detail">
                <h2>Product Details</h2>
                <p>{product.productDetail}</p>
              </div>
             
              {
                authToken ? (
                  <div>
                     <div className="product-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity} 
                  onChange={handleQuantityChange}
                />
              </div>
                  <button className="add-to-cart" onClick={addToCart}>
                    Add to Cart
                  </button>
                  </div>
                ) : null
              }

                        </div>
                    </div>
                </div>
            </div> */}
            <div className='p-[20px] shadow-lg rounded-[12px] flex items-center'>
                <img className='object-contain w-[600px] h-[400px]' src={product.imageData} alt="product Image" />
                <div className="ml-[40px]">
                    <h2 className="product-title">{product.productName}</h2>
                    <p className="product-price">{numeral(product.productPrice).format("0,0")} đ</p>
                    <div className="product-detail">
                        <h2>Product Details</h2>
                        <p className="text-[24px] text-[#333] font-[500]">{product.productDetail}</p>
                    </div>

                    {
                        authToken ? (
                            <div className='purchase-info'>
                                <div className="product-quantity">
                                    <label htmlFor="quantity" className='mr-[10px]'>Quantity:</label>
                                    <input
                                        className="text-[600] text-[#333]"
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        max={100}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                                <button className="add-to-cart rounded-[12px]" onClick={addToCart}>
                                    Add to Cart
                                </button>
                            </div>
                        ) : null
                    }

                </div>
            </div>
            <div className='p-[20px] mt-[20px] rounded-[12px] shadow-lg'>
                <h2 className='text-[24px] mb-[10px] text-[#342E37] font-bold'>Related Products</h2>
                <div className='grid grid-cols-4 gap-[20px]'>
                    {
                        products.map((product) => (
                            <div key={product.productId}>
                                <ProductItem isNew={false} product={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;