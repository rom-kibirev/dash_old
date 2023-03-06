import {useEffect, useState} from 'react';
import Header from "./Header";
import Page from "../UI/Sections/Page";
import Button from "../UI/Buttons/Button";
import Grids from "../UI/Grids/Grids";
import {useNavigate} from "react-router-dom";

const Welcome = (props) => {

    const serverUrl = props.serverUrl;
    const [tariffs, setTariffs] = useState([]);
    const navigate = useNavigate ();

    useEffect(() => {
        
        fetch( serverUrl + '?filename=tariffs', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setTariffs(data)
            }).catch(error => {
                console.log('\n Ошибка получения тарифов');
            }
        );
    },[serverUrl]);

    let tariffsElements = [];

    if (tariffs.length > 0) {

        tariffsElements = tariffs.map(tariff =>
            <div key={tariff.id}>
                <div>{tariff.name}</div>
                <div>{tariff.price}</div>
                <Button onClick={() => {
                    props.setChosenTariff(tariff.id);
                    navigate('/registration-company');
                }}>Выбрать тариф - {tariff.name}</Button>
            </div>
        );

    }

    return (
        <Page>
            <Header/>
            <Grids cols={3}>
                {tariffsElements}
            </Grids>
        </Page>
    );
}

export default Welcome;