import Footer from "./Footer";
import Header from "./Header";
import Props from "../../interfaces/props";

const Layouts: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header/>

            {children}

            <Footer/>
        </>
    )
};

export default Layouts;