import { register } from "../api/userService";

export function useRegister() {
    async function registration(data) {
        const user = await register(data);
        return user;
    }

    return registration;
}