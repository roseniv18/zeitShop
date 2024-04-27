import { CartProduct } from "../types/ProductTypes/CartProduct"
import { User } from "../types/UserTypes/User"
import { initialUser } from "../redux/initialStates/initialUser"

export const getCartFromLocalStorage = () => {
	if (localStorage.getItem("cart")) {
		return JSON.parse(localStorage.getItem("cart") || "") as CartProduct[]
	}
}

export const getUserFromLocalStorage = (): User => {
	let user: User = initialUser

	if (localStorage.getItem("user")) {
		const lsUser: string = localStorage.getItem("user")!
		user = JSON.parse(lsUser) as User
	}

	return user
}
