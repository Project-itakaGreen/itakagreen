import React from 'react';
import styled from 'styled-components';
import Layouts from "../components/layouts"

export default function Confidentiality({auth2Token}:any) {
  return (
    
    <Layouts>
      <Container>
        <p>
        Politiques de confidentialité pour les utilisateurs de notre extension de navigateur web:<br/>
        Collecte de données: Nous collectons uniquement les informations nécessaires pour offrir une expérience personnalisée à nos utilisateurs. Les données personnelles que nous collectons incluent l'adresse e-mail et l'identifiant Google de l'utilisateur.<br/>
        Utilisation des données: Les informations collectées sont utilisées uniquement pour améliorer les fonctionnalités et la qualité de notre extension de navigateur. Nous ne partagerons ni ne vendrons jamais vos informations à des tiers.<br/><br/>
        Sécurité des données: Nous prenons la sécurité de vos données très au sérieux et avons mis en place des mesures de sécurité appropriées pour les protéger. Nous utilisons également des protocoles de cryptage pour garantir la confidentialité de vos informations.<br/><br/>
        Stockage des données: Nous stockons vos informations sur des serveurs sécurisés en dehors de votre pays d'origine, mais sous réserve des lois applicables sur la protection des données.<br/><br/>
        Modifications des politiques de confidentialité: Nous nous réservons le droit de modifier ces politiques de confidentialité en tout temps, avec ou sans préavis. Les modifications apportées entreront en vigueur immédiatement après leur publication sur notre site web.<br/><br/>
        Accès et contrôle des données: Vous pouvez accéder à vos informations à tout moment en utilisant la page détail de l'extension. Vous pourrez également y mettre à jour ou supprimer vos informations.<br/><br/>
        Nous respectons votre vie privée et nous engageons à protéger vos informations personnelles en utilisant les meilleures pratiques de l'industrie. Si vous avez des questions sur nos politiques de confidentialité, n'hésitez pas à nous contacter.         
        </p>
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


const Container = styled.div`
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
    height: 96vh;
    p{
      color: green;
      width: 70%;
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