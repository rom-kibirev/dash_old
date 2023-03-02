import React,{useState, useEffect, useReducer} from "react";
import { useNavigate  } from 'react-router-dom';

import styles from "./register.module.css";

import Header from "./Header";
import Section from "../UI/Sections/Section";
import Grids from "../UI/Grids/Grids";
import Input from "../UI/Inputs/Input";
import InputReg from "../UI/Inputs/InputReg";
import Button from "../UI/Buttons/Button";

const RegisterCompany = (props) => {

    const serverUrl = 'http://localhost:8000/';
    const navigate = useNavigate ();

    const [ownership,setOwnership] = useState(false);
    const [inn,setInn] = useState();
    const [innError,setInnError] = useState(false);
    const [legalData,setLegalData] = useState(false);
    const [inputError,setInputError] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inn !== undefined) {

                fetch(serverUrl + '?filename=inn/' + inn, {method: 'GET'})
                    .then(response => response.json())
                    .then(data => {
                        if (data.state.status === "LIQUIDATED") {
                            setInnError('Введен ИНН ликвидированного лица');
                            setLegalData(false);
                        }
                        else setLegalData(data);
                    }).catch(error => {
                        setInnError('Введен некоректный ИНН');
                        setLegalData(false);
                    }
                );
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        };
    },[inn]);

    const backLegalHandler = () => {
        setLegalData(false);
        setInputError(false);
    };
    const backOwnershipHandler = () => {
        setOwnership(false);
        setInputError(false);
    };

    const registerUserHandler = (event) => {
        event.preventDefault();
        // const errors = [];
        //
        // const data = {'type': event.target.dataset.ownership};
        // event.target.querySelectorAll('input').forEach(input => {
        //     data[input.name] = input.value;
        //     if (input.value === '') errors.push(input.name);
        // });
        //
        // setInputError(errors);
        //
        // if (inputError.length === 0) {
        //
        //     fetch(serverUrl, {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //         body: new URLSearchParams({
        //             'place': 'new-user.json',
        //             'data': JSON.stringify(data)
        //         }),
        //     }).then(result => {
        //         if (result.ok) {
        //             navigate('/chose-tarif');
        //         }
        //     }).catch(error => {
        //         console.log('\n error create new user');
        //     });
        //
        //     console.log('\n data', data);
        // }
    };

    return (
        <div className={styles.page}>
            <Header />
            <Section>
                {!ownership ?
                    <React.Fragment>
                        <h2>Выбирите право собственности для регистрации компании</h2>
                        <Grids cols={2}>
                            <Button onClick={() => setOwnership('individual')}>Физическое лицо</Button>
                            <Button onClick={() => setOwnership('legal')}>Юридическое лицо</Button>
                        </Grids>
                    </React.Fragment>
                    :
                    ownership === 'legal' ?
                        legalData ?
                            <form onSubmit={registerUserHandler} data-ownership={legalData.type}>
                                <h2>Укажите реквизиты лица</h2>
                                <Grids cols={2}>
                                    <InputReg
                                        title="Наименование компании"
                                        name="company_name"
                                        type="text"
                                        setValue={legalData.name.short_with_opf}
                                        disabled="true"
                                    />
                                    <InputReg
                                        title="Юридический адрес"
                                        name="legal_address"
                                        type="text"
                                        setValue={legalData.address.unrestricted_value}
                                        disabled={legalData.type === "LEGAL" ? true : ''}
                                    />
                                    <InputReg
                                        title="Почтовый адрес"
                                        name="postal_address"
                                        type="text"
                                        setValue={legalData.address.unrestricted_value}
                                    />
                                    {legalData.type === "LEGAL" ? <InputReg
                                        title="КПП"
                                        name="kpp"
                                        type="number"
                                        setValue={legalData.kpp}
                                        disabled="true"
                                    /> : ''}
                                    <InputReg
                                        title="ИНН"
                                        name="inn"
                                        type="number"
                                        setValue={legalData.inn}
                                        disabled="true"
                                    />
                                    <InputReg
                                        title="ОГРН"
                                        name="ogrn"
                                        type="number"
                                        setValue={legalData.ogrn}
                                        disabled="true"
                                    />
                                    <InputReg
                                        title="ОКПО"
                                        name="okpo"
                                        type="number"
                                        setValue={legalData.okpo}
                                        disabled="true"
                                    />
                                    <InputReg
                                        title="Банк"
                                        name="bank_name"
                                        type="text"
                                    />
                                    <InputReg
                                        title="Р/С"
                                        name="bank_account"
                                        type="number"
                                    />
                                    <InputReg
                                        title="К/С"
                                        name="ks"
                                        type="number"
                                    />
                                    <InputReg
                                        title="БИК"
                                        name="bik"
                                        type="number"
                                    />
                                    <InputReg
                                        title="Ген директор (Ф.И.О.)"
                                        name="director"
                                        type="text"
                                        setValue={
                                            legalData.type === "LEGAL" ?
                                                legalData.management.name ? legalData.management.name : ''
                                                :
                                                legalData.fio.surname + ' ' + legalData.fio.name[0] + '. '+ legalData.fio.patronymic[0] + '.'
                                        }
                                        disabled={(legalData.type === "LEGAL" && legalData.management.name === "LEGAL") ? true : ''}
                                    />
                                    <InputReg
                                        title="Основание полномочий"
                                        name="authority"
                                        type="text"
                                    />
                                    <InputReg
                                        title="Адрес официальной эл. почты"
                                        name="email"
                                        type="email"
                                    />
                                    <InputReg
                                        title="Контактный телефон"
                                        name="phone"
                                        type="tel"
                                    />
                                    <InputReg
                                        title="Адрес эл. почты администратора"
                                        name="email_administrator"
                                        type="email"
                                    />
                                    <InputReg
                                        title="Должность"
                                        name="position"
                                        type="text"
                                    />
                                </Grids>
                                <Button type="submit">Зарегистрировать компанию</Button>
                                <Button onClick={backLegalHandler}>Назад</Button>
                            </form>
                            :
                            <form onSubmit={(event) => event.preventDefault()}>
                                <h2>Укажите ИНН Юридического лица или ИП</h2>
                                {innError ? <div className={styles.warning}>{innError}</div> : ""}
                                <Input className="my-2" onChange={({ target: { value } }) => setInn(value)}/>
                                <div className="text-gray-500 text-sm italic">
                                    <div>7810245481 - юр лицо</div>
                                    <div>760605409050 - ИП</div>
                                    <div>5408022137 - ликвидировано</div>
                                    <div>1234567890 - не правильный инн</div>
                                </div>
                                <Button onClick={backOwnershipHandler}>Назад</Button>
                            </form>
                        :
                        <form onSubmit={registerUserHandler} data-ownership="PERSON">
                            <h2>Укажите данные лица</h2>
                            <Grids cols={2}>
                                <InputReg
                                    title="Ф.И.О."
                                    name="name"
                                    type="text"
                                />
                                <InputReg
                                    title="Адрес официальной эл. почты"
                                    name="email"
                                    type="email"
                                />
                                <InputReg
                                    title="Контактный телефон"
                                    name="phone"
                                    type="tel"
                                />
                                <InputReg
                                    title="Адрес эл. почты администратора"
                                    name="email_administrator"
                                    type="email"
                                />
                            </Grids>
                            <Button type="submit">Зарегистрировать компанию</Button>
                            <Button onClick={backOwnershipHandler}>Назад</Button>
                        </form>
                }
            </Section>
        </div>
    );
}

export default RegisterCompany;