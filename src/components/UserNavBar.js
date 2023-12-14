import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import '../components/css/UserNavBar.css';

const UserNavbar = ({ onLogout }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [profile, setProfile] = useState();
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout callback function from the parent component
    navigate('/');
  };
  useEffect(() => {
    const authTokenString = localStorage.getItem('user'); // Retrieve the token from localStorage
    const authToken = JSON.parse(authTokenString).token;
    console.log(authToken);
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(apiConfig.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProfile(response.data);
        setAvatar(response.data.avatar);
        console.log(response.data.avatar);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);
  const handleCartMouseEnter = () => {
    setIsCartOpen(true);
    console.log('Cart Open');
  };

  const handleCartMouseLeave = () => {
    setIsCartOpen(false);
    console.log('Cart Closed');
  };

  return (
    <div className='bhtml'>
      <div className='bbody'>
        <nav className='nav'>
          <ul className='ul'>
            <li className='li'>
              <span className="material-icons-outlined"><NotificationsNoneIcon/></span> 
            </li>
            <li className='li'>
              <span className="material-icons-outlined"><FavoriteBorderIcon/></span>
            </li> 
            <li className='li' onMouseEnter={handleCartMouseEnter} onMouseLeave={handleCartMouseLeave}>
              <a href='/checkout'>
                <span className="material-icons-outlined">
                  <ShoppingCartIcon/>
                </span>
              </a>
            </li>
            <li className='li'>
              
              <img src={avatar} className="profile" />
              <ul className='ul'>
                {/* <li className="sub-item">
                  <span className="material-icons-outlined">grid_view</span>
                  <p>Dashboard</p>
                </li> */}
                <li className="sub-item">  
                  <span className="material-icons-outlined"><ReceiptIcon/></span>
                  <a href='/orders'><p>My Orders</p> 
                  </a>
                </li>
                <li className="sub-item">
                  <span className="material-icons-outlined"><PersonIcon/></span>  
                  <a href='/profile'>
                  <p>Update Profile</p>
                  </a>
                </li>
                <li className="sub-item">
                  <span className="material-icons-outlined"><LogoutIcon/></span>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserNavbar;