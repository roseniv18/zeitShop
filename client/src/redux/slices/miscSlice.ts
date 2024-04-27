import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types/ProductTypes/Product"

type Tabs = "Personal Info" | "Reviews" | "Wishlist"

type MiscState = {
	activeTab: Tabs
	drawerWidth: number
	isAddingReview: false | Product
}

/* This slice handles the active tab in profile view, profile sidebar width 
and whether the user is adding a review. */
const initialState: MiscState = {
	activeTab: "Personal Info",
	drawerWidth: 240,
	isAddingReview: false,
}

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {
		setActiveTab: (state, action: PayloadAction<Tabs>) => {
			state.activeTab = action.payload
		},

		setDrawerWidth: (state, action: PayloadAction<number>) => {
			state.drawerWidth = action.payload
		},
		setIsAddingReview: (state, action: PayloadAction<false | Product>) => {
			state.isAddingReview = action.payload
		},
	},
})

export default miscSlice.reducer
export const { setActiveTab, setDrawerWidth, setIsAddingReview } =
	miscSlice.actions
