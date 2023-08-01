import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../types/Product"
import { getSearchProductsThunk } from "./thunks/products/getSearchProductsThunk"
import { Alert } from "../types/Alert"

type SearchState = {
    searchProducts: Product[]
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    alert: Alert
}

const initialState: SearchState = {
    searchProducts: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    alert: {
        show: false,
        type: "info",
        msg: "",
    },
}

export const getSearchProducts = createAsyncThunk(
    "search/getProducts",
    getSearchProductsThunk
)

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setSearchAlert: (state, action: PayloadAction<Alert>) => {
            state.alert = action.payload
        },
    },
    extraReducers: (builder) => {
        // GET PRODUCTS BY SEARCH QUERY
        builder.addCase(getSearchProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            getSearchProducts.fulfilled,
            (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.searchProducts = [...action.payload]
            }
        )
        builder.addCase(getSearchProducts.rejected, (state, action) => {
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

export default miscSlice.reducer
export const { setSearchAlert } = miscSlice.actions
