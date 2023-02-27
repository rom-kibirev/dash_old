import styles from './inputs.module.css'

const Input = (props) => {

    return (
        <input
            className={`${styles.input} ${props.className}`}
            name={props.name}
            type={props.type}
            defaultValue={props.value}
            min={props.min}
            max={props.max}
            onChange={props.onChange}
        />
    );
}

export default Input;