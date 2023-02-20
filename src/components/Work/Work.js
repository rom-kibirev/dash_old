import React, {useState, useEffect} from 'react';
import {UserContextProvider} from "../../store/user/UserContextProvider";
import Pult from "./Pult/Pult";

const Work = (props) => {

    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        const userExpand = localStorage.getItem('expanded');

        if (userExpand === '1') setExpanded(false);

    }, []);

    const expandHandler = (state) => {
        setExpanded(state);

        state ? localStorage.setItem('expanded', '') : localStorage.setItem('expanded', '1');
    }

    return (
        <UserContextProvider>
            <Pult setExpanded={expandHandler} state={expanded} />
            <section className="ml-16">Secction</section>
        </UserContextProvider>
    )
}

export default Work;