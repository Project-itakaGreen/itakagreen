import CardGraph from "../components/shared/CardGraph";

export default function Details() {
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
      ],
      totalCo2: 173,
    },
  ];
  const chartLabel = data.map((e) => e.day);
  const chartData = data.map((e) => e.totalCo2);
  const allDaysdomainsArray=data.map(e=>{
        let domainString="\n";
        e.domains.map(domain=>{
            domainString += domain.name+" : "+domain.co2+" grammes \n";
        })
        return domainString
    });

  const arrayType = ["bar", "doughnut", "pie", "line", "polarArea", "radar"];
  const type = arrayType[Math.floor(Math.random() * arrayType.length)]; // bar doughnut pie line polarArea radar
  const afterBody = (context:any)=>
  {
    return allDaysdomainsArray[context[0].dataIndex];
  }

  return (
    <>
      <h1>User Details</h1>

      <CardGraph chartLabel={chartLabel} chartData={chartData} type={type} afterBody={afterBody}/>
    </>
  );
}
