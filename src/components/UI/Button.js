import styles from "./Button.module.css";

const Button = (props) => {

  return (
    <button
      type={props.type || "button"}
      className={`${styles.button} ${styles[props.className]}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
