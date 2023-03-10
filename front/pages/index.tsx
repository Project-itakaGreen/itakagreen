import React from 'react';
import styled from 'styled-components';
import Layouts from '../components/layouts';

export default function Home({auth2Token}:any) {
  return (
    <Layouts>
      <Container>
        <LeftContainer>
          <h1> Contrôlez votre empreinte <br /> carbone numérique  <br /> avec Itakagreen</h1>
          <button>
            <a href="#">Installer l&apos;extension</a>
          </button>
        </LeftContainer>
        <RightContainer>
        </RightContainer>
      </Container>
    </Layouts>
  )
};

export async function getServerSideProps(context: { req: { headers: { cookie: string } } }) {
  const cookie =  context.req.headers?.cookie;
  let auth2Token = "";
  if (cookie) {
    const auth2Cookie = context.req.headers.cookie
      .split(';')
      .find((c: string) => c.trim().startsWith('auth2='));
    if (auth2Cookie) {
      auth2Token = auth2Cookie.split('=')[1];
    }
  }
  
  return {
    props: {
      auth2Token: auth2Token || null
    }
  }
}



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
  height: 96vh;
  background-image: url(./images/backgoundhome.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

`;
