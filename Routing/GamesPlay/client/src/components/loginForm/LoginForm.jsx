import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../api/userService";
import { setUserData } from "../../utils/userDataHelper";
import { UserContext } from "../../context/userContext";

export default function LoginForm() {
    let [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate();
    const {setUserHandler}=useContext(UserContext);
    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }))
    }

    async function onLogin(event) {
        event.preventDefault();
        let email = formValues.email;
        let password = formValues.password;
        try {
            if (!email || !password) {
                throw new Error("All fields required!");
            }
            let user = await login({ email, password });
            setUserData(user);
            setFormValues(oldValues => ({
                ...oldValues, email: "",
                password: "",
            }))
            setUserHandler(user);
            navigate("/");
        } catch (err) {
            alert(err.message);
            return;
        }
    }
    return (
        <section id="login-page" className="auth">
            <form onSubmit={onLogin} id="login">

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" value={formValues.email} onChange={changeHandler} />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" value={formValues.password} onChange={changeHandler} />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}