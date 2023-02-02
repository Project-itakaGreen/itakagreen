import CardGraph from "../components/shared/CardGraph";
import TableWithPagination from "../components/shared/TableWithPagination";
import styled from 'styled-components';
import React from 'react';


export default function Search() {
  const data = [
    { date: "19/01/2023", co2: 15 },
    { date: "20/01/2023", co2: 35 },
    { date: "21/01/2023", co2: 10 },
    { date: "23/01/2023", co2: 89 },
    { date: "24/01/2023", co2: 6 },
    { date: "25/01/2023", co2: 173 },
  ];
  const chartLabel = data.map((e) => e.date);
  const chartData = data.map((e) => e.co2);
  const arrayType = ['bar','doughnut','pie','line','polarArea','radar',];
  const type=arrayType; // bar doughnut pie line polarArea radar

  return (
    <>
      <h1>Super graph - Not for sale</h1>
      <ContainerGraphGlobal>
      <ContainerGraph>
      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type[0]}/>
      </ContainerGraph>
      <ContainerGraph>
      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type[0]}/>
      </ContainerGraph>
      </ContainerGraphGlobal>
      <ContainerGraphGlobal2>
      <ContainerGraph>
      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type[2]}/>
      </ContainerGraph>
      <ContainerGraph>
      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type[1]}/>
      </ContainerGraph>
      </ContainerGraphGlobal2>
      <TabContaire>
      <TableWithPagination />
    </TabContaire>

    </>
  );
}

const TabContaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  `;



const ContainerGraphGlobal2 = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
background-image: url(./images/bgdh.svg);
background-repeat: no-repeat;
background-size: cover;
background-position: center;
background-opacity: 0.5;

`;




const ContainerGraphGlobal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  background-image: url(./images/bgd.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-opacity: 0.5;
  
  `;
  


const ContainerGraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-image: url(./images/bg2.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  width: 500px;
  margin-right: 20px;
  padding: 20px;

  cardGraph {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }


`;