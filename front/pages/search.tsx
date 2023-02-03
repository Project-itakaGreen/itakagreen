import { useEffect, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import { requestApiData } from "../utils/queryHelper";
import styled from "styled-components";
import Footer from "../components/layouts/Footer";
import React from 'react';


interface StyledDivProps {
  backgroundPath: string;
}

export default function Search({ auth2Token}: any) {
  const backUrl = process.env.BACK_URL;
  
  const [dataConso, setDataConso] = useState({userId: Number, totalCo2: String});
  const [backgroundPath, setBackgroundPath] = useState("bgS1.svg");

  useEffect(() => {
    async function fetchConso(){
      await requestApiData(backUrl + "/api/conso/total/7", auth2Token).then((result) => {
       setDataConso(result);
       setBackgroundPath(backgroundSelector(result));
      });}
      fetchConso();
  }, [auth2Token, backUrl]);
  
  if (!dataConso) {
    return <div>Loading...</div>;
  }

  const totalCo2 = Math.floor( Number(dataConso.totalCo2)*100)/100;
  
  const compareSentences=[
    {kiloCo2:0.01, text:"Vous avez consommé l'équivalent d'un trajet de 4,2 km en tgv"},
    {kiloCo2:0.02, text:"Vous avez consommé l'équivalent d'un trajet de 1,9 km en vélo électrique"},
    {kiloCo2:0.03, text:"Vous avez consommé l'équivalent d'un trajet de 11 km en metro"},
    {kiloCo2:0.04, text:"Vous avez consommé l'équivalent d'un trajet de 1,4 km en autocar"},
    {kiloCo2:0.05, text:"Vous avez consommé l'équivalent d'un trajet de 500 m en voiture électrique"},
    {kiloCo2:0.06, text:"Vous avez consommé l'équivalent d'un trajet de 6 km en trottinette électrique"},
    {kiloCo2:0.07, text:"Vous avez consommé l'équivalent d'un trajet de 26 km en métro ou 7 km en vélo électrique"},
    {kiloCo2:0.08, text:"Vous avez consommé l'équivalent d'un trajet de 1,1 km en scooter ou 34 km en tgv"},
    {kiloCo2:0.09, text:"Vous avez consommé l'équivalent d'un trajet de 3,1 km en autocar ou 33 km en métro"},
    {kiloCo2:0.1, text:"Vous avez consommé l'équivalent d'un trajet de 9 km en vélo à assistance électrique"},
    {kiloCo2:0.2, text:"Vous avez consommé l'équivalent d'un trajet de 1,9 km en voiture électrique ou 73 km en métro"},
    {kiloCo2:0.3, text:"Vous avez consommé l'équivalent d'un trajet de 127 km en tgv ou 1,4 km en voiture"},
    {kiloCo2:0.4, text:"Vous avez consommé l'équivalent d'un trajet de 5 km en scooter ou 1 repas végétalien"},
    {kiloCo2:0.5, text:"Vous avez consommé l'équivalent de la production de 1,1 litre d'eau en bouteille ou 7 km en scooter"},
    {kiloCo2:0.6, text:"Vous avez consommé l'équivalent d'un trajet de 254 km en tgv ou 1,2 repas végétarien"},
    {kiloCo2:0.7, text:"Vous avez consommé l'équivalent d'un trajet 3,2 km en voiture ou 24 km en autocar"},
    {kiloCo2:0.8, text:"Vous avez consommé l'équivalent d'un trajet de 8 km en voiture électrique ou 2 repas végétalien"},
    {kiloCo2:0.9, text:"Vous avez consommé l'équivalent d'un trajet de 84 km en trottinette électrique ou 4,1 km en voiture"},
    {kiloCo2:1, text:"Vous avez consommé l'équivalent d'un trajet 1 km de en voiture électrique"},
    {kiloCo2:2, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en TGV"},
    {kiloCo2:2.5, text:"Vous avez consommé l'équivalent d'un trajet de 12 km en voiture"},
    {kiloCo2:3, text:"Vous avez consommé l'équivalent d'un trajet de 102 km en autocar ou 0.4 repas avec du boeuf"},
    {kiloCo2:10, text:"Vous avez consommé l'équivalent d'un trajet de 97 km en voiture électrique"},
    {kiloCo2:27, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en autocar"},
    {kiloCo2:38, text:"Vous avez consommé l'équivalent d'un an de chauffage au gaz naturel"},
    {kiloCo2:68, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en co-voiturage"},
    {kiloCo2:85, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en avion"},
    {kiloCo2:100, text:"Vous avez consommé l'équivalent de 196 repas végétarien ou 42373 km en TGV"},
    {kiloCo2:150, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en voiture"},
    {kiloCo2:200, text:"Vous avez consommé l'équivalent de 392 repas végétarien ou 28 repas avec du boeuf"},
    {kiloCo2:250, text:"Vous avez consommé l'équivalent d'un trajet de 2 418 km en voiture électrique ou 34 repas avec du boeuf"},
    {kiloCo2:300, text:"Vous avez consommé l'équivalent d'un trajet de 1379 km en voiture ou 1 274 783 go de donnée stockées pendant 1 an"},
    {kiloCo2:350, text:"Vous avez consommé l'équivalent de 6 857 recherche sur le web ou 48 repas avec du boeuf"},
    {kiloCo2:400, text:"Vous avez consommé l'équivalent de 13 smartphones ou 1732 km en avion"},
    {kiloCo2:450, text:"Vous avez consommé l'équivalent d'un trajet de 1957 km en avion ou 62 repas avec du boeuf"},
    {kiloCo2:500, text:"Vous avez consommé l'équivalent d'un trajet de 2 298 km en voiture ou 21 jeans"},
    {kiloCo2:550, text:"Vous avez consommé l'équivalent d'un trajet de 233 051 km en TGV ou 90 teeshirts en coton"},
    {kiloCo2:600, text:"Vous avez consommé l'équivalent d'un trajet de 2 757 km en voiture ou  1539 repas végétalien"},
    {kiloCo2:650, text:"Vous avez consommé l'équivalent de 14 aspirateurs ou 2827 km en avion"},
    {kiloCo2:700, text:"Vous avez consommé l'équivalent de 443 repas avec du poulet ou 96 repas avec du boeuf"},
    {kiloCo2:750, text:"Vous avez consommé l'équivalent de 14 694 recherche sur le web ou 3 447 km en voiture"},
    {kiloCo2:800, text:"Vous avez consommé l'équivalent d'un trajet de 3 479 km en avion ou 2051 repas végétalien"},
    {kiloCo2:900, text:"Vous avez consommé l'équivalent de 124 repas avec du boeuf ou 1765 repas végétarien"},
    {kiloCo2:1000, text:"Vous avez consommé l'équivalent d'un trajet de 33 989 km en autocar ou 42 jeans"},
    {kiloCo2:1100, text:"Vous avez consommé l'équivalent de 17 183 heures de streaming video ou 2821 repas végétalien"},
    {kiloCo2:1200, text:"Vous avez consommé l'équivalent d'un trajet de 5 218 km en avion soit 760 repas avec du poulet"},
  ]
  
   const comparaisonSentence = comparaisonSelector(totalCo2, compareSentences);

  return (
    <>
    <Container backgroundPath={backgroundPath}>
      <Logo src="./images/logovw.svg" alt="Logo" />
        <Nav>
          <IconLink href="/details">
            <span className="material-symbols-sharp">
              settings
            </span>
          </IconLink>
        <IconLink href="/infos">
          <span className="material-symbols-sharp">
            info
          </span>
        </IconLink>
        </Nav>
        <SearchBar/>
        <InfoConso>
          <p>Votre navigation web a consommé <span>{ String(totalCo2)}</span> grammes de Co2.</p>
          <p>{comparaisonSentence}</p>
          <p className="credit">Source <a href="https://impactco2.fr/"> impactco2.fr</a></p>
        </InfoConso>
      </Container>
    <Footer/>
    </>
  );
}

export async function getServerSideProps(context: {
  req: { headers: { cookie: string } };
}) {
  const cookie = context.req.headers?.cookie;
  let auth2Token = "";
  if (cookie) {
    const auth2Cookie = context.req.headers.cookie
      .split(";")
      .find((c: string) => c.trim().startsWith("auth2="));
    if (auth2Cookie) {
      auth2Token = auth2Cookie.split("=")[1];
    }
  }

  return {
    props: {
      auth2Token: auth2Token || null,
    },
  };
}

const Container = styled.div<StyledDivProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96vh;
  background-image: url(./images/${props=> props.backgroundPath});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Nav = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const Logo = styled.img`
  margin-right: 25%;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  margin-bottom: 50px;
`;


const IconLink = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  color: #939191;
  padding: 5px;
  &:hover {
    color: #6a6a6a;
  }
`;

const InfoConso = styled.div`
    background-color: #ffffffbd;
    width: 642.5px;
    height: 200px;
    margin: 15vh auto 0 auto;
    border-radius: 20px;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
    padding: 15px;
    text-align: center;
  p{
    color: green;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    span {
      font-size: 30px;
    }
  }
  .credit {
    font-size: 10px;
    margin-top: 46px;
    flex-direction: row;
    justify-content: center;
  }
`;

function backgroundSelector(dataConso: {userId: any, totalCo2: any}) {
  if (Number(dataConso.totalCo2) <= 100) {
    return "bgS1.svg";
  }
  else if (Number(dataConso.totalCo2) > 100 && Number(dataConso.totalCo2) <= 200) {
    return "bgS2.svg";
  }
  else if (Number(dataConso.totalCo2) > 200 && Number(dataConso.totalCo2)<= 300) {
    return "bgS3.svg";
  }
  else if (Number(dataConso.totalCo2) > 300) {
    return "bgS4.svg";
  }
  return "bgS1.svg"
}

 function comparaisonSelector(totalCo2: any, compareSentences: any) {
  for (const sentence of compareSentences) { 
    if (sentence.kiloCo2 >= Number(totalCo2/1000) ) {
      return sentence.text;
    }
  }
}

