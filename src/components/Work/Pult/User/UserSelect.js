import {useState} from 'react';
import styles from './UserSelect.module.css';
import IconCompany from "../Icons/company.svg";
import IconProject from "../Icons/project.svg";
import IconEmployee from "../Icons/employee.svg";

const UserSelect = (props) => {

    const [isShown, setIsShown] = useState(false);

    const template = {
        company: {title: 'Выбирите компанию', icon: IconCompany},
        project: {title: 'Выбирите проект', icon: IconProject},
        group: {title: 'Выбирите сотрудника', icon: IconEmployee},
    };

    const changeUserStateHandler = (event) => props.onChageUserState(props.type, +event.target.value);
    const changeUserStateFromLiHandler = (event) => {

        props.onChageUserState(props.type, +event.target.dataset.id);
        setIsShown(false);
    }

    const showSelectHandler = () => setIsShown(true);
    const hideSelectHandler = () => setIsShown(false);

    if (props.state) {
        return (
            <div className={styles.container}>
                <div className={styles.icon} onClick={showSelectHandler} style={{backgroundImage: `url(${template[props.type].icon})`}} title={template[props.type].title}></div>
                <select defaultValue={props.defaultValue} name={props.type} onChange={changeUserStateHandler} >
                    {props.options.map((item) => (<option value={item.id} key={item.id}>{item.name}</option>))}
                </select>
            </div>
        )
    }
    else {

        return (
            <div className={styles.collapsed}>
                <div className={styles.icon} onClick={showSelectHandler} style={{ backgroundImage: `url(${template[props.type].icon})` }} title={template[props.type].title}></div>
                <ul className={`${styles.dropdown} ${isShown? styles['dropdown-show'] : ''}`} onMouseLeave={hideSelectHandler}>
                    {props.options.map((item) => (<li key={item.id} data-id={item.id} onClick={changeUserStateFromLiHandler}>{item.name}</li>))}
                </ul>
            </div>
        )
    }
}

export default UserSelect;