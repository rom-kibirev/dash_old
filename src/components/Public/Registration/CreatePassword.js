import {useState, useEffect} from "react";
import { useNavigate  } from 'react-router-dom';
import Page from "../../UI/Sections/Page";
import Section from "../../UI/Sections/Section";
import styles from "./register.module.css";
import Button from "../../UI/Buttons/Button";

const CreatePassword = (props) => {

    const serverUrl = props.serverUrl;
    const navigate = useNavigate ();
    const [userLogin, setUserLogin] = useState();
    useEffect(() => {

        const user = window.location.search.replace('?', '');

        fetch(serverUrl + '?filename=/' + user, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setUserLogin(data.email);
            }).catch(error => {
                console.log('\n Error');
            }
        );
    },[serverUrl]);

    const [password, setPassword] = useState();
    const [firstError, setFirstError] = useState(false);
    const [secondError, setSecondError] = useState();
    const checkPassword = (event) => {

        const timer = setTimeout(() => {

            if (event.target.name === 'firstPassword') {
                if (event.target.value.length > 7) {
                    setPassword(event.target.value);
                    setFirstError(false);
                }
                else setFirstError('Пароль должен быть минимум 8 символов');
            }
            else {
                if (event.target.value === password) setSecondError(false);
                else setSecondError('Пароли должны совпадать');
            }
        }, 1300);

        return () => {
            clearTimeout(timer);
        };
    }

    const createPasswordHandler = (event) => {

        event.preventDefault();

        if (!firstError && !secondError) {
            
            const data = {
                "login": userLogin,
                "password": password,
                'isLogin': true,
            };

            fetch(serverUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    'place': 'new-user-login.json',
                    'data': JSON.stringify(data)
                }),
            }).then(result => {
                if (result.ok) {
                    navigate('/payment');
                }
            }).catch(error => {
                console.log('\n error create new user');
            });
        }
    }

    if (userLogin) {
        return (
            <Page>
                <Section>
                    <form onSubmit={createPasswordHandler}>
                        <div className={`${styles.field} ${firstError ? styles.invalid : ''}`}>
                            <label htmlFor="firstPassword">{firstError ? firstError : 'Введите пароль'}</label>
                            <input
                                name="firstPassword"
                                type="password"
                                onChange={checkPassword}
                            />
                        </div>
                        <div className={`${styles.field} ${secondError ? styles.invalid : ''}`}>
                            <label htmlFor="firstPassword">{secondError ? secondError : 'Введите пароль'}</label>
                            <input
                                name="secondPassword"
                                type="password"
                                onChange={checkPassword}
                            />
                        </div>
                        <Button type="submit">Создать пароль</Button>
                    </form>
                </Section>
            </Page>
        );
    }
}

export default CreatePassword;