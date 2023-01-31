import CardGraph from "../components/shared/CardGraph";

export default function Search() {
  const data = [
    { date: "19/01/2023", co2: 15 },
    { date: "20/01/2023", co2: 35 },
    { date: "21/01/2023", co2: 10 },
    { date: "23/01/2023", co2: 89 },
    { date: "24/01/2023", co2: 6 },
    { date: "25/01/2023", co2: 173 },
  ];

  const compareSentences=[
    {kilo:0.03, text:"Vous avez consommé l'équivalent d'un trajet de 10km en metro"},
    {kilo:0.1, text:"Vous avez consommé l'équivalent d'un trajet de 10km en vélo à assistance électrique"},
    {kilo:0.8, text:"Vous avez consommé l'équivalent d'un trajet de 10km en scooter"},
    {kilo:1, text:"Vous avez consommé l'équivalent d'un trajet 1km de en voiture électrique"},
    {kilo:2, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en TGV"},
    {kilo:2.5, text:"Vous avez consommé l'équivalent d'un trajet de 12km en voiture"},
    {kilo:3, text:"Vous avez consommé l'équivalent d'un trajet de 102km en autocar ou 0.4 repas avec du boeuf"},
    {kilo:10, text:"Vous avez consommé l'équivalent d'un trajet de 97km en voiture électrique"},
    {kilo:27, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en autocar"},
    {kilo:38, text:"Vous avez consommé l'équivalent d'un an de chauffage au gaz naturel"},
    {kilo:68, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en co-voiturage"},
    {kilo:85, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en avion"},
    {kilo:100, text:"Vous avez consommé l'équivalent de 196 repas végétarien ou 42373km  en TGV"},
    {kilo:150, text:"Vous avez consommé l'équivalent d'un trajet Paris-Marseille en voiture"},
    {kilo:200, text:"Vous avez consommé l'équivalent de 392 repas végétarien ou 28 repas avec du boeuf"},
    {kilo:250, text:"Vous avez consommé l'équivalent d'un trajet de 2 418km en voiture"},
  ]
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
