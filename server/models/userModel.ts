import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    postal_code: {
        type: Number,
    },
    phone: {
        type: String,
    },
})

const reviewsSchema = new mongoose.Schema({
    userName: String,
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
    rating: {
        type: Number,
        required: [true, "Please provide a rating"],
    },
    comment: {
        type: String,
        required: false,
    },
})

const wishlistSchema = new mongoose.Schema({
    nameId: String,
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
