const dotenv = require("dotenv").config()

let serverURL: string = ""

if (process.env.NODE_ENV === "development") {
	serverURL = `http://localhost:${process.env.PORT}`
}

if (process.env.NODE_ENV === "production") {
	serverURL = "https://zeitshop.onrender.com"
}

export { serverURL }
