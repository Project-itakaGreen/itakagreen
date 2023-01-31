import React from 'react';
import styled from 'styled-components';


const RightContainer = styled.div`
flex: 1;


`;
const LeftContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 20px;
    background-image: url(./images/bg2.svg);
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: center;
    h1{
      color: green;
      margin-left: -15%;
    }
    button{
      background-color: green;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;  
      cursor: pointer;
      border-radius: 10px;
      margin-top: 20px;
      margin-left: -15%;
    }
    a{
      text-decoration: none;
      color: white;
    }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-image: url(./images/backgoundhome.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

`;


export default () => (
  <Container>

    <LeftContainer>

      <h1> Optez pour une empreinte <br /> numérique responsable <br /> avec Itakagreen</h1>
      <button>
        <a href="#">Installer l'extension</a>
      </button>

    </LeftContainer>
    <RightContainer>
    </RightContainer>
  </Container>

);




