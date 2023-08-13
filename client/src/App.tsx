import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
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
import { setProductAlert } from "./redux/productSlice"
import { setSearchAlert } from "./redux/searchSlice"
import { setUserAlert } from "./redux/userSlice"
import Footer2 from "./components/Footer2"
import Brands from "./pages/Brands"
import { handleAlert } from "./helpers/handleAlert"
import StickyHeader from "./components/Nav/StickyHeader"

const alertOpenDuration: number = 3500

function App() {
    const { alert: productsAlert } = useAppSelector((store) => store.products)
    const { alert: userAlert } = useAppSelector((store) => store.user)
    const { alert: searchAlert } = useAppSelector((store) => store.search)
    const { cart } = useAppSelector((store) => store.products)
    const [posY, setPosY] = useState<number>(window.scrollY)
    const [isNavbarFixed, setIsNavbarFixed] = useState<boolean>(false)

    useEffect(() => {
        const handleScrollY = () => {
            setPosY(window.scrollY)
        }

        window.addEventListener("scroll", handleScrollY)

        return () => {
            window.removeEventListener("scroll", handleScrollY)
        }
    }, [])

    useEffect(() => {
        if (posY > 200) {
            setIsNavbarFixed(true)
        } else {
            setIsNavbarFixed(false)
        }
    }, [posY])

    useEffect(() => {
        handleAlert(productsAlert)
        const alertTimeout: number = setTimeout(() => {
            setProductAlert({
                show: false,
                msg: "",
                type: "info",
            })
        }, alertOpenDuration)

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
        }, alertOpenDuration)

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
        }, alertOpenDuration)

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
                <nav className="header-container">
                    {isNavbarFixed ? <></> : <Header />}
                    {isNavbarFixed ? <StickyHeader /> : <Navbar />}
                </nav>
                <ToastContainer autoClose={alertOpenDuration} position="bottom-right" />
                <Routes>
                    <Route path="/" index element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products/:brand?" element={<Shop />} />
                    <Route path="/product/:nameId" element={<Product />} />
                    <Route path="/brands" element={<Brands />} />
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
                <Footer2 />
            </Router>
        </main>
    )
}

export default App
