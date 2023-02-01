import CardGraph from "../components/shared/CardGraph";
import TableWithPagination from "../components/shared/TableWithPagination";
import styled from "styled-components";
import React from "react";

export default function Details() {
  const KEEP_VALUES = 3;

  const data = [
    {
      day: "20/01/2023",
      domains: [{ name: "twitter", co2: 35 }],
      totalCo2: 35,
    },
    {
      day: "21/01/2023",
      domains: [{ name: "twitter", co2: 10 }],
      totalCo2: 10,
    },
    {
      day: "23/01/2023",
      domains: [
        { name: "youtube", co2: 54 },
        { name: "chatgpt", co2: 35 },
      ],
      totalCo2: 89,
    },
    { day: "24/01/2023", domains: [{ name: "youtube", co2: 6 }], totalCo2: 6 },
    {
      day: "25/01/2023",
      domains: [
        { name: "youtube", co2: 60 },
        { name: "twitter", co2: 45 },
        { name: "chatgpt", co2: 35 },
        { name: "google", co2: 33 },
        { name: "mozilla", co2: 63 },
        { name: "twitter", co2: 13 },
      ],
      totalCo2: 173,
    },
  ];
  const chartLabel = data.map((e) => e.day);
  const chartData = data.map((e) => e.totalCo2);

  const allDaysdomainsArray = data.map((e) => {
    let domainString = new Array("\n");

    let calculCo2 = 0;

    e.domains.map((domain, index) => {
      if (index < KEEP_VALUES)
        domainString.push(domain.name + " : " + domain.co2 + " grammes \n");
      else calculCo2 += domain.co2;
    });

    if (e.domains.length > KEEP_VALUES)
      domainString.push(
        "et " +
          e.domains.slice(KEEP_VALUES).length +
          " autres : " +
          calculCo2 +
          " grammes"
      );

    domainString.push("\n");

    return domainString;
  });

  const arrayType = ["bar", "doughnut", "pie", "line", "polarArea", "radar"];

  const afterBody = (context: any) => {
    return allDaysdomainsArray[context[0].dataIndex];
  };

  return (
    <>
      <h1>Super graph - Not for sale</h1>
      <ContainerGraphGlobal>
        <ContainerGraph>
          <CardGraph
            chartLabel={chartLabel}
            chartData={chartData}
            type={arrayType[0]}
            afterBody={afterBody}
          />
        </ContainerGraph>
        <ContainerGraph>
          <CardGraph
            chartLabel={chartLabel}
            chartData={chartData}
            type={arrayType[1]}
            afterBody={afterBody}
          />
        </ContainerGraph>
      </ContainerGraphGlobal>
      <ContainerGraphGlobal2>
        <ContainerGraph>
          <CardGraph
            chartLabel={chartLabel}
            chartData={chartData}
            type={arrayType[2]}
            afterBody={afterBody}
          />
        </ContainerGraph>
        <ContainerGraph>
          <CardGraph
            chartLabel={chartLabel}
            chartData={chartData}
            type={arrayType[3]}
            afterBody={afterBody}
          />
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
`;
