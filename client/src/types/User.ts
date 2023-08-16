import { Review } from "./Review"
import { WishListProduct } from "./WishlistProduct"

export type User = {
    _id: string
    firstName: string
    lastName: string
    email: string
    address: {
        city: string
        country: string
        street: string
        postal_code: number
        phone: string
    }
    wishlist: WishListProduct[]
    reviews: Review[]
    token: string
}
