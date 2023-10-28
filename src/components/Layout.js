import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderOnRoutes = ['/signup']; // Add the paths where you want to hide the header

  const shouldHideHeader = hideHeaderOnRoutes.includes(location.pathname);

  return (
    <div>
      {<Header />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;