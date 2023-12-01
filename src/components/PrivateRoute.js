import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import endpoints from '../config/apiConfig'
import axios from 'axios';
function useAuth() {

    const [user, setUser] = useState();
  
    useEffect(() => {
      const suser = JSON.parse(localStorage.getItem('user'));
      //console.log("1. sus"+suser);
      //console.log(suser);
      if(suser) {
        // api call to verify token
        //console.log("suser ẽist");
        setUser(suser); 
      }
    }, []);
    console.log("user"+user);
    return user;
  }



const PrivateRoute = ({children}) => {
    //console.log(useAuth());
    const auth = useAuth(); // custom auth hook
    //console.log("TK: "+auth);
    const navigate = useNavigate();

    useEffect(() => {
    // if(!auth) {
    //     console.log("Khong co tai khoan")
    //     navigate("/login");
    // }
   },[auth])
   return auth ? children : null;
  }
  export default PrivateRoute;