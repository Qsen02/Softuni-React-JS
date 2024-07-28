import { createContext, useContext } from "react";

import { logout } from "../api/userService";
import { usePresistedState } from "../hooks/usePresistedState";
import { removeUserData } from "../utils/userDataHelper";

const UserContext = createContext();

export default function UserContextProvider(props) {
    const {isUser, setUserHandler} = usePresistedState(null);

    function onSetUserHandler(user) {
        setUserHandler(user);
    }

    async function onRemoveUserHandler() {
        await logout();
        removeUserData();
        setUserHandler(null);
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