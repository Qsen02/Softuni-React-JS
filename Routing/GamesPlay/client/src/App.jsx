import { Routes, Route } from "react-router-dom"
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

function App() {
    let [isUser, setIsUser] = useState(null);
    let userData = getUserData();

    useEffect(()=>{
        if (userData) {
            setIsUser(userData);
        } else {
            setIsUser(null);
        }
    },[])

    function onSetUserHandler(user) {
        setIsUser(user);
    }

    function onRemoveUserHandler() {
        setIsUser(null);
    }

    return (
        <>
            <div id="box">
                <Header user={isUser} removeUserHandler={onRemoveUserHandler} />
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/register" element={<RegisterForm setUserHandler={onSetUserHandler} />} />
                        <Route path="/login" element={<LoginForm setUserHandler={onSetUserHandler} />} />
                        <Route path="/create" element={<CreateForm />} />
                        <Route path="/catalog/:id" element={<GameDetails />} />
                        <Route path="/catalog/:id/edit" element={<EditForm />} />
                    </Routes>
                </main>
            </div>
        </>
    )
}

export default App
