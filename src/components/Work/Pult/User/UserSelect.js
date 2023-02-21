import styles from './UserSelect.module.css';
import IconCompany from "../Icons/company.svg";
import IconProject from "../Icons/project.svg";
import IconEmployee from "../Icons/employee.svg";

const UserSelect = (props) => {

    const template = {
        company: {title: 'Выбирите компанию', icon: IconCompany},
        project: {title: 'Выбирите проект', icon: IconProject},
        group: {title: 'Выбирите сотрудника', icon: IconEmployee},
    };

    const changeUserStateHandler = (event) => props.onChageUserState(props.type, +event.target.value);
    const changeUserStateFromLiHandler = (event) => {

        props.onChageUserState(props.type, +event.target.dataset.id);

        props.setShownList(false);
    }

    const shownHandler = () => {
        props.onChangeShowList(props.type);
    }
    const hideHandler = () => {
        props.setShownList(false);
    }

    if (props.state) {
        return (
            <div className={styles.container}>
                <div className={styles.icon} style={{backgroundImage: `url(${template[props.type].icon})`}} title={template[props.type].title}></div>
                <select defaultValue={props.defaultValue} name={props.type} onChange={changeUserStateHandler} >
                    {props.options.map((item) => (<option value={item.id} key={item.id}>{item.name}</option>))}
                </select>
            </div>
        )
    }
    else {

        return (
            <div className={styles.collapsed}>
                <div
                    className={styles.icon}
                    style={{ backgroundImage: `url(${template[props.type].icon})` }}
                    title={template[props.type].title}
                    onClick={shownHandler}
                ></div>
                <ul className={`${styles.dropdown} ${props.showList ? styles['dropdown-show'] : ''}`} onMouseLeave={hideHandler}>
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