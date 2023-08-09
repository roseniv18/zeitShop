let serverURL: string = ""

if (import.meta.env.VITE_NODE_ENV === "development") {
    serverURL = "http://localhost:5000"
}

if (import.meta.env.VITE_NODE_ENV === "production") {
    serverURL = "https://zeitshop.onrender.com"
}

export { serverURL }
