import { Routes, Route } from "react-router-dom"
import Header from "./components/header/header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import RegisterForm from "./components/registerForm/RegisterForm"
import LoginForm from "./components/loginForm/LoginForm"
import CreateForm from "./components/createForm/CreateForm"

function App() {

    return (
        <>
            <div id="box">
                <Header/>
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/create" element={<CreateForm />} />
                    </Routes>
                </main>
            </div>
        </>
    )
}

export default App
