
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
  
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#009245',
      color: 'white',
      textAlign: 'center',
      padding: '10px'
    }}>
      <p>Copyright © {new Date().getFullYear()} itakagreen</p>
    </footer>
  );
}

export default Footer;