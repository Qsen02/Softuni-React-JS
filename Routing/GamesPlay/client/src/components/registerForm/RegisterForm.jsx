import { useContext } from "react"
import { Link } from "react-router-dom"

import { register } from "../../api/userService";
import { setUserData } from "../../utils/userDataHelper";
import { UserContext } from "../../context/userContext";
import { useNormalForm } from "../../hooks/useForm";

export default function RegisterForm() {
    const initialvalues={
        email: "",
        password: "",
        repass: ""
    }
    const {setUserHandler}=useContext(UserContext);
    const {formValues,changeHandler,submitHandler}=useNormalForm(initialvalues,onRegister,"/");

    async function onRegister() {
        let email = formValues.email;
        let password = formValues.password;
        let repass = formValues.repass;
        try {
            if (!email || !password || !repass) {
                throw new Error("All fields required!");
            }
            if (password != repass) {
                throw new Error("Password must match!");
            }
            let user = await register({ email, password });
            setUserData(user);

            setUserHandler(user);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section id="register-page" className="content auth">
            <form onSubmit={submitHandler} id="register">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" value={formValues.email} onChange={changeHandler} />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" value={formValues.password} onChange={changeHandler} />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="repass" id="confirm-password" value={formValues.repass} onChange={changeHandler} />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}