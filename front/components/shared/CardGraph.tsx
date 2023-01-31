import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

export default function CardGraph({ chartLabel, chartData, type }: any) {
  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "emission CO2 Kg",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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


