import {useEffect, useState} from "react";
import InputMask from "react-input-mask";
import styles from "./inputs.module.css";

const InputReg = (props) => {

    const [message, setMessage] = useState(props.title);
    const [email, setEmail] = useState(props.setValue);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (props.errors && props.errors.length > 0 && ~props.errors.indexOf(props.name)) setIsValid(false);
    },[props.errors,props.name]);

    const checkEmailHandler = (event) => {
        const value = event.target.value;
        setEmail(value);
        setIsValid(/\S+@\S+\.\S+/.test(value));
    };
    const checkPhoneHandler = (event) => {
        const value = event.target.value;
        if (value.replace(/_/g,'').length < 18) setIsValid(false);
        else setIsValid(true);
    };
    const checkOtherHandler = (event) => {
        const value = event.target.value;
        if (value.length === 0) setIsValid(false);
        else setIsValid(true);
    };
    useEffect(()=> {
        if (isValid) setMessage(props.title);
        else {
            if (props.type === 'email') setMessage('Введите корректный e-mail');
            else if (props.type === 'tel') setMessage('Введите корректный телефон');
            else setMessage('Заполните поле - ' + props.title);
        }
    },[isValid,props.title,props.type])

    return (
        <div className={`${styles['input-section']} ${!isValid ? styles.invalid : ''}`}>
            <label>{message}</label>
            {props.type === 'tel' ?
                <InputMask
                    name={props.name}
                    type={props.type}
                    defaultValue={props.setValue}
                    mask="+7 (999) 999-99-99"
                    placeholder="+7 (___) ___-__-__"
                    onChange={checkPhoneHandler}
                />
                : props.type === 'email' ?
                    <input
                        name={props.name}
                        type={props.type}
                        defaultValue={email}
                        onChange={checkEmailHandler}
                    />
                    :
                    <input
                        name={props.name}
                        type={props.type}
                        disabled={props.disabled === 'true'}
                        title={props.setValue}
                        defaultValue={props.setValue}
                        maxLength={props.max}
                        onChange={checkOtherHandler}
                    />
            }
        </div>
    )
}

export default InputReg;