import React from 'react';
import Header from './Shared/Navbar';
import Footer from './Shared/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
