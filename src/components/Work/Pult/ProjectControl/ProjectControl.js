import {useContext,useState,useEffect} from "react";
import UserContext from "../../../../store/user/user-context";
import routes from "../routes.json";
import ControlItem from "./ControlItem";

const ProjectControl = (props) => {

    const companyId = useContext(UserContext).userState.company.id;
    const group = useContext(UserContext).selectedGroup;
    const serverUrl = 'http://localhost:8000/?filename=';
    const [isRequest, setIsRequest] = useState(false);
    const [getData,setGetData] = useState([]);
    useEffect(() => {

        const requestList = routes[group].filter(request => request.request);
        const promises = [];

        if (requestList.length > 0) {

            requestList.forEach(request => {
                promises.push(
                    fetch(serverUrl + request.request, {method: "GET"})
                        .then(response => response.json())
                        .then(data => ({id: request.id, data}))
                )
            });

            Promise.all(promises)
                .then(data => {
                    const result = {};
                    data.forEach(item => result[item.id] = item.data);
                    setGetData(result);
                })
                .catch(error => {
                    console.log('\n error project control request');
                });

            setIsRequest(true);
        } else {
            setIsRequest(false);
        }
    },[group,setGetData,isRequest]);

    const itemList = [];
    routes[group].forEach(route => {
        if (route.href) itemList.push(<ControlItem
            key={route.id}
            id={route.id}
            href={group + '/' + route.href}
            title={route.title}
            shownList={props.shownList}
            showListHandler={props.showListHandler}
            state={props.state}
        />);
        else if (route.request && getData[route.id]) {
            if (getData[route.id].length > 0) itemList.push(<ControlItem
                key={route.id}
                id={route.id}
                list={getData[route.id]}
                href={group + '/' + route.request}
                title={route.title}
                shownList={props.shownList}
                showListHandler={props.showListHandler}
                state={props.state}
            />);
            else if (getData[route.id].status) itemList.push(<ControlItem
                key={route.id}
                id={route.id}
                href={serverUrl + '/' + route.request + '/' + companyId}
                title={route.title}
                shownList={props.shownList}
                showListHandler={props.showListHandler}
                state={props.state}
            />);
        }
    });

    return itemList;
}

export default ProjectControl;