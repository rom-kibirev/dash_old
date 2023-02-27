import React,{useState, useEffect,useContext} from "react";
import styles from "./register.module.css";
import Button from "../UI/Button";
import Header from "./Header";

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
                                        <div>
                                            <label>Наименование компании</label>
                                            <input name="company_name" type="text" disabled={true} title={legalData.name.short_with_opf} value={legalData.name.short_with_opf}/>
                                        </div>
                                        <div>
                                            <label>Юридический адрес</label>
                                            <input name="legal_address" type="text" disabled={true} title={legalData.address.unrestricted_value} value={legalData.address.unrestricted_value} />
                                        </div>
                                        <div>
                                            <label>Почтовый адрес</label>
                                            <input name="postal_address" type="text" value={legalData.address.unrestricted_value} />
                                        </div>
                                        <div>
                                            <label>КПП</label>
                                            <input name="kpp" type="number" disabled={true} title={legalData.kpp} value={legalData.kpp} />
                                        </div>
                                        <div>
                                            <label>ИНН</label>
                                            <input name="inn" type="number" disabled={true} title={legalData.inn} value={legalData.inn} />
                                        </div>
                                        <div>
                                            <label>ОГРН</label>
                                            <input name="ogrn" type="number" disabled={true} title={legalData.ogrn} value={legalData.ogrn} />
                                        </div>
                                        <div>
                                            <label>ОКПО</label>
                                            <input name="okpo" type="number" disabled={true} title={legalData.okpo} value={legalData.okpo} />
                                        </div>
                                        <div>
                                            <label>Банк</label>
                                            <input name="bank_name" type="text" />
                                        </div>
                                        <div>
                                            <label>Р/С</label>
                                            <input name="bank_account" type="number" />
                                        </div>
                                        <div>
                                            <label>К/С</label>
                                            <input name="ks" type="number" />
                                        </div>
                                        <div>
                                            <label>БИК</label>
                                            <input name="bik" type="number" />
                                        </div>
                                        <div>
                                            <label>Ген директор (Ф.И.О.)</label>
                                            <input name="director" type="text" disabled={true} title={legalData.management.name} value={legalData.management.name} />
                                        </div>
                                        <div>
                                            <label>Основание полномочий</label>
                                            <input name="authority" type="text" />
                                        </div>
                                        <div>
                                            <label>Адрес официальной эл. почты</label>
                                            <input name="email" type="email" />
                                        </div>
                                        <div>
                                            <label>Контактный телефон</label>
                                            <input name="phone" type="tel" maxLength="17" />
                                        </div>
                                        <div>
                                            <label>Адрес эл. почты администратора</label>
                                            <input name="email_administrator" type="email" />
                                        </div>
                                        <div>
                                            <label>Должность</label>
                                            <input name="position" type="text" />
                                        </div>
                                    </div>
                                    <Button type="submit">Зарегистрировать компанию</Button>
                                    <Button onClick={()=> setLegalData(false)}>Назад</Button>
                                </form>
                                :
                                <form onSubmit={(event) => event.preventDefault()}>
                                    <h2>Укажите ИНН ИП или Юридического лица</h2>
                                    {innError ? <div className={styles.warning}>{innError}</div> : ""}
                                    <div className="my-2">
                                        <input type="number" onChange={(event) => setInn(event.target.value)}/>
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