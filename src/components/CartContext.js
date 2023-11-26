import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from local storage on initialization
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save updated cart items to local storage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      const newItem = { product, quantity };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};