import styled from "styled-components";

export default function SearchBar() {

    return(
        <WrapperSearch> 
            <form action="http://www.google.com/search" method="get" target="_blank">
                <input type="text" name="q" required/>
                <input type="submit" value="Search" />
            </form>
        </WrapperSearch>  
    );
}


const WrapperSearch = styled.div`
   input{
        height:30px;
    }
    input[type=text]
    {
        width:500px;
    }
    input[type=submit]
    {
        width:100px;
    }
    `;

