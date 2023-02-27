import React,{useState, useEffect,useContext} from "react";
import styles from "./register.module.css";
import Button from "../UI/Button";
import Header from "./Header";
import InputReg from "../UI/InputReg";

const RegisterCompany = (props) => {

    const [ownership,setOwnership] = useState(false);
    const [inn,setInn] = useState();
    const [innError,setInnError] = useState(false);
    const [legalData,setLegalData] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inn !== undefined) {

                fetch('http://localhost:8000/?filename=inn/' + inn, {method: 'GET'})
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

    console.log('\n ', legalData);

    return (
        <div className={styles.page}>
            <Header />
            <section className={styles.section}>
                <div className={styles.container}>
                    {!ownership ?
                        <div>
                            <h2>Выбирите право собственности для регистрации компании</h2>
                            <div className="grid grid-cols-2 gap-2">
                                <Button onClick={() => setOwnership('individual')}>Физическое лицо</Button>
                                <Button onClick={() => setOwnership('legal')}>Юридическое лицо</Button>
                            </div>
                        </div>
                        :
                        ownership === 'legal' ?
                            legalData ?
                                <form>
                                    <h2>Укажите реквизиты компании</h2>
                                    <div className={styles.legal}>
                                        <InputReg title="Наименование компании" type="text" name="company_name" disabled="true" value={legalData.name.short_with_opf} />
                                        <InputReg title="Юридический адрес" type="text" name="legal_address" disabled="true" value={legalData.address.unrestricted_value} />
                                        <InputReg title="Почтовый адрес" type="text" name="postal_address" disabled="false" value={legalData.address.unrestricted_value} />
                                        <InputReg title="КПП" type="number" name="kpp" disabled="true" value={legalData.kpp} />
                                        <InputReg title="ИНН" type="number" name="inn" disabled="true" value={legalData.inn} />
                                        <InputReg title="ОГРН" type="number" name="ogrn" disabled="true" value={legalData.ogrn} />
                                        <InputReg title="ОКПО" type="number" name="okpo" disabled="true" value={legalData.okpo} />
                                        <InputReg title="Банк" type="text" name="bank_name" disabled="false" value="" />
                                        <InputReg title="Р/С" type="number" name="bank_account" disabled="false" value="" />
                                        <InputReg title="К/С" type="number" name="ks" disabled="false" value="" />
                                        <InputReg title="БИК" type="number" name="bik" disabled="false" value="" />
                                        <InputReg title="Ген директор (Ф.И.О.)" type="text" name="director" disabled="false" value={legalData.management.name} />
                                        <InputReg title="Основание полномочий" type="text" name="authority" disabled="false" value="" />
                                        <InputReg title="Адрес официальной эл. почты" type="email" name="email" disabled="false" value="" />
                                        <InputReg title="Контактный телефон" type="tel" name="phone" disabled="false" value="" max="17" />
                                        <InputReg title="Адрес эл. почты администратора" type="email" name="email_administrator" disabled="false" value="" />
                                        <InputReg title="Адрес эл. почты администратора" type="email" name="email_administrator" disabled="false" value="" />
                                        <InputReg title="Должность" type="text" name="position" disabled="false" value="" />
                                    </div>
                                    <Button type="submit">Зарегистрировать компанию</Button>
                                    <Button onClick={()=> setLegalData(false)}>Назад</Button>
                                </form>
                                :
                                <form onSubmit={(event) => event.preventDefault()}>
                                    <h2>Укажите ИНН ИП или Юридического лица</h2>
                                    {innError ? <div className={styles.warning}>{innError}</div> : ""}
                                    <div className="my-2">
                                        <input type="number" onChange={(event) => setInn(event.target.value.trim(' '))}/>
                                    </div>
                                    <div className="text-gray-500 text-sm italic">
                                        <div>7810245481 - юр лицо</div>
                                        <div>760605409050 - ИП</div>
                                        <div>5408022137 - ликвидировано</div>
                                        <div>1234567890 - не правильный инн</div>
                                    </div>
                                    <Button onClick={()=> setOwnership(false)}>Назад</Button>
                                </form>
                            :
                            <form>
                                <h2>individual</h2>
                                <Button onClick={()=> setOwnership(false)}>Назад</Button>
                            </form>
                    }
                </div>
            </section>
        </div>
    );
}

export default RegisterCompany;