import { useEffect } from "react"
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
import { serverURL } from "./helpers/serverURL"

function App() {
    const { cart } = useAppSelector((store) => store.products)

    console.log(serverURL)

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
