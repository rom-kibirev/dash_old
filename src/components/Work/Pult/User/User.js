import React,{useContext,useState} from "react";
import styles from "./User.module.css";
import UserContext from "../../../../store/user/user-context";
import LogutIcon from "../Icons/logout.svg";
import UserSelect from "./UserSelect";

const User = (props) => {

    const userContext = useContext(UserContext);

    const changeUserState = (type,id) => userContext.changeState(type,id);

    const [shownList,setShownList] = useState('');

    const showListHandler = (id) => setShownList(id);

    const userSelectArray = [];
    for (const id in userContext.userState) {

        const item = userContext.userState[id];

        userSelectArray.push(<UserSelect
            key={id}
            type={id}
            defaultValue={item.id}
            options={item.option}
            onChageUserState={changeUserState}
            state={props.state}
            showList={id === shownList}
            onChangeShowList={() => showListHandler(id)}
            setShownList={setShownList}
        />);
    }

    return (
        <React.Fragment>
            <form className={`${styles.member} ${!props.state ? styles.collapsed : ''}`} onSubmit={event => event.preventDefault()}>
                <label title={userContext.userName}>{userContext.userName}</label>
                <div className={styles.logout}>{props.state ?
                    <div className={styles['expanded-logout']}>
                        <button type="submit" title="Выйти из учетной записи">Выйти</button>
                    </div>
                    :
                    <div className={styles['collapsed-logout']}>
                        <button type="submit" title={'Выйти ' + userContext.userName} style={{backgroundImage: `url(${LogutIcon})`}}></button>
                    </div>
                }</div>
            </form>
            {userSelectArray}
        </React.Fragment>
    );
}

export default User;