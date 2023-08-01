import { useEffect, useState } from "react"
import { Alert, Snackbar } from "@mui/material"
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

function App() {
    const [alert, setAlert] = useState<JSX.Element>()
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const { alert: productsAlert } = useAppSelector((store) => store.products)
    const { alert: userAlert } = useAppSelector((store) => store.user)
    const { alert: searchAlert } = useAppSelector((store) => store.search)
    const { cart } = useAppSelector((store) => store.products)

    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }

        setAlert(<></>)
        setIsAlertOpen(false)
    }

    const createAlert = (msg: string) => {
        setAlert(
            <Snackbar
                autoHideDuration={4000}
                open={isAlertOpen}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleAlertClose}
            >
                <Alert severity={productsAlert.type} onClose={() => setAlert(<></>)}>
                    {msg}
                </Alert>
            </Snackbar>
        )
    }

    useEffect(() => {
        if (productsAlert.show && productsAlert.msg) {
            setIsAlertOpen(true)
            createAlert(productsAlert.msg)
        }
    }, [productsAlert])

    useEffect(() => {
        if (userAlert.show && userAlert.msg) {
            setIsAlertOpen(true)
            createAlert(userAlert.msg)
        }
    }, [userAlert])

    useEffect(() => {
        if (searchAlert.show && searchAlert.msg) {
            setIsAlertOpen(true)
            createAlert(searchAlert.msg)
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
                {alert}
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
