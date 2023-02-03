
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <footer style={{
  
      left: 0,
      bottom: 0,
      width: '100%',
      height: '20px',
      backgroundColor: '#009245',
      color: 'white',
      textAlign: 'center',
      padding: '10px'
    }}>
      <p>Copyright © {new Date().getFullYear()} itakagreen</p>
      <Confidentiality>
        <a href="/confidentiality">Politiques de confidentialité</a>
      </Confidentiality>
    </footer>
  );
}

export default Footer;

const Confidentiality = styled.div`
  position: relative;
  right: 30px;
  top: -18px;
  text-align: end;
  a{
    color: white;
  }
`;
