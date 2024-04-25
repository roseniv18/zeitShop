import axios from "axios"
import { serverURL } from "../helpers/serverURL"

const axiosInstance = axios.create({
	baseURL: serverURL,
})

export default axiosInstance
