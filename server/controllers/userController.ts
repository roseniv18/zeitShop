import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel"
import {
    AddReviewBody,
    AddReviewQuery,
    AddToWishlistBody,
    AddToWishlistQuery,
    DeleteReviewQuery,
    GetReviewsQuery,
    LoginBody,
    RegisterBody,
    RemoveFromWishlistQuery,
    UpdateContactInfoBody,
    UpdateContactInfoQuery,
} from "../types/UserReqTypes"

const registerUser = asyncHandler(
    async (req: Request<{}, {}, RegisterBody>, res: Response) => {
        const { firstName, lastName, email, password } = req.body

        const onlyLetters: RegExp = new RegExp(/[a-z]/i)
        const validEmail: RegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

        if (!firstName || !lastName || !email || !password) {
            res.status(400).send({ message: "Please fill out all fields!" })
        }

        if (!onlyLetters.test(firstName) || !onlyLetters.test(lastName)) {
            res.status(400).send({ message: "Only latin characters allowed!" })
        }

        if (!validEmail.test(email)) {
            res.status(400).send({ message: "Incorrect email format." })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400).send({ message: "User already exists." })
        }

        const salt: string = await bcrypt.genSalt(10)
        const hashedPassword: string = await bcrypt.hash(password, salt)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            address: {
                country: "",
                city: "",
                street: "",
                postal_code: 0,
            },
            wishlist: [],
            reviews: [],
        })

        if (user) {
            res.status(201).send({
                _id: user._id,
                firstName,
                lastName,
                address: user.address,
                wishlist: user.wishlist,
                reviews: user.reviews,
                token: generateToken(user._id.toString()),
            })
        } else {
            res.status(400).send({ message: "Invalid user data!" })
        }

        res.status(200).send({ message: `Welcome ${firstName}!` })
    }
)

const loginUser = asyncHandler(async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).send({ message: "Please fill out all fields!" })
    }

    const user = await User.findOne({ email }).select("+password")

    // @ts-ignore
    if (user && (await user.matchPasswords(password))) {
        res.status(200).send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            wishlist: user.wishlist,
            reviews: user.reviews,
            token: generateToken(user._id.toString()),
        })
    } else {
        res.status(400).send({ message: "Invalid credentials!" })
    }
})

const updateContactInfo = asyncHandler(
    async (
        req: Request<{}, {}, UpdateContactInfoBody, UpdateContactInfoQuery>,
        res: Response
    ) => {
        const { _id } = req.query
        const { city, country, street, postal_code, phone, firstName, lastName } =
            req.body
        const newAddress: Partial<UpdateContactInfoBody> = {
            city,
            country,
            street,
            postal_code,
            phone,
        }

        const user = await User.findById(_id)

        if (user) {
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { firstName, lastName, address: newAddress },
                { new: true }
            )
            res.status(200).send(updatedUser)
        }

        res.status(400).send({ message: "No user with this ID found!" })
    }
)

const addToWishlist = asyncHandler(
    async (
        req: Request<{}, {}, AddToWishlistBody, AddToWishlistQuery>,
        res: Response
    ) => {
        // User ID
        const { _id } = req.query

        const { productName, image, productId, nameId } = req.body

        const user = await User.findById(_id)
        const productExists = await User.find(
            { "wishlist.productId": productId },
            { "wishlist.$": 1 }
        )

        if (user) {
            if (!productExists[0]) {
                try {
                    const newProducts = await User.findByIdAndUpdate(
                        {
                            _id,
                        },
                        {
                            $push: {
                                wishlist: { nameId, productName, image, productId },
                            },
                        },
                        { new: true }
                    )
                    res.status(200).send(newProducts?.wishlist || [])
                } catch (error) {
                    res.status(500).send({ message: "Something went wrong" })
                }
            } else {
                res.status(404).send({ message: "Product already exists in wishlist!" })
            }
        }

        res.status(404).send({ message: "Error finding user!" })
    }
)

const removeFromWishlist = asyncHandler(
    async (req: Request<{}, {}, {}, RemoveFromWishlistQuery>, res: Response) => {
        // User ID and product ID
        const { _id, productId } = req.query

        const user = await User.findById(_id)
        const productExists = await User.find(
            {
                _id,
                "wishlist.productId": productId,
            },
            { "wishlist.$": 1 }
        )

        if (user) {
            if (productExists[0]) {
                try {
                    const deletedProduct = await User.findByIdAndUpdate(
                        {
                            _id,
                        },
                        { $pull: { wishlist: { productId } } },
                        { new: true }
                    )
                    res.status(200).send(deletedProduct?.wishlist || [])
                } catch (error) {
                    res.status(500).send({ message: "Something went wrong" })
                }
            } else {
                res.status(404).send({ message: "Could not remove item from wishlist!" })
            }
        }

        res.status(404).send({ message: "Error finding user!" })
    }
)

const addReview = asyncHandler(
    async (req: Request<{}, {}, AddReviewBody, AddReviewQuery>, res: Response) => {
        // User ID
        const { _id } = req.query
        // Review data
        const { userName, productName, productId, image, rating, comment } = req.body

        const user = await User.findById(_id)
        const productExists = await User.find(
            { "reviews.productId": productId },
            { "reviews.$": 1 }
        )

        if (user) {
            if (!productExists[0]) {
                try {
                    const newProducts = await User.findByIdAndUpdate(
                        {
                            _id,
                        },
                        {
                            $push: {
                                reviews: {
                                    userName,
                                    productName,
                                    productId,
                                    image,
                                    rating,
                                    comment,
                                },
                            },
                        },
                        { new: true }
                    )
                    res.status(200).send(newProducts?.reviews || [])
                } catch (error) {
                    res.status(500).send({ message: "Something went wrong" })
                }
            } else {
                res.status(404).send({
                    message: "The user has already reviewed this product",
                })
            }
        }

        res.status(404).send({ message: "Error finding user!" })
    }
)

const deleteReview = asyncHandler(
    async (req: Request<{}, {}, {}, DeleteReviewQuery>, res: Response) => {
        // User ID and product ID
        const { _id, productId } = req.query

        const user = await User.findById(_id)
        const productExists = await User.find(
            {
                _id,
                "reviews.productId": productId,
            },
            { "reviews.$": 1 }
        )

        if (user) {
            if (productExists[0]) {
                try {
                    const deletedProduct = await User.findByIdAndUpdate(
                        {
                            _id,
                        },
                        { $pull: { reviews: { productId } } },
                        { new: true }
                    )
                    res.status(200).send(deletedProduct?.reviews || [])
                } catch (error) {
                    res.status(500).send({ message: "Something went wrong" })
                }
            } else {
                res.status(404).send({ message: "Could not remove item from wishlist!" })
            }
        }

        res.status(404).send({ message: "Error finding user!" })
    }
)

const getReviews = asyncHandler(
    async (req: Request<{}, {}, {}, GetReviewsQuery>, res: Response) => {
        // Provided product id
        const { _id } = req.query

        if (_id) {
            try {
                const usersWithReviews = await User.find(
                    { "reviews.productId": _id },
                    "reviews"
                )

                const productReviews = usersWithReviews.flatMap((user) =>
                    user.reviews.filter((review) => review.productId === _id)
                )

                res.status(200).send(productReviews)
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    message: `Error getting reviews: Internal Server Error`,
                })
            }
        }
        res.status(400).send({ message: "Please provide a product id!" })
    }
)

const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "15d" })
}

export {
    registerUser,
    loginUser,
    updateContactInfo,
    addToWishlist,
    removeFromWishlist,
    addReview,
    deleteReview,
    getReviews,
}
