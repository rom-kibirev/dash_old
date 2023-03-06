import React,{useState, useEffect} from "react";
import { useNavigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

import styles from "./register.module.css";

import Header from "../Header";
import PageSection from "../../UI/Sections/PageSection";
import Section from "../../UI/Sections/Section";
import Grids from "../../UI/Grids/Grids";
import Button from "../../UI/Buttons/Button";

const RegisterCompany = (props) => {

    const serverUrl = props.serverUrl;
    const navigate = useNavigate ();

    const [ownership,setOwnership] = useState(false);
    const [inn,setInn] = useState();
    const [innError,setInnError] = useState(false);
    const [legalData,setLegalData] = useState(false);
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
    },[inn,serverUrl]);

    const {register,handleSubmit,formState: { errors },reset,setValue} = useForm();
    const backLegalHandler = () => {
        setLegalData(false);
        setInnError(false);
        reset();
    };
    const backOwnershipHandler = () => {
        setOwnership(false);
        setInnError(false);
        reset();
    };

    const registerUserHandler = (data) => {

        fetch(serverUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            body: new URLSearchParams({
                'place': 'new-user.json',
                'data': JSON.stringify(data)
            }),
        }).then(result => {
            if (result.ok) {
                navigate('/registration-success');
            }
        }).catch(error => {
            console.log('\n error create new user');
        });
    };

    return (
        <PageSection>
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
                        !legalData ?
                            <form onSubmit={(event) => event.preventDefault()}>
                                <h2>Укажите ИНН Юридического лица или ИП</h2>
                                <div className={`${styles.field} ${innError ? styles.invalid : ''}`}>
                                    <label htmlFor="inn">{innError}</label>
                                    <input onChange={({ target: { value } }) => setInn(value)} />
                                </div>
                                <div className="text-gray-500 text-sm italic">
                                    <div>7810245481 - юр лицо</div>
                                    <div>760605409050 - ИП</div>
                                    <div>5408022137 - ликвидировано</div>
                                    <div>1234567890 - не правильный инн</div>
                                </div>
                                <Button onClick={backOwnershipHandler}>Назад</Button>
                            </form>
                            :
                            <form onSubmit={handleSubmit(registerUserHandler)}>
                                {props.chosenTariff ? setValue('tariff', props.chosenTariff) : setValue('tariff', null) }
                                <h2>Укажите реквизиты лица</h2>
                                <Grids cols={2}>
                                    <div className={`${styles.field} ${errors.company_name ? styles.invalid : ''}`}>
                                        <label htmlFor="company_name">Наименование компании</label>
                                        <fieldset disabled>
                                            <input
                                                name="company_name"
                                                type="text"
                                                defaultValue={legalData.name.short_with_opf}
                                                {...register("company_name", {validate: (value) => value.length > 0})}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={`${styles.field} ${errors.legal_address ? styles.invalid : ''}`}>
                                        <label htmlFor="legal_address">Юридический адрес</label>
                                        {legalData.type === "LEGAL" ?
                                            <fieldset disabled>
                                                <input
                                                    name="legal_address"
                                                    type="text"
                                                    defaultValue={legalData.address.unrestricted_value}
                                                    {...register("legal_address", {validate: (value) => value.length > 0})}
                                                />
                                            </fieldset>
                                            :
                                            <input
                                                name="legal_address"
                                                type="text"
                                                defaultValue={legalData.address.unrestricted_value}
                                                {...register("legal_address", {validate: (value) => value.length > 0})}
                                            />
                                        }
                                    </div>
                                    <div className={`${styles.field} ${errors.postal_address ? styles.invalid : ''}`}>
                                        <label htmlFor="postal_address">Почтовый адрес</label>
                                        <input
                                            name="postal_address"
                                            type="text"
                                            defaultValue={legalData.address.unrestricted_value}
                                            {...register("postal_address", {validate: (value) => value.length > 0})}
                                        />
                                    </div>
                                    {legalData.type === "LEGAL" ?
                                        <div className={`${styles.field} ${errors.kpp ? styles.invalid : ''}`}>
                                            <label htmlFor="kpp">КПП</label>
                                            <fieldset disabled>
                                                <input
                                                    name="kpp"
                                                    type="number"
                                                    defaultValue={legalData.kpp}
                                                    {...register("kpp", {validate: (value) => value.length > 0})}
                                                />
                                            </fieldset>
                                        </div>
                                        : ''
                                    }
                                    <div className={`${styles.field} ${errors.inn ? styles.invalid : ''}`}>
                                        <label htmlFor="inn">ИНН</label>
                                        <fieldset disabled>
                                            <input
                                                name="inn"
                                                type="number"
                                                defaultValue={legalData.inn}
                                                {...register("inn", {validate: (value) => value.length > 0})}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={`${styles.field} ${errors.ogrn ? styles.invalid : ''}`}>
                                        <label htmlFor="ogrn">ОГРН</label>
                                        <fieldset disabled>
                                            <input
                                                name="ogrn"
                                                type="number"
                                                defaultValue={legalData.ogrn}
                                                {...register("ogrn", {validate: (value) => value.length > 0})}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={`${styles.field} ${errors.okpo ? styles.invalid : ''}`}>
                                        <label htmlFor="okpo">ОКПО</label>
                                        <fieldset disabled>
                                            <input
                                                name="okpo"
                                                type="number"
                                                defaultValue={legalData.okpo}
                                                {...register("okpo", {validate: (value) => value.length > 0})}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={`${styles.field} ${errors.bank_name ? styles.invalid : ''}`}>
                                        <label htmlFor="bank_name">Наименование банка</label>
                                        <input
                                            name="bank_name"
                                            type="text"
                                            defaultValue={legalData.bank_name}
                                            {...register("bank_name", {validate: (value) => value.length > 0})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.bank_account ? styles.invalid : ''}`}>
                                        <label htmlFor="bank_account">Р/С</label>
                                        <input
                                            name="bank_account"
                                            type="number"
                                            defaultValue={legalData.bank_account}
                                            {...register("bank_account", {validate: (value) => value.length === 20})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.ks ? styles.invalid : ''}`}>
                                        <label htmlFor="ks">К/С</label>
                                        <input
                                            name="ks"
                                            type="number"
                                            defaultValue={legalData.ks}
                                            {...register("ks", {validate: (value) => value.length === 20})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.bik ? styles.invalid : ''}`}>
                                        <label htmlFor="bik">БИК</label>
                                        <input
                                            name="bik"
                                            type="number"
                                            defaultValue={legalData.bik}
                                            {...register("bik", {validate: (value) => value.length === 9})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.director ? styles.invalid : ''}`}>
                                        <label htmlFor="director">Ген директор (Ф.И.О.)</label>
                                        {(legalData.type === "LEGAL" && legalData.management.name) ?
                                            <fieldset disabled>
                                                <input
                                                    name="director"
                                                    type="text"
                                                    defaultValue={legalData.management.name}
                                                    {...register("director", {validate: (value) => value.length > 0})}
                                                />
                                            </fieldset>
                                            :
                                            legalData.type === "LEGAL"  ?
                                                <input
                                                    name="director"
                                                    type="text"
                                                    {...register("director", {validate: (value) => value.length > 0})}
                                                />
                                                :
                                                <input
                                                    name="director"
                                                    type="text"
                                                    defaultValue={legalData.fio.surname + ' ' + legalData.fio.name[0] + '. '+ legalData.fio.patronymic[0] + '.'}
                                                    {...register("director", {validate: (value) => value.length > 0})}
                                                />
                                        }
                                    </div>
                                    <div className={`${styles.field} ${errors.authority ? styles.invalid : ''}`}>
                                        <label htmlFor="authority">Основание полномочий</label>
                                        <input
                                            name="authority"
                                            type="text"
                                            defaultValue={legalData.authority}
                                            {...register("authority", {validate: (value) => value.length > 0})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.email ? styles.invalid : ''}`}>
                                        <label htmlFor="email">Адрес официальной эл. почты</label>
                                        <input
                                            name="email"
                                            type="email"
                                            defaultValue={legalData.email}
                                            {...register("email", {validate: (value) => /\S+@\S+\.\S+/.test(value)})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.phone ? styles.invalid : ''}`}>
                                        <label htmlFor="phone">Контактный телефон</label>
                                        <InputMask
                                            name="phone"
                                            type="tel"
                                            mask="+7 (999) 999-99-99"
                                            placeholder="+7 (___) ___-__-__"
                                            {...register("phone", {validate: (value) => value.replace(/_/g,'').length === 18})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.email_administrator ? styles.invalid : ''}`}>
                                        <label htmlFor="email_administrator">Адрес эл. почты администратора</label>
                                        <input
                                            name="email_administrator"
                                            type="email"
                                            {...register("email_administrator", {validate: (value) => /\S+@\S+\.\S+/.test(value)})}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${errors.position ? styles.invalid : ''}`}>
                                        <label htmlFor="position">Должность</label>
                                        <input
                                            name="position"
                                            type="text"
                                            defaultValue={legalData.position}
                                            {...register("position", {validate: (value) => value.length > 0})}
                                        />
                                    </div>
                                </Grids>
                                <Button type="submit" onClick={setValue("ownership", legalData.type)}>Зарегистрировать компанию</Button>
                                <Button onClick={backLegalHandler}>Назад</Button>
                            </form>
                        :
                        <form onSubmit={handleSubmit(registerUserHandler)}>
                            {props.chosenTariff ? setValue('tariff', props.chosenTariff) : setValue('tariff', null) }
                            <h2>Укажите данные лица</h2>
                            <Grids cols={2}>
                                <div className={`${styles.field} ${errors.name ? styles.invalid : ''}`}>
                                    <label htmlFor="name">Ф.И.О.</label>
                                    <input
                                        name="name"
                                        type="text"
                                        {...register("name", {validate: (value) => value.length > 0})}
                                    />
                                </div>
                                <div className={`${styles.field} ${errors.email ? styles.invalid : ''}`}>
                                    <label htmlFor="email">Адрес официальной эл. почты</label>
                                    <input
                                        name="email"
                                        type="email"
                                        {...register("email", {validate: (value) => /\S+@\S+\.\S+/.test(value)})}
                                    />
                                </div>
                                <div className={`${styles.field} ${errors.phone ? styles.invalid : ''}`}>
                                    <label htmlFor="phone">Контактный телефон</label>
                                    <InputMask
                                        name="phone"
                                        type="tel"
                                        mask="+7 (999) 999-99-99"
                                        placeholder="+7 (___) ___-__-__"
                                        {...register("phone", {validate: (value) => value.replace(/_/g,'').length === 18})}
                                    />
                                </div>
                                <div className={`${styles.field} ${errors.email_administrator ? styles.invalid : ''}`}>
                                    <label htmlFor="email_administrator">Адрес эл. почты администратора</label>
                                    <input
                                        name="email_administrator"
                                        type="email"
                                        {...register("email_administrator", {validate: (value) => /\S+@\S+\.\S+/.test(value)})}
                                    />
                                </div>
                            </Grids>
                            <Button type="submit" onClick={setValue("ownership", "PERSON")}>Зарегистрировать компанию</Button>
                            <Button onClick={backOwnershipHandler}>Назад</Button>
                        </form>
                }
            </Section>
        </PageSection>
    );
}

export default RegisterCompany;