import CardGraph from "../components/shared/CardGraph";
import DomainDTO from "../interfaces/domainDTO";


export default function Search()
{
    const data= {
        "google": 45,
        "youtube": 34,
        "monSite": 12
    };
    return(
        <>
            <p>
                ggfrefd
            </p>

            <CardGraph chartData={data}/>

        </>
    )
}