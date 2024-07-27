import { createContext, useContext, useEffect, useState } from "react";

import { getUserData } from "../utils/userDataHelper";
import { logout } from "../api/userService";

const UserContext = createContext();

export default function UserContextProvider(props) {
    const [isUser, setIsUser] = useState(null);
    const userData = getUserData();

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
    }
    return (
        <UserContext.Provider value={{ user: isUser, setUserHandler: onSetUserHandler, removeUserHandler: onRemoveUserHandler }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const {user,setUserHandler,removeUserHandler}=useContext(UserContext);
    return {
        user,
        setUserHandler,
        removeUserHandler
    };
}