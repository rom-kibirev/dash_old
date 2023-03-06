import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Public/Welcome";
import RegisterCompany from "./Public/Registration/RegisterCompany";
import Tenders from "./Public/Tenders";
import RegistrationSuccess from "./Public/Registration/RegistrationSuccess";
import CreatePassword from "./Public/Registration/CreatePassword";
import Payment from "./Public/Registration/Payment";
import PayCards from "./Public/Registration/payCards";

const PublicRotes = (props) => {

    const [chosenTariff, setChosenTariff] = useState();
    const serverUrl = 'http://localhost:8000/';

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Welcome serverUrl={serverUrl} setChosenTariff={setChosenTariff}/>} />
                <Route path="/registration-company" element={<RegisterCompany serverUrl={serverUrl} chosenTariff={chosenTariff} />} />
                <Route path="/registration-success" element={<RegistrationSuccess />} />
                <Route path="/create-password" element={<CreatePassword serverUrl={serverUrl} />} />
                <Route path="/payment" element={<Payment serverUrl={serverUrl} />} />
                <Route path="/payCards" element={<PayCards />} />
                <Route path="/tenders" element={<Tenders serverUrl={serverUrl} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRotes;