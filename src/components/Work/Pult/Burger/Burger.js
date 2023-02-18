import { useState } from 'react';
import { Spin as Hamburger } from 'hamburger-react'

const Burger = (props) => {

    const [isOpen, setOpen] = useState(false)

    return <Hamburger toggled={isOpen} toggle={setOpen} />;
}

export default Burger;
