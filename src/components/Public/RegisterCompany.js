import React,{useState, useEffect} from "react";
import styles from "./register.module.css";
import Button from "../UI/Buttons/Button";
import Header from "./Header";
import InputReg from "../UI/Inputs/InputReg";
import Grids from "../UI/Grids/Grids";
import Input from "../UI/Inputs/Input";
import Section from "../UI/Sections/Section";
import { useNavigate  } from 'react-router-dom';

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

        const errors = [];

        const data = {'type': event.target.dataset.ownership};
        event.target.querySelectorAll('input').forEach(input => {
            data[input.name] = input.value;
            if (input.value === '') errors.push(input.name);
        });

        setInputError(errors);

        if (inputError.length === 0) {

            fetch(serverUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    'place': 'new-user.json',
                    'data': JSON.stringify(data)
                }),
            }).then(result => {
                if (result.ok) {
                    navigate('/chose-tarif');
                }
            }).catch(error => {
                console.log('\n error create new user');
            });

            console.log('\n data', data);
        }
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
                                    {legalData.type === "LEGAL" ?
                                        <React.Fragment>
                                            <InputReg title="Наименование компании" type="text" name="company_name" disabled="true" setValue={legalData.name.short_with_opf} />
                                            <InputReg title="Юридический адрес" type="text" name="legal_address" disabled="true" setValue={legalData.address.unrestricted_value} />
                                            <InputReg errors={inputError} title="Почтовый адрес" type="text" name="postal_address" setValue={legalData.address.unrestricted_value} />
                                            <InputReg title="КПП" type="number" name="kpp" disabled="true" setValue={legalData.kpp}/>
                                            <InputReg title="ИНН" type="number" name="inn" disabled="true" setValue={legalData.inn}/>
                                            <InputReg title="ОГРН" type="number" name="ogrn" disabled="true" setValue={legalData.ogrn}/>
                                            <InputReg title="ОКПО" type="number" name="okpo" disabled="true" setValue={legalData.okpo}/>
                                            <InputReg errors={inputError} title="Банк" type="text" name="bank_name"/>
                                            <InputReg errors={inputError} title="Р/С" type="number" name="bank_account"/>
                                            <InputReg errors={inputError} title="К/С" type="number" name="ks"/>
                                            <InputReg errors={inputError} title="БИК" type="number" name="bik"/>
                                            {legalData.management.name ?
                                                <InputReg title="Ген директор (Ф.И.О.)" type="text" name="director" disabled="true" setValue={legalData.management.name}/>
                                                :
                                                <InputReg errors={inputError} title="Ген директор (Ф.И.О.)" type="text" name="director"/>
                                            }
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <InputReg title="Наименование компании" type="text" name="company_name" disabled="true" setValue={legalData.name.short_with_opf} />
                                            <InputReg errors={inputError} title="Юридический адрес" type="text" name="legal_address" setValue={legalData.address.unrestricted_value} />
                                            <InputReg errors={inputError} title="Почтовый адрес" type="text" name="postal_address" setValue={legalData.address.unrestricted_value} />
                                            <InputReg title="ИНН" type="number" name="inn" disabled="true" setValue={legalData.inn} />
                                            <InputReg title="ОГРН" type="number" name="ogrn" disabled="true" setValue={legalData.ogrn} />
                                            <InputReg title="ОКПО" type="number" name="okpo" disabled="true" setValue={legalData.okpo} />
                                            <InputReg errors={inputError} title="Банк" type="text" name="bank_name" />
                                            <InputReg errors={inputError} title="Р/С" type="number" name="bank_account" />
                                            <InputReg errors={inputError} title="К/С" type="number" name="ks" />
                                            <InputReg errors={inputError} title="БИК" type="number" name="bik" />
                                            <InputReg errors={inputError} title="Ген директор (Ф.И.О.)" type="text" name="director" disabled="true" setValue={legalData.fio.surname + ' ' + legalData.fio.name[0] + '. ' + legalData.fio.patronymic[0] + '.'}/>
                                        </React.Fragment>
                                    }
                                    <InputReg errors={inputError} title="Основание полномочий" type="text" name="authority" />
                                    <InputReg errors={inputError} title="Адрес официальной эл. почты" type="email" name="email" />
                                    <InputReg errors={inputError} title="Контактный телефон" type="tel" name="phone" />
                                    <InputReg errors={inputError} title="Адрес эл. почты администратора" type="email" name="email_administrator" />
                                    <InputReg errors={inputError} title="Должность" type="text" name="position" />
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
                                <InputReg errors={inputError} title="Ф.И.О." type="text" name="name" />
                                <InputReg errors={inputError} title="Адрес официальной эл. почты" type="email" name="email" />
                                <InputReg errors={inputError} title="Контактный телефон" type="tel" name="phone" />
                                <InputReg errors={inputError} title="Адрес эл. почты администратора" type="email" name="email_administrator" />
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