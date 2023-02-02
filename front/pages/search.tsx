import SearchBar from "../components/search/SearchBar";
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
  const chartLabel = data.map((e) => e.date);
  const chartData = data.map((e) => e.co2);
  const arrayType = ['bar','doughnut','pie','line','polarArea','radar'];
  const type=arrayType[Math.floor(Math.random()*arrayType.length)]; // bar doughnut pie line polarArea radar
  const compareSentences=[
    {kiloCo2:0.03, text:"Vous avez consommé l'équivalent d'un trajet de 10 km en metro"},
    {kiloCo2:0.1, text:"Vous avez consommé l'équivalent d'un trajet de 10 km en vélo à assistance électrique"},
    {kiloCo2:0.8, text:"Vous avez consommé l'équivalent d'un trajet de 10 km en scooter"},
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
  
  return (
    <>
      <h1>Super graph - Not for sale</h1>

      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type}/>

      <SearchBar/>
    </>
  );
}
