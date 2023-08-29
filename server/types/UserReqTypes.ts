export type RegisterBody = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export type LoginBody = {
    email: string
    password: string
}

export type UpdateContactInfoBody = {
    city: string
    country: string
    street: string
    postal_code: number
    phone: string
    firstName: string
    lastName: string
}

export type UpdateContactInfoQuery = {
    _id: string
}

export type AddToWishlistBody = {
    productName: string
    image: string
    productId: string
    nameId: string
}

export type AddToWishlistQuery = {
    _id: string
}

export type RemoveFromWishlistQuery = {
    _id: string
    productId: string
}

export type AddReviewBody = {
    userName: string
    productName: string
    productId: string
    image: string
    rating: number
    comment: string
}

export type AddReviewQuery = {
    _id: string
}

export type DeleteReviewQuery = {
    _id: string
    productId: string
}

export type GetReviewsQuery = {
    _id: string
}
