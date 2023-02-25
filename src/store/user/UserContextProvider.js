import {useEffect, useState} from "react";
import UserContext from './user-context';

export const UserContextProvider = (props) => {

    const [userData, setUserData] = useState();
    const serverUrl = 'http://localhost:8000/';

    useEffect(() => {
        fetch(serverUrl + '?filename=current-user', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setUserData(data)
            });
    },[]);

    const changeUserStateHandler = (type,id) => {

        const chengedData = {...userData};

        if (type === 'company') {
            chengedData.company_id = id;
            chengedData.project_id = chengedData.projects.filter(list => list.company_id === id)[0].id;
            chengedData.group_id = chengedData.groups.filter(list => list.company_id === id)[0].id;
        } else if (type === 'project') {
            chengedData.project_id = id;
        } else if (type === 'group') {
            chengedData.group_id = id;
        }

        fetch(serverUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            body: new URLSearchParams({
                'place': 'current-user.json',
                'data': JSON.stringify(chengedData)
            }),
        }).then(result => {
            if (result.ok) setUserData(chengedData);
        }).catch(error => {
            console.log('\n error POST current user data');
        });
    }

    const templateNames = {
        "depositor": "Инвестор",
        "administrator": "Администратор",
        "coordinator": "Координатор",
        "section-manager": "Начальник участка",
        "technical-control": "Стройконтроль",
        "engineer": "ГИП",
        "contractor": "Подрядчик",
    };

    if (!userData) {
        console.log('\n error GET current user data');
    } else {

        userData.groups.map(group => group.name = templateNames[group.type]);

        return <UserContext.Provider value={{
            userState: {
                'company': {
                    id: userData.company_id,
                    option: userData.companies
                },
                'project': {
                    id: userData.project_id,
                    option: userData.projects.filter(list => list.company_id === +userData.company_id)
                },
                'group': {
                    id: userData.group_id,
                    option: userData.groups.filter(list => list.company_id === +userData.company_id)
                }
            },
            userName: userData.name,
            selectedGroup: userData.groups.filter(list => list.id === +userData.group_id)[0].type,
            changeState: changeUserStateHandler,
            requestHost: serverUrl
        }}>
            {props.children}
        </UserContext.Provider>;
    }
}