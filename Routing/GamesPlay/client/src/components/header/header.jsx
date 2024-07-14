import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/userService";
import {  removeUserData } from "../../utils/userDataHelper";

export default function Header({
    user,
    removeUserHandler
}) {

    let navigate = useNavigate();

    async function onLogout() {
        await logout();
        removeUserData();
        removeUserHandler();
        navigate("/");
    }

    return (
        <header>
            <h1><Link className="home" to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {user
                    ? <div id="user">
                        <Link to="/create">Create Game</Link>
                        <Link to="/logout" onClick={onLogout}>Logout</Link>
                    </div>
                    : <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </nav>
        </header>
    )
}