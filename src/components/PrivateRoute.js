import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';
function useAuth() {

    const [user, setUser] = useState();
  
    useEffect(() => {
      const suser = sessionStorage.getItem('user');
      if(suser) {
        // api call to verify token
        setUser(suser); 
      }
    }, []);
  
    return {
      user
    }
  }

  async function  verifyRole(token) {
    //Them api khi no rep
    //const response = await axios.post(endpoints.FORGOT, payload);
  
  }

const PrivateRoute = ({children}) => {
    
    const auth = useAuth(); // custom auth hook
    const navigate = useNavigate();
    useEffect(() => {
    if(!auth.user) {
        console.log("Khong co tai khoan")
        navigate("/login");
    }
    else {
      const isAdmin = verifyRole(auth.user.token);
      if (verifyRole)
      {
        return children;
      }
      console.log("Khong phai admin.")
    }
   },[])
    
  }
  export default PrivateRoute;