import { Spin as Hamburger } from 'hamburger-react'

const Burger = (props) => {

    return <Hamburger toggled={props.state} toggle={props.setExpanded} size={24} />;
}

export default Burger;
