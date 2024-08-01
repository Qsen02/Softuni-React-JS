import { Link, useNavigate } from "react-router-dom"

import { setUserData } from "../../utils/userDataHelper";
import {  useUserContext } from "../../context/userContext";
import { useNormalForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useAuth";

export default function LoginForm() {
    const initialvalues={
        email: "",
        password: ""
    };
    const login=useLogin();
    const navigate=useNavigate();
    const {setUserHandler}=useUserContext();
    const {formValues,changeHandler,submitHandler}=useNormalForm(initialvalues,onLogin);

    async function onLogin() {
        let email = formValues.email;
        let password = formValues.password;
        try {
            if (!email || !password) {
                throw new Error("All fields required!");
            }
            let user = await login({ email, password });
            setUserData(user);
            setUserHandler(user);
            navigate("/");
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section id="login-page" className="auth">
            <form onSubmit={submitHandler} id="login">

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