import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import Product from "./productModel"

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        // required: [true, "Country is required."],
    },
    city: {
        type: String,
        // required: [true, "City is required."],
    },
    street: {
        type: String,
        // required: [true, "Street is required."],
    },
    postal_code: {
        type: Number,
        // required: [true, "Postal code is required."],
    },
    phone: {
        type: String,
        // required: false,
    },
})

const wishlistSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please provide product name"],
    },
    image: {
        type: String,
        required: [true, "Please provide product image"],
    },
    productId: {
        type: String,
        required: [true, "Please provide product id"],
    },
})

const reviewsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide user name"],
    },
    rating: {
        type: Number,
        required: false,
    },
    productName: {
        type: String,
        required: [true, "Please provide a product name"],
    },
    image: {
        type: String,
        required: [true, "Please provide an image"],
    },
    productId: {
        type: String,
        required: [true, "Please provide a product id"],
    },
    comment: {
        type: String,
        required: false,
    },
})

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name."],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name."],
    },
    email: {
        type: String,
        unique: [true, "User with this email already exists!"],
        required: [true, "Please provide an email."],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Incorrect email format"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minLength: 6,
        select: false,
    },

    address: addressSchema,
    wishlist: [wishlistSchema],
    reviews: [reviewsSchema],
})

userSchema.methods.matchPasswords = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
