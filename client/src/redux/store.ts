import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import productSlice from "./slices/productSlice"
import userSlice from "./slices/userSlice"
import miscSlice from "./slices/miscSlice"
import searchSlice from "./slices/searchSlice"

export const store = configureStore({
	reducer: {
		products: productSlice,
		user: userSlice,
		misc: miscSlice,
		search: searchSlice,
	},
	devTools: import.meta.env.NODE_ENV === "production" ? false : true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector
