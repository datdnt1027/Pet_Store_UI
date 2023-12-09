import { useNavigate, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const auth = user;
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
      setShouldRender(true);
    }
  }, [auth]);

  if (!shouldRender) {
    return null;
  }

  return children;
}

export default PrivateRoute;