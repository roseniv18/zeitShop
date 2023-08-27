import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
    LandingPage,
    Login,
    Register,
    Shop,
    Product,
    PrivatePath,
    Profile,
    Brands,
    AboutUs,
    ContactUs,
    Blog,
    Cart,
    Checkout,
    CheckoutSuccess,
    NotFound,
} from "./exports/pages"
import Navbar from "./components/Nav/Navbar"
import Header from "./components/Nav/Header"
import Footer from "./components/Footer/Footer"
import { useAppSelector } from "./redux/store"
import "react-toastify/dist/ReactToastify.css"
import Footer2 from "./components/Footer/Footer2"
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
    }, [productsAlert])

    useEffect(() => {
        handleAlert(userAlert)
    }, [userAlert])

    useEffect(() => {
        handleAlert(searchAlert)
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
