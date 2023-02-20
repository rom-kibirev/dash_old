import styles from './slide-nav.module.css';
import Burger from './Burger';
import User from "./User/User";
import ProjectControl from "./User/ProjectControl/ProjectControl";

const Pult = (props) => {
    
    return (
        <div className={`${styles.slider} ${!props.state ? styles.collapsed : ''}`}>
            <div className={styles['nav-button']}>
                <Burger setExpanded={props.setExpanded} state={props.state} />
            </div>
            <User state={props.state} />
            <div className="border border-amber-500 py-2 my-1">
                <ProjectControl />
            </div>
        </div>
    )
}

export default Pult;