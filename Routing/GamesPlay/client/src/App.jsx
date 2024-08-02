import { Routes, Route } from "react-router-dom"

import Header from "./components/header/header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import RegisterForm from "./components/registerForm/RegisterForm"
import LoginForm from "./components/loginForm/LoginForm"
import CreateForm from "./components/createForm/CreateForm"
import GameDetails from "./components/gameDetails/GameDetails"
import EditForm from "./components/editForm/EditForm"
import Logout from "./components/logout/Logout"
import UserContextProvider from "./context/userContext"
import GuestGuard from "./common/GuestGuard"

function App() {

    return (
        <UserContextProvider>
            <div id="box">
                <Header />
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/catalog/:id" element={<GameDetails />} />
                        <Route path="/catalog/:id/edit" element={<EditForm />} />
                        <Route element={<GuestGuard />}>
                            <Route path="/create" element={<CreateForm />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </UserContextProvider>
    )
}

export default App
