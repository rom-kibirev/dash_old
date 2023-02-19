import React, {useState, useEffect} from 'react';
import Pult from "./Pult/Pult";

const Work = (props) => {

    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        const userExpand = localStorage.getItem('expanded');

        userExpand === '1' ? setExpanded(true) : setExpanded(false);

    }, []);

    const expandHandler = (state) => {
        setExpanded(state);

        state ? localStorage.setItem('expanded', '1') : localStorage.setItem('expanded', '');
    }

    return (
        <React.Fragment>
            <Pult setExpanded={expandHandler} state={expanded} />
            <section>Secction</section>
        </React.Fragment>
    )
}

export default Work;