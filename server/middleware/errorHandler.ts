import { NextFunction, Response, Request } from "express"

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode || 500
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	})
}

export default errorHandler
