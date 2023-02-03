import React from 'react';
import styled from 'styled-components';

import Layouts from '../components/layouts';

export default function Infos() {
  return (
    <Layouts>
      <Container>
        <LeftContainer>
          <p> Notre extension de navigateur web révolutionnaire permet à ses utilisateurs de connaître l&apos;impact environnemental de leur navigation sur Internet. Conçue pour calculer l&apos;empreinte carbone en CO2 de chaque site visité, elle offre une vision transparente des conséquences écologiques de nos actions en ligne. <br/><br/>
              En utilisant des algorithmes avancés, notre extension est capable de mesurer la consommation énergétique nécessaire pour charger les sites web et d&apos;afficher cette information sous forme de données faciles à comprendre. De plus, elle permet aux utilisateurs de suivre leur propre consommation énergétique au fil du temps, leur permettant de prendre des mesures concrètes pour réduire leur impact sur l&apos;environnement.<br/><br/>
              Notre extension est conçue pour être simple à utiliser, sans configuration complexe ni utilisation excessive des données personnelles. Elle s&apos;intègre parfaitement à votre navigateur web existant et est disponible pour toutes les plateformes, y compris Windows, Mac et Linux.<br/><br/>
              En utilisant notre extension, vous contribuez à la création d&apos;un futur plus durable en réduisant votre empreinte carbone et en encourageant les entreprises à adopter des pratiques plus respectueuses de l&apos;environnement. Rejoignez la communauté de nos utilisateurs satisfaits et découvrez comment la navigation sur Internet peut être plus verte aujourd&apos;hui.</p>
          <button>
            <a href="mailto:a.de-cillia@it-students.fr">Contactez nous</a>
          </button>

        </LeftContainer>
        <RightContainer>
        </RightContainer>
      </Container>
    </Layouts>

  );
};


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 96vh;
  background-image: url(./images/backgoundhome.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 5%;
  margin-right: -15%;
  background-image: url(./images/bg2.svg);
  background-repeat: no-repeat;
  background-size: 150%;
  background-position: right;
  p{
    color: green;
    width: 70%;
    margin-left: -20%;
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

const RightContainer = styled.div`
  flex: 1;
`;