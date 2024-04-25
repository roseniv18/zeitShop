import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../types/Product"
import { CartProduct } from "../types/CartProduct"
import { initialProduct } from "./initialStates/initialProduct"
import { getProductThunk } from "./thunks/products/getProductThunk"
import { getAllProductsThunk } from "./thunks/products/getAllProductsThunk"
import { Filters } from "../types/Filters"
import { initialFilters } from "./initialStates/initialFilters"
import { Alert } from "../types/Alert"
import { Sort } from "../types/Sort"
import { loadMoreProductsThunk } from "./thunks/products/loadMoreProductsThunk"
import { Review } from "../types/Review"
import { getReviewsThunk } from "./thunks/products/getReviewsThunk"

type ProductState = {
	products: {
		products: Product[]
		totalCount: number
	}
	product: Product
	productReviews: Review[]
	cart: CartProduct[]
	filters: Filters
	sort: Sort
	isLoading: boolean
	isLoadingMoreProducts: boolean
	isSuccess: boolean
	isError: boolean
	alert: Alert
}

const getCartFromLocalStorage = () => {
	if (localStorage.getItem("cart")) {
		return JSON.parse(localStorage.getItem("cart") || "") as CartProduct[]
	}
}

const initialState: ProductState = {
	products: {
		products: [],
		totalCount: 0,
	},
	product: initialProduct,
	productReviews: [],
	cart: getCartFromLocalStorage() || [],
	filters: initialFilters,
	sort: "fullName-asc",
	isLoading: false,
	isLoadingMoreProducts: false,
	isSuccess: false,
	isError: false,
	alert: {
		show: false,
		type: "info",
		msg: "",
	},
}

// ASYNC THUNK
export const getProducts = createAsyncThunk(
	"products/getAll",
	getAllProductsThunk
)
export const loadMoreProducts = createAsyncThunk(
	"products/loadMoreProducts",
	loadMoreProductsThunk
)
export const getProduct = createAsyncThunk("products/get", getProductThunk)
export const getReviews = createAsyncThunk(
	"products/getReviews",
	getReviewsThunk
)

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProductAlert: (state, action: PayloadAction<Alert>) => {
			state.alert = action.payload
		},
		setFilters: (state, action: PayloadAction<Filters>) => {
			state.filters = { ...action.payload }
		},
		setSort: (state, action: PayloadAction<Sort>) => {
			state.sort = action.payload
		},
		addToCart: (state, action: PayloadAction<CartProduct>) => {
			const newItem = { ...action.payload, amount: 1 }
			const itemExists = state.cart.find((el) => el._id === newItem._id)
			if (itemExists) {
				const tempCart = state.cart.map((el) => {
					if (el._id === newItem._id) {
						const newAmount = el.amount + 1
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
				state.alert = {
					show: true,
					type: "success",
					msg: "Added new item!",
				}
			}
		},

		removeCartItem: (state, action: PayloadAction<string>) => {
			const id: string = action.payload
			state.cart = state.cart.filter((el) => el._id !== id)
			state.alert = {
				show: true,
				type: "success",
				msg: "Removed item from cart!",
			}
		},

		decrease: (state, action: PayloadAction<string>) => {
			const id: string = action.payload
			let isLastItem = false
			const tempCart = state.cart.map((el) => {
				if (el._id === id) {
					if (el.amount === 1) {
						isLastItem = true
					} else {
						const newAmount = el.amount - 1
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

		increase: (state, action: PayloadAction<string>) => {
			const id: string = action.payload
			const tempCart = state.cart.map((el) => {
				if (el._id === id) {
					const newAmount = el.amount + 1
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
			state.alert = {
				show: true,
				type: "info",
				msg: "Cart is now empty.",
			}
		},
	},
	extraReducers: (builder) => {
		// GET ALL
		builder.addCase(getProducts.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(
			getProducts.fulfilled,
			(
				state,
				action: PayloadAction<{
					products: Product[]
					totalCount: number
				}>
			) => {
				console.log(action.payload)
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.products.products = [...action.payload.products]
				state.products.totalCount = action.payload.totalCount
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
			state.products = {
				products: [],
				totalCount: 0,
			}
		})

		// LOAD MORE PRODUCTS
		builder.addCase(loadMoreProducts.pending, (state) => {
			state.isLoadingMoreProducts = true
		})
		builder.addCase(
			loadMoreProducts.fulfilled,
			(
				state,
				action: PayloadAction<{
					products: Product[]
					totalCount: number
				}>
			) => {
				state.isLoadingMoreProducts = false
				state.isSuccess = true
				state.isError = false
				state.products.products = [
					...state.products.products,
					...action.payload.products,
				]
				state.products.totalCount = action.payload.totalCount
			}
		)
		builder.addCase(loadMoreProducts.rejected, (state, action) => {
			state.isLoadingMoreProducts = false
			state.isError = true
			state.isSuccess = false
			state.alert = {
				show: true,
				type: "error",
				msg: action.payload as string,
			}
		})

		// GET PRODUCT
		builder.addCase(getProduct.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(
			getProduct.fulfilled,
			(state, action: PayloadAction<Product>) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.product = action.payload
			}
		)
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

		// GET PRODUCT REVIEWS
		builder.addCase(getReviews.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(
			getReviews.fulfilled,
			(state, action: PayloadAction<Review[]>) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.productReviews = [...action.payload]
			}
		)
		builder.addCase(getReviews.rejected, (state, action) => {
			state.isLoading = false
			state.isError = true
			state.isSuccess = false
			state.productReviews = []
			state.alert = {
				show: true,
				type: "error",
				msg: action.payload as string,
			}
		})
	},
})

export default productSlice.reducer
export const {
	setProductAlert,
	setFilters,
	setSort,
	addToCart,
	removeCartItem,
	decrease,
	increase,
	clearCart,
} = productSlice.actions
