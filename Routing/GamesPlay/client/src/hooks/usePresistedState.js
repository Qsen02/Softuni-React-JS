import { useState } from "react";
import { getUserData, setUserData } from "../utils/userDataHelper";

export function usePresistedState(initialvalue) {
    const [isUser, setIsUser] = useState(() => {
        const userData = getUserData();

        if (!userData) {
            return typeof userData === "function" ? initialvalue() : initialvalue;
        }
        return userData;
    });

    function setUserHandler(value) {
        const newUser = typeof value === "function" ? value(isUser) : value;
        setUserData(newUser);
        setIsUser(newUser);
    }

    return {
        isUser,
        setUserHandler
    }
}