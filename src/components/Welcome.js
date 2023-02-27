import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./Public/WelcomePage";
import RegisterCompany from "./Public/RegisterCompany";
import Tenders from "./Public/Tenders";

const Welcome = (props) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<WelcomePage />} />
                <Route path="/register" element={<RegisterCompany />} />
                <Route path="/tenders" element={<Tenders />} />
            </Routes>
        </BrowserRouter>

    );
}

export default Welcome;