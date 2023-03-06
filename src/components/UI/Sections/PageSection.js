import styles from "./page.module.css";

const PageSection = (props) => {

    return (
        <div className={styles.page}>{props.children}</div>
    );
}

export default PageSection;