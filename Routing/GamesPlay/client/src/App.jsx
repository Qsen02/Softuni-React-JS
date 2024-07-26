import { Routes, Route, useNavigate } from "react-router-dom"

import Header from "./components/header/header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import RegisterForm from "./components/registerForm/RegisterForm"
import LoginForm from "./components/loginForm/LoginForm"
import CreateForm from "./components/createForm/CreateForm"
import GameDetails from "./components/gameDetails/GameDetails"
import EditForm from "./components/editForm/EditForm"

import { useState, useEffect } from "react"

import { getUserData } from "./utils/userDataHelper"
import { UserContext } from "./context/userContext"
import { logout } from "./api/userService"
import Logout from "./components/logout/Logout"

function App() {
    let [isUser, setIsUser] = useState(null);
    let userData = getUserData();
    let navigate=useNavigate();

    useEffect(() => {
        if (userData) {
            setIsUser(userData);
        } else {
            setIsUser(null);
        }
    }, [])

    function onSetUserHandler(user) {
        setIsUser(user);
    }

    async function onRemoveUserHandler() {
        await logout();
        setIsUser(null);
        navigate("/");
    }

    return (
        <>
            <UserContext.Provider value={{user:isUser,setUserHandler:onSetUserHandler,removeUserHandler:onRemoveUserHandler}}>
                <div id="box">
                    <Header />
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/login" element={<LoginForm/>} />
                            <Route path="/create" element={<CreateForm />} />
                            <Route path="/catalog/:id" element={<GameDetails />} />
                            <Route path="/catalog/:id/edit" element={<EditForm />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </main>
                </div>
            </UserContext.Provider>
        </>
    )
}

export default App
