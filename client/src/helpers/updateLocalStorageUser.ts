import { User } from "../types/User"

export const updateLocalStorageUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
}
