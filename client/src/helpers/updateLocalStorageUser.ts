import { User } from "../types/UserTypes/User"

export const updateLocalStorageUser = (user: User) => {
	localStorage.setItem("user", JSON.stringify(user))
}
