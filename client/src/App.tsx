import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Nav/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Shop from "./pages/Shop"
import Product from "./pages/Product"
import Header from "./components/Nav/Header"
import LandingPage from "./pages/LandingPage"
import Footer from "./components/Footer"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound"
import { useAppSelector } from "./redux/store"
import Profile from "./pages/Profile"
import PrivatePath from "./pages/PrivatePath"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import Blog from "./pages/Blog"
import "react-toastify/dist/ReactToastify.css"
import { Alert } from "./types/Alert"
import { setProductAlert } from "./redux/productSlice"
import { setSearchAlert } from "./redux/searchSlice"
import { setUserAlert } from "./redux/userSlice"

function App() {
    const { alert: productsAlert } = useAppSelector((store) => store.products)
    const { alert: userAlert } = useAppSelector((store) => store.user)
    const { alert: searchAlert } = useAppSelector((store) => store.search)
    const { cart } = useAppSelector((store) => store.products)

    const handleAlert = (alert: Alert) => {
        if (alert.show && alert.msg) {
            if (alert.type === "error") {
                toast.error(alert.msg)
            }
            if (alert.type === "info") {
                toast.info(alert.msg)
            }
            if (alert.type === "success") {
                toast.success(alert.msg)
            }
            if (alert.type === "warning") {
                toast.warning(alert.msg)
            }
        }
    }

    useEffect(() => {
        handleAlert(productsAlert)
        const alertTimeout: number = setTimeout(() => {
            setProductAlert({
                show: false,
                msg: "",
                type: "info",
            })
        })

        return () => {
            clearTimeout(alertTimeout)
        }
    }, [productsAlert])

    useEffect(() => {
        handleAlert(userAlert)

        const alertTimeout: number = setTimeout(() => {
            setUserAlert({
                show: false,
                msg: "",
                type: "info",
            })
        })

        return () => {
            clearTimeout(alertTimeout)
        }
    }, [userAlert])

    useEffect(() => {
        handleAlert(searchAlert)

        const alertTimeout: number = setTimeout(() => {
            setSearchAlert({
                show: false,
                msg: "",
                type: "info",
            })
        })

        return () => {
            clearTimeout(alertTimeout)
        }
    }, [searchAlert])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return (
        <main>
            <Router>
                <header>
                    <Header />
                    <Navbar />
                </header>
                <ToastContainer autoClose={3500} />
                <Routes>
                    <Route path="/" index element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Shop />} />
                    <Route path="/product/:nameId" element={<Product />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route
                        path="/profile"
                        element={<PrivatePath component={<Profile />} />}
                    ></Route>
                    <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
                <Footer />
            </Router>
        </main>
    )
}

export default App
