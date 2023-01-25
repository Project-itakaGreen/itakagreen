import { randomInt } from "crypto";
import CardGraph from "../components/shared/CardGraph";
import DomainDTO from "../interfaces/domainDTO";

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
  const arrayType = ['bar','doughnut','pie','line','polarArea','radar'];
  const type=arrayType[Math.floor(Math.random()*arrayType.length)]; // bar doughnut pie line polarArea radar
  
  return (
    <>
      <h1>Super graph - Not for sale</h1>

      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type}/>
    </>
  );
}
