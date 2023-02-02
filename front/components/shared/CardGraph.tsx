import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

export default function CardGraph({ chartLabel, chartData, type }: any) {

  const backgroundColor = [
    "rgba(230, 25, 75, 0.5)",
    "rgba(245, 130, 48, 0.5)",
    "rgba(255, 225, 25, 0.5)",
    "rgba(210, 245, 60, 0.5)",
    "rgba(70, 240, 240, 0.5)",
    "rgba(0, 130, 200, 0.5)",
    "rgba(240, 50, 230, 0.5)",
    "rgba(128, 128, 128, 0.5)",
  ];

  const borderColor = [
    "rgba(230, 25, 75, 1)",
    "rgba(245, 130, 48, 1)",
    "rgba(255, 225, 25, 1)",
    "rgba(210, 245, 60, 1)",
    "rgba(70, 240, 240, 1)",
    "rgba(0, 130, 200, 1)",
    "rgba(240, 50, 230, 1)",
    "rgba(128, 128, 128, 1)",
  ];


  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "emission CO2 Kg",
        data: chartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
  }

  return (
    <WrapperGraph>

      <h3>Votre consomation par <span>jours</span> </h3>
      <Chart type={type} data={data} options={options} height={400} width={400}/>
    </WrapperGraph>
  );
}

const WrapperGraph = styled.div`
  width:300;
  height:300;
  h3{
    text-align: center;
    color: #009245;
  }
  span{
    color: green;
    font-size: 1.5em;
  }
`;


