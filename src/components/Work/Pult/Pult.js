import React from 'react';
import Burger from './Burger';
import styles from './slide-nav.module.css';

const Pult = (props) => {
    
    return (
        <nav className={`${styles.slider} ${!props.state ? styles.collapsed : ''}`}>
            <div className={styles['nav-button']}>
                <Burger setExpanded={props.setExpanded} state={props.state} />
            </div>
            <div>
                <div>User</div>
                <div>ProjectControl</div>
            </div>
        </nav>
    )
}

export default Pult;