import styles from './slide-nav.module.css';
import Burger from './Burger';
import User from "./User/User";

const Pult = (props) => {
    
    return (
        <div className={`${styles.slider} ${!props.state ? styles.collapsed : ''}`}>
            <div className={styles['nav-button']}>
                <Burger setExpanded={props.setExpanded} state={props.state} />
            </div>
            <User state={props.state} />
            <div>ProjectControl</div>
        </div>
    )
}

export default Pult;