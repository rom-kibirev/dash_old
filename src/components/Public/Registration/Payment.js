import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import PageSection from "../../UI/Sections/PageSection";
import Section from "../../UI/Sections/Section";
import Button from "../../UI/Buttons/Button";
import Grids from "../../UI/Grids/Grids";

const Payment = (props) => {
    
    const [user, setUser] = useState();
    const [tariffs, setTariffs] = useState();
    const [systemOwner,setSystemOwner] = useState();
    const [currentTariff,setCurrentTariff] = useState();
    const navigate = useNavigate ();
    useEffect(() => {

        const serverUrl = props.serverUrl;
        const requestList = ['new-user','tariffs','system-owner'];
        const promises = [];

        if (requestList.length > 0) {

            requestList.forEach(request => {
                
                promises.push(
                    fetch(serverUrl  + '?filename=' + request, {method: "GET"})
                        .then(response => response.json())
                        .then(data => ({id: request, data}))
                )
            });

            Promise.all(promises)
                .then(data => {
                    data.forEach(item => {
                        if (item.id === 'new-user') setUser(item.data);
                        else if (item.id === 'tariffs') setTariffs(item.data);
                        else if (item.id === 'system-owner') setSystemOwner(item.data);
                    });
                })
                .catch(error => {
                    console.log('\n error project control request');
                });
        }
    },[props.serverUrl]);
    useEffect(() => {
        if (user && tariffs && user.tariff) tariffs.forEach(tariff => {
            if (tariff.id === user.tariff) {
                setCurrentTariff(tariff);
            }
        })
    },[user, tariffs]);

    const createBill = () => {
        console.log('\n bill', );
    }

    if (currentTariff && currentTariff.price) {

        console.log('\n ', user, tariffs,currentTariff);

        return (
            <PageSection>
                <Section>
                    <h1>Выбирите способ оплаты</h1>
                    <div>{currentTariff.name + ' - ' + currentTariff.price}</div>
                    {user.ownership !== 'PERSON' ? <Button onClick={createBill}>Сформировать счет на оплату</Button> : ''}
                    <Button onClick={() => navigate('/payCards?cost=' + currentTariff.price)}>Перейти к оплате картой</Button>
                </Section>
            </PageSection>
        );
    } else if (tariffs) {

        let tariffsElements = [];

        if (tariffs.length > 0) {

            tariffsElements = tariffs.map(tariff =>
                <div key={tariff.id}>
                    <div>{tariff.name}</div>
                    <div>{tariff.price}</div>
                    <Button onClick={() => setCurrentTariff({id: tariff.id,name: tariff.name,price: tariff.price})}>Выбрать тариф - {tariff.name}</Button>
                </div>
            );
        }

        return (
            <PageSection>
                <Section>
                    <Grids cols={3}>
                        {tariffsElements}
                    </Grids>
                </Section>
            </PageSection>
        );
    }
}

export default Payment;