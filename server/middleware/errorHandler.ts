import { Response } from "express"

// A basic error handler. It returns the status and a json object containing the message.
const errorHandler = (err: any, res: Response) => {
	const statusCode = res.statusCode || 500
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	})
}

export default errorHandler
