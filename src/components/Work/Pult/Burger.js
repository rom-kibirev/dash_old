import { Spin as Hamburger } from 'hamburger-react'

const Burger = (props) => {

    return <Hamburger className="w-12 h-12" toggled={props.state} toggle={props.setExpanded} size={28} />;
}

export default Burger;
