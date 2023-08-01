import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import productSlice from "./productSlice"
import userSlice from "./userSlice"
import miscSlice from "./miscSlice"
import searchSlice from "./searchSlice"

export const store = configureStore({
    reducer: {
        products: productSlice,
        user: userSlice,
        misc: miscSlice,
        search: searchSlice,
    },
    devTools: false,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
    useSelector
