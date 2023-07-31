import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../types/Product"
import { CartProduct } from "../types/CartProduct"
import { initialProduct } from "./initialStates/initialProduct"
import { getProductThunk } from "./thunks/products/getProductThunk"
import { getAllProductsThunk } from "./thunks/products/getAllProductsThunk"
import { Filters } from "../types/Filters"
import { initialFilters } from "./initialStates/initialFilters"

type ProductState = {
    products: Product[]
    product: Product
    cart: CartProduct[]
    filters: Filters
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    alert: {
        show: boolean
        type: string
        msg: string
    }
}

const getCartFromLocalStorage = () => {
    if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart") || "") as CartProduct[]
    }
}

const initialState: ProductState = {
    products: [],
    product: initialProduct,
    cart: getCartFromLocalStorage() || [],
    filters: initialFilters,
    isLoading: false,
    isSuccess: false,
    isError: false,
    alert: {
        show: false,
        type: "",
        msg: "",
    },
}

// ASYNC THUNK
export const getProducts = createAsyncThunk("products/getAll", getAllProductsThunk)
export const getProduct = createAsyncThunk("products/get", getProductThunk)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Filters>) => {
            state.filters = { ...action.payload }
        },
        addToCart: (state, action) => {
            const newItem = { ...action.payload, amount: 1 }
            const itemExists = state.cart.find((el) => el._id === newItem._id)
            if (itemExists) {
                const tempCart = state.cart.map((el) => {
                    if (el._id === newItem._id) {
                        let newAmount = el.amount + 1
                        return {
                            ...el,
                            amount: newAmount,
                        }
                    }
                    return el
                })
                state.cart = [...tempCart]
            } else {
                state.cart.push(newItem)
            }
        },

        removeCartItem: (state, action) => {
            const id = action.payload
            state.cart = state.cart.filter((el) => el._id !== id)
        },

        decrease: (state, action) => {
            const id = action.payload
            let isLastItem: boolean = false
            const tempCart = state.cart.map((el) => {
                if (el._id === id) {
                    if (el.amount === 1) {
                        isLastItem = true
                    } else {
                        let newAmount = el.amount - 1
                        return {
                            ...el,
                            amount: newAmount,
                        }
                    }
                }
                return el
            })

            state.cart = isLastItem
                ? state.cart.filter((el) => el._id !== id)
                : [...tempCart]
        },

        increase: (state, action) => {
            const id = action.payload
            const tempCart = state.cart.map((el) => {
                if (el._id === id) {
                    let newAmount = el.amount + 1
                    return {
                        ...el,
                        amount: newAmount,
                    }
                }
                return el
            })

            state.cart = [...tempCart]
        },

        clearCart: (state) => {
            state.cart = []
        },
    },
    extraReducers: (builder) => {
        // GET ALL
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            getProducts.fulfilled,
            (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = [...action.payload]
            }
        )
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // GET
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.product = action.payload
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })
    },
})

export default productSlice.reducer
export const { setFilters, addToCart, removeCartItem, decrease, increase, clearCart } =
    productSlice.actions
