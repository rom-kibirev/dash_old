import Button from "../UI/Button";
import React from "react";


const Header = (props) => {

    return (
        <header className="grid grid-cols-4 gap-3 text-center m-2">
            <a href="/">Home</a>
            <div>Войти</div>
            <Button className="link"><a href="/register">Зарегистрироваться</a></Button>
            <div><a href="/tenders">Тендеры</a></div>
        </header>
    );
}

export default Header;