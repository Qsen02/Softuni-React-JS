import { login, register } from "../api/userService";

export function useRegister() {
    async function registration(data) {
        const user = await register(data);
        return user;
    }

    return registration;
}

export function useLogin() {
    async function loginging(data) {
        const user = await login(data);
        return user;
    }

    return loginging;
}