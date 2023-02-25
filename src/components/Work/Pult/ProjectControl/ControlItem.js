import React,{useState} from 'react';
import styles from './controlItems.module.css';
import {ReactComponent as Arrow} from '../Icons/arrow.svg';

const ControlItem = (props) => {

    const [expandedList, setExpandedList] = useState(false);
    const toggleShow = () => setExpandedList(!expandedList);

    const setShowListId = () => {
        if (props.shownList === props.id) props.showListHandler(false);
        else props.showListHandler(props.id);
    }

    if (props.state) return (
        <li className={styles.item}>
            {props.list ?
                <React.Fragment>
                    <div className={`${styles['item-list']}  ${expandedList ? styles['list-show-items'] : ''}`} onClick={toggleShow}>
                        <span className="grow">{props.title}</span>
                        <Arrow />
                        <span className={styles['list-amount']}>{props.list.length}</span>
                    </div>
                    <ul className={`${styles['additional-list']} ${expandedList ? styles['additional-list-show'] : ''}`}>
                        {props.list.map(item => (<li key={item.id}><a href={'/' + props.href + '/' + item.id}>{item.name}</a></li>))}
                    </ul>
                </React.Fragment>
                :
                <a href={props.href}>{props.title}</a>
            }
        </li>
    );
    else return (
        <li className={styles['collapsed-item']}>
            {props.list ?
                <React.Fragment>
                    <div className={styles['item-list-name']} title={props.title} onClick={setShowListId}>{props.title[0]}</div>
                    <span className={styles['collapsed-list-amount']}>{props.list.length}</span>
                    <ul className={`${styles.dropdown} ${props.shownList === props.id ? styles['dropdown-show'] : ''}`} onMouseLeave={() => props.showListHandler(false)}>
                        {props.list.map(item => (<li key={item.id}><a href={'/' + props.href + '/' + item.id}>{item.name}</a></li>))}
                    </ul>
                </React.Fragment>
                :
                <a href={props.href} title={props.title}>{props.title[0]}</a>
            }
        </li>
    )
}

export default ControlItem;