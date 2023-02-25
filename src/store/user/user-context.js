import React from 'react';

const UserContext = React.createContext({
    userState: {
        'company': {id: 0, option: []},
        'project': {id: 0, option: []},
        'group': {id: 0, option: []}
    },
    userName: '',
    selectedGroup: '',
    changeState: (type,id) => {},
    requestHost: '',
});

export default UserContext;