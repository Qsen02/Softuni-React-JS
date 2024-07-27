import { useUserContext } from "../../context/userContext"

import { Navigate } from "react-router-dom";

export default function Logout() {
    const { removeUserHandler } = useUserContext();
    removeUserHandler();

    return <Navigate to="/" />
}