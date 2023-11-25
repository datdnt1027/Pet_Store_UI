import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import '../components/css/UserNavBar.css'
const UserNavbar = ({user}) => {
    const handleLogout = () => {
        sessionStorage.removeItem('user');

  // update state
        user = null;
    };
  return (
    <div className='html'>
    <div className='body'>
    <nav className='nav'>
      <ul className='ul'>
        <li className='li'>
          <span className="material-icons-outlined"><NotificationsNoneIcon/></span> 
        </li>
        <li className='li'>
          <span className="material-icons-outlined"><FavoriteBorderIcon/></span>
        </li> 
        <li className='li'>
          <span className="material-icons-outlined"><ShoppingCartIcon/></span>
        </li>
        <li className='li'>
          <img src="images/profile.png" className="profile" />
          <ul className='ul'>
            {/* <li className="sub-item">
              <span className="material-icons-outlined">grid_view</span>
              <p>Dashboard</p>
            </li> */}
            <li className="sub-item">  
              <span className="material-icons-outlined"><ReceiptIcon/></span>
              <p>My Orders</p> 
            </li>
            <li className="sub-item">
              <span className="material-icons-outlined"><PersonIcon/></span>  
              <p>Update Profile</p>
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