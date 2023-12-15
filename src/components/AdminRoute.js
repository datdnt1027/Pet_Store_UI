import { useNavigate, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';

const AdminRoute = ({ children }) => {
  const storedUser = sessionStorage.getItem('admin');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const auth = user;
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!auth) {
      navigate("/admin/login");
    } else {
      setShouldRender(true);
    }
  }, [auth]);

  if (!shouldRender) {
    return null;
  }

  if(user) {
  return children;
}
}

export default AdminRoute;