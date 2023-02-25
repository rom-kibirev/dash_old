import {useState} from 'react';
import styles from './slide-nav.module.css';
import Burger from './Burger';
import User from "./User/User";
import ProjectControl from "./ProjectControl/ProjectControl";

const Pult = (props) => {

    const [shownList, setShownList] = useState(false);
    const showListHandler = (id) => {
        setShownList(id);
    };
    
    return (
        <div className={`${styles.slider} ${!props.state ? styles.collapsed : ''}`}>
            <div className={styles['nav-button']}>
                <Burger setExpanded={props.setExpanded} state={props.state} />
            </div>
            <User state={props.state} shownList={shownList} showListHandler={showListHandler} />
            <ul className={styles['controller-list']}>
                <ProjectControl state={props.state} shownList={shownList} showListHandler={showListHandler} />
            </ul>
        </div>
    )
}

export default Pult;