import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';

const PrivateRoute = ({children}) => {
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    //console.log(useAuth());
    const auth = user;
    console.log(auth);
    //console.log("TK: "+auth);
    const navigate = useNavigate();

    useEffect(() => {
    if(!auth) {
        console.log("Khong co tai khoan")
        navigate("/login");
    }
   },[auth])
   return auth ? children : null;
  }
  export default PrivateRoute;