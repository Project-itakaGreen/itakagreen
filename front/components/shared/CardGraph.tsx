import styled from "styled-components"
import DomainDTO from "../../interfaces/domainDTO"

export default function CardGraph({chartData}: DomainDTO)
{
    console.log(chartData);
    return(

         <WrapperGraph>
            <p>
                It's my graph
               
            </p>
        </WrapperGraph>
    )
}

const WrapperGraph = styled.div`
    background-color: red;
`
