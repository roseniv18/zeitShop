import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://zeitshop.onrender.com",
})

export default axiosInstance
