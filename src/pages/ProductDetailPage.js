import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sampleData from '../data/sampleData';
import ProductDetail from '../components/css/ProductDetails.css'
import ProductList from '../components/ProductList';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = sampleData.find((product) => product.pet_product_id === parseInt(id));
  const [products, setProducts] = useState(sampleData);
  const [imgId, setImgId] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const addToCart = () => {
    const parsedQuantity = parseInt(quantity, 10); // Parse the quantity as an integer
  
    // Check if the product is already in the cart
    const productInCart = cartItems.find(item => item.pet_product_id === product.pet_product_id);
  
    if (productInCart) {
      // If the product is already in the cart, update its quantity
      const updatedCart = cartItems.map(item => {
        if (item.pet_product_id === product.pet_product_id) {
          return { ...item, quantity: item.quantity + parsedQuantity };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      // If the product is not in the cart, add it as a new item
      const newItem = { ...product, quantity: parsedQuantity };
      setCartItems([...cartItems, newItem]);
    }
  
    // Reset the quantity input to 1
  };

  useEffect(() => {
    const slideImage = () => {
      // update translateX based on imgId
      const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
      document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`; 
    };
  
    const imgBtns = document.querySelectorAll('.img-item a');
  
    imgBtns.forEach((imgBtn, index) => {
      imgBtn.dataset.id = index + 1; 
  
      imgBtn.addEventListener('click', () => {
        setImgId(parseInt(imgBtn.dataset.id));
      });
    });
  
    slideImage();
  
    window.addEventListener('resize', slideImage);
  
    return () => {
      window.removeEventListener('resize', slideImage);
    };
  }, [imgId]);

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
    // <div>
    //   <h1>Product Detail Page</h1>
    //   <h3>{product.product_name}</h3>
    //   <p>Price: ${product.retail_price}</p>
    //   <p>Quantity: {product.quantity_on_hand}</p>
    //   <p>Product Detail: {product.product_detail}</p>
    // </div>
    <div className='all'>
    <div className='product-container'>
      <div className = "card-wrapper">
      <div className = "card">
        <div className = "product-imgs">
          <div className = "img-display">
            <div className = "img-showcase">
              <img src = {product.image} alt = "toy image"/>
              <img src = 'https://i5.walmartimages.com/asr/b2136392-ee08-4e60-88ff-83b4ac15f8bc.c7838a34676861321f4b6f0c66e790ef.jpeg' alt = "toy image"/>
              <img src = {product.image} alt = "toy image"/>
              <img src = {product.image} alt = "toy image"/>
            </div>
          </div>
          <div className = "img-select">
            <div className = "img-item">
              <a href = "#" data-id = "1">
                <img src = {product.image} alt ="toy image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "2">
                <img src = 'https://i5.walmartimages.com/asr/b2136392-ee08-4e60-88ff-83b4ac15f8bc.c7838a34676861321f4b6f0c66e790ef.jpeg' alt = "toy image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "3">
                <img src = {product.image} alt = "toy image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "4">
                <img src = {product.image} alt = "toy image"/>
              </a>
            </div>
          </div>
        </div>
        <div className = "product-content">
          <h2 className = "product-title">{product.product_name}</h2>
          <div className = "product-rating">
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div className = "product-price">
            <p className = "last-price">Old Price: <span>{product.retail_price}</span></p>
            <p className = "new-price">New Price: <span>{product.vendor_price} (5%)</span></p>
          </div>

          <div className = "product-detail">
            <h2>about this item: </h2>
            <p>{product.product_detail}</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>{product.status}</span></li>
              <li>Category: <span>{product.product_category_id}</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div className = "purchase-info">
          <input
  type="number"
  min="1"
  value={quantity}
  onChange={handleQuantityChange}
/>
            <button type = "button" className = "btn"  onClick={addToCart}>
              Add to Cart <i className = "fas fa-shopping-cart"></i>
            </button>
            <button type = "button" className = "btn">Compare</button>
          </div>

          <div className = "social-links">
            <p>Share At: </p>
            <a href = "#">
              <i className = "fab fa-facebook-f"></i>
            </a>
            <a href = "#">
              <i className = "fab fa-twitter"></i>
            </a>
            <a href = "#">
              <i className = "fab fa-instagram"></i>
            </a>
            <a href = "#">
              <i className = "fab fa-whatsapp"></i>
            </a>
            <a href = "#">
              <i className = "fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    <ProductList products={products} numberOfItemsToShow={5} />
    </div>
    
  );
};

export default ProductDetailPage;