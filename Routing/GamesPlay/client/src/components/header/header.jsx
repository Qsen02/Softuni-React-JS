import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/userService";
import { useEffect, useState } from "react";
import { getUserData,removeUserData } from "../../utils/userDataHelper";

export default function Header() {
    let [isUser, setIsUser] = useState(null);
    useEffect(() => {
        let user = getUserData();
        if (user) {
            setIsUser(user);
        } else {
            setIsUser(null);
        }
    }, [])
    let navigate = useNavigate();

    async function onLogout() {
        await logout();
        removeUserData();
        navigate("/");
    }

    return (
        <header>
            <h1><Link className="home" to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {isUser
                    ? <div id="user">
                        <Link to="/create">Create Game</Link>
                        <Link to="/" onClick={onLogout}>Logout</Link>
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