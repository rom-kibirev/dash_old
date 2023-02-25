import styles from './UserSelect.module.css';
import {ReactComponent as IconCompany} from "../Icons/company.svg";
import {ReactComponent as IconProject} from "../Icons/project.svg";
import {ReactComponent as IconEmployee} from "../Icons/employee.svg";

const template = {
    company: {title: 'Выбирите компанию', icon: <IconCompany />},
    project: {title: 'Выбирите проект', icon: <IconProject />},
    group: {title: 'Выбирите сотрудника', icon: <IconEmployee />},
};

const UserSelect = (props) => {

    const changeUserStateHandler = (event) => props.onChageUserState(props.id, +event.target.value);
    const changeUserStateFromLiHandler = (event) => {

        props.onChageUserState(props.id, +event.target.dataset.id);

        props.showListHandler(false);
    }

    const setShowListId = () => {
        if (props.shownList === props.id) props.showListHandler(false);
        else props.showListHandler(props.id);
    }

    if (props.state) {
        return (
            <div className={styles.container}>
                <div title={template[props.id].title}>{template[props.id].icon}</div>
                <select defaultValue={props.defaultValue} name={props.type} onChange={changeUserStateHandler} >
                    {props.options.map((item) => (<option value={item.id} key={item.id}>{item.name}</option>))}
                </select>
            </div>
        )
    }
    else {

        return (
            <div className={styles.collapsed}>
                <div className={styles.icon} title={template[props.id].title} onClick={setShowListId}>{template[props.id].icon}</div>
                <ul className={`${styles.dropdown} ${props.shownList === props.id ? styles['dropdown-show'] : ''}`} onMouseLeave={() => props.showListHandler(false)}>
                    {props.options.map((item) => (
                        <li
                            key={item.id}
                            className={`${item.id === props.defaultValue? styles.selected : ''}`}
                            data-id={item.id}
                            onClick={changeUserStateFromLiHandler}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default UserSelect;