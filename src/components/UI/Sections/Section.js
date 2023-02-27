import styles from "./section.module.css";

const Section = (props) => {

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {props.children}
            </div>
        </section>
    );
}

export default Section;