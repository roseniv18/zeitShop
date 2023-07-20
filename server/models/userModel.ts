import mongoose from "mongoose"
import Product from "./productModel"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: ["true", "Please provide a first name."],
    },
    lastName: {
        type: String,
        required: ["true", "Please provide a last name."],
    },
    email: {
        type: String,
        required: ["true", "Please provide an email."],
    },
    password: {
        type: String,
        required: ["true", "Please provide a password."],
    },

    // // ADDRESS
    // address: {
    //     country: {
    //         type: String,
    //         required: ["true", "Country is required."],
    //     },
    //     city: {
    //         type: String,
    //         required: ["true", "City is required."],
    //     },
    //     street: {
    //         type: String,
    //         required: ["true", "Street is required."],
    //     },
    //     postal_code: {
    //         type: String,
    //         required: ["true", "Postal code is required."],
    //     },
    //     phone: {
    //         type: String,
    //         required: false,
    //     },
    // },

    // // WISHLIST
    // wishlist: [
    //     {
    //         productName: {
    //             type: String,
    //             required: true,
    //         },
    //         image: {
    //             type: String,
    //             required: true,
    //         },
    //         productId: {
    //             type: String,
    //             required: true,
    //         },
    //     },
    // ],

    // // REVIEWS
    // reviews: [
    //     {
    //         rating: {
    //             type: Number,
    //             required: true,
    //         },
    //         productName: {
    //             type: String,
    //             required: true,
    //         },
    //         image: {
    //             type: String,
    //             required: true,
    //         },
    //         productId: {
    //             type: String,
    //             required: true,
    //         },
    //         comment: {
    //             type: String,
    //             required: false,
    //         },
    //     },
    // ],
})

const User = mongoose.model("User", userSchema)

export default User
