const asyncHandler = require("express-async-handler")
import { serverURL } from "../helpers/serverURL"
import { Request, Response } from "express"

const getTest = asyncHandler(async (req: Request, res: Response) => {
	res.json({ msg: "poisabufibasifubasuiofbasnfosaubfasj" })
})

export { getTest }
