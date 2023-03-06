import Button from "../UI/Buttons/Button";
import {useNavigate} from "react-router-dom";

const Header = (props) => {

    const navigate = useNavigate();

    return (
        <header className="grid grid-cols-4 gap-3 text-center m-2">
            <Button onClick={() => navigate("/")}>Home</Button>
            <div>Войти</div>
            <Button onClick={() => navigate("/registration-company")}>Зарегистрироваться</Button>
            <Button onClick={() => navigate("/tenders")}>Тендеры</Button>
        </header>
    );
}

export default Header;