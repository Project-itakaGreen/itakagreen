import CardGraph from "../components/shared/CardGraph";
import TableWithPagination from "../components/shared/TableWithPagination";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import DeleteUser from "../components/shared/DeleteUser";
import { requestApiData } from "../utils/queryHelper";
import Layouts from "../components/layouts";


export default function Details({ auth2Token }: any) {
  const KEEP_VALUES = 10;

  const backUrl = process.env.BACK_URL;

  const [dataDay, setDataDay] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataDomain, setDataDomain] = useState([]);
  const [dataDomainMonth, setDataDomainMonth] = useState([]);
  const [dataTab, setDataTab] = useState([]);
  const [dataTotal, setDataTotal]= useState([]);

  useEffect(() => {
    requestApiData(backUrl + "/api/conso/domain/1", auth2Token).then(
      (result) => {
        setDataDay(result);
      }
    );
    requestApiData(backUrl + "/api/conso/dayDetail", auth2Token).then(
      (result) => {
        setDataWeek(result);
      }
    );
    requestApiData(backUrl + "/api/conso/dayDetail/30", auth2Token).then(
      (result) => {
        setDataMonth(result);
      }
    );
    requestApiData(backUrl + "/api/conso/domain/7", auth2Token).then(
      (result) => {
        setDataDomain(result);
      }
    );
    requestApiData(backUrl + "/api/conso/domain/30", auth2Token).then(
      (result) => {
        setDataDomainMonth(result);
      }
    );
    requestApiData(backUrl + "/api/conso/domains", auth2Token).then(
      (result) => {
        setDataTab(result);
      }
    );
    requestApiData(backUrl + "/api/conso/total", auth2Token).then(
      (result) => {
        setDataTotal(result);
      }
    );
  }, [auth2Token, backUrl]);

  if (!dataDay || !dataWeek || !dataMonth || !dataDomain || !dataDomainMonth || !dataTab || !dataTotal ) {
    return <div>Loading...</div>;
  }

  const chartDayLabel = dataDay.map((e: { domain: any }) => e.domain);
  const chartDayData = dataDay.map((e: { co2: any }) => e.co2);

  const chartWeekLabel = dataWeek.map((e: { day: any }) => e.day);
  const chartWeekData = dataWeek.map((e: { totalCo2: any }) => e.totalCo2);

  const chartMonthLabel = dataMonth.map((e: { day: any }) => e.day);
  const chartMonthData = dataMonth.map((e: { totalCo2: any }) => e.totalCo2);

  const chartDomainLabel = dataDomain.map((e: { domain: any }) => e.domain);
  const chartDomainData = dataDomain.map((e: { co2: any }) => e.co2);


  const chartDomainMonthLabel = dataDomainMonth.map(
    (e: { domain: any }) => e.domain
  );
  const chartDomainMonthData = dataDomainMonth.map((e: { co2: any }) => e.co2);

  const allDomainArrayWeek = dataWeek.map((e: any) => {
    let domainString = new Array("\n");

    let calculCo2 = 0;

    e.domains.map((domain: any, index: number) => {
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

  const allDomainArrayMonth = dataMonth.map((e: any) => {
    let domainString = new Array("\n");

    let calculCo2 = 0;

    e.domains.map((domain: any, index: number) => {
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
  const afterBodyWeek = (context: any) => {
    return allDomainArrayWeek[context[0].dataIndex];
  };

  const afterBodyMonth = (context: any) => {
    return allDomainArrayMonth[context[0].dataIndex];
  };

  const arrayType = ["bar", "doughnut", "pie", "line", "polarArea", "radar"];

  return (
    <>
    <Layouts>
      <SectionGraphique>
        <h1> Suivez votre impact num??rique en d??tails </h1>
        <ContainerGraphGlobal>
          <ContainerGraph>
            <CardGraph
              chartLabel={chartDayLabel}
              chartData={chartDayData}
              type={arrayType[0]}
            >
              <h3>
                Votre consommation <span>aujourd&apos;hui</span>
              </h3>
            </CardGraph>
          </ContainerGraph>
          <ContainerGraph>
            <CardGraph
              chartLabel={chartWeekLabel}
              chartData={chartWeekData}
              type={arrayType[0]}
              afterBody={afterBodyWeek}
            >
              <h3>
                Votre consommation des <span> 7 derniers jours</span>
              </h3>
            </CardGraph>
          </ContainerGraph>
          <ContainerGraph>
            <CardGraph
              chartLabel={chartMonthLabel}
              chartData={chartMonthData}
              type={arrayType[3]}
              afterBody={afterBodyMonth}
            >
              <h3>
                Votre consommation des <span> 30 derniers jours</span>
              </h3>
            </CardGraph>
          </ContainerGraph>
        </ContainerGraphGlobal>
        </SectionGraphique>
        <SectionGraphique2>
        <ContainerGraphGlobal>
          <ContainerGraph>
            <CardGraph
              chartLabel={chartDomainLabel}
              chartData={chartDomainData}
              type={arrayType[0]}
            >
              <h3>
                Votre consommation par domaines des{" "}
                <span> 7 derniers jours</span>
              </h3>
            </CardGraph>
          </ContainerGraph>
          <ContainerGraph>
            <CardGraph
              chartLabel={chartDomainMonthLabel}
              chartData={chartDomainMonthData}
              type={arrayType[3]}
            >
              <h3>
                Votre consommation par domaines des{" "}
                <span> 30 derniers jours</span>
              </h3>
            </CardGraph>
          </ContainerGraph>
          </ContainerGraphGlobal>
          </SectionGraphique2>
      
      <SectionTab>
        <TabContaire>
          <TableWithPagination
            data= {dataTab}
            dataTotal = {dataTotal}
            auth = {auth2Token}
        />
        </TabContaire>
      </SectionTab>

      <SectionDeleteUser>
        <DeleteUser
        auth = {auth2Token}
        />
      </SectionDeleteUser>
      </Layouts>
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

const SectionTab = styled.div`
  background-image: url("./images/section3.svg");
  background-repeat: no-repeat;
  background-size: cover;
  display : flex;
  align-items: center;
  
  width: 100%;
  height: 100vh;
`;

const SectionGraphique = styled.div`
  background-image: url("./images/section1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  h1 {
    text-align: center;
    font-size: 30px;
    color: white;
    padding-top: 120px;
    padding-bottom: 70px;
  }
`;
const SectionGraphique2 = styled.div`
  background-image: url("./images/section2.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

const TabContaire = styled.div`
  width: 70%;
  height: auto;
  margin-left: 50px;
  margin-right: 50px;
  background-color: #e8fceb;
  border: 1px solid green;
  border-radius: 10px 10px 0px 0px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: -50%;
`;

const ContainerGraphGlobal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const ContainerGraphGlobal2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 10vh;

`;

const SectionDeleteUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-bottom: 20%;
`;

const ContainerGraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 20px;
  background-color: white;
  border: 1px solid green;
  border-radius: 10px;
  width: 500px;
  height: 500px;
  margin: 20px;
`;
