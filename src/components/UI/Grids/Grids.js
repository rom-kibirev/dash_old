import styles from "./grids.module.css";

const Grids = (props) => {

    return (
        <div className={styles['grid-' + props.cols]}>{props.children}</div>
    );
}

export default Grids;