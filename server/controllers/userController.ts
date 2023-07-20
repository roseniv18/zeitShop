import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel"

const registerUser = asyncHandler(async (req: Request, res: Response) => {
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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).send({
            message: "Success!",
            token: generateToken(user._id.toString()),
        })
    } else {
        res.status(400).send({ message: "Invalid user data!" })
    }

    res.status(200).json({ firstName, lastName, email, password })
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).send({ message: "Please fill out all fields!" })
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password!))) {
        res.status(200).send({
            message: "Success!",
            token: generateToken(user._id.toString()),
        })
    } else {
        res.status(400).send({ message: "Invalid credentials!" })
    }
})

const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "15d" })
}

export { registerUser, loginUser }
