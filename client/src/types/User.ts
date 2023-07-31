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
    wishlist: {
        productName: string
        image: string
        productId: string
    }[]
    reviews: {
        userName: string
        rating: number
        productName: string
        image: string
        productId: string
        comment: string
    }[]

    token: string
}
