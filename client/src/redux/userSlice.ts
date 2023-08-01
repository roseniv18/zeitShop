import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../types/User"
import { initialUser } from "./initialStates/initialUser"
import { registerUserThunk } from "./thunks/user/registerUserThunk"
import { loginUserThunk } from "./thunks/user/loginUserThunk"
import { updateContactInfoThunk } from "./thunks/user/updateContactInfoThunk"
import { addToWishlistThunk } from "./thunks/user/addToWishlistThunk"
import { removeFromWishlistThunk } from "./thunks/user/removeFromWishListThunk"
import { WishListProduct } from "../types/WishlistProduct"
import { updateLocalStorageUser } from "../helpers/updateLocalStorageUser"
import { addReviewThunk } from "./thunks/user/addReviewThunk"
import { Review } from "../types/Review"
import { deleteReviewThunk } from "./thunks/user/deleteReviewThunk"
import { Alert } from "../types/Alert"

type UserState = {
    user: User
    isLoading: boolean
    alert: Alert
}

const getUserFromLocalStorage = (): string => {
    if (localStorage.getItem("user")) {
        return localStorage.getItem("user")!
    }

    return ""
}

const initialState: UserState = {
    user: getUserFromLocalStorage() ? JSON.parse(getUserFromLocalStorage()) : initialUser,
    isLoading: false,
    alert: {
        show: false,
        type: "info",
        msg: "",
    },
}

// ASYNC THUNKS
export const registerUser = createAsyncThunk("user/register", registerUserThunk)
export const loginUser = createAsyncThunk("user/login", loginUserThunk)
export const updateContactInfo = createAsyncThunk(
    "user/updateContactInfo",
    updateContactInfoThunk
)
export const addToWishlist = createAsyncThunk("user/addToWishlist", addToWishlistThunk)
export const removeFromWishlist = createAsyncThunk(
    "user/removeFromWishlist",
    removeFromWishlistThunk
)
export const addReview = createAsyncThunk("user/addReview", addReviewThunk)
export const deleteReview = createAsyncThunk("user/deleteReview", deleteReviewThunk)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserAlert: (state, action: PayloadAction<Alert>) => {
            state.alert = action.payload
        },
        logout: (state) => {
            state.user = initialUser
            if (localStorage.getItem("user")) {
                localStorage.removeItem("user")
                state.alert = {
                    show: true,
                    type: "info",
                    msg: "You are now logged out.",
                }
            }
        },
    },
    extraReducers: (builder) => {
        // REGISTER USER
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // LOGIN USER
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false
            state.user = action.payload
            state.alert = {
                show: true,
                type: "success",
                msg: `Welcome back ${action.payload.email}`,
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // UPDATE CONTACT INFO
        builder.addCase(updateContactInfo.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            updateContactInfo.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.isLoading = false
                state.user = { ...action.payload, token: state.user.token }
                updateLocalStorageUser(state.user)
                state.alert = {
                    show: true,
                    type: "success",
                    msg: `Your contact info was updated!`,
                }
            }
        )
        builder.addCase(updateContactInfo.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // ADD TO WISHLIST
        builder.addCase(addToWishlist.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            addToWishlist.fulfilled,
            (state, action: PayloadAction<WishListProduct[]>) => {
                state.isLoading = false
                state.user.wishlist = [...action.payload]
                updateLocalStorageUser(state.user)
            }
        )
        builder.addCase(addToWishlist.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // REMOVE FROM WISHLIST
        builder.addCase(removeFromWishlist.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            removeFromWishlist.fulfilled,
            (state, action: PayloadAction<WishListProduct[]>) => {
                state.isLoading = false
                state.user.wishlist = [...action.payload]
                updateLocalStorageUser(state.user)
            }
        )
        builder.addCase(removeFromWishlist.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // ADD REVIEW
        builder.addCase(addReview.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addReview.fulfilled, (state, action: PayloadAction<Review[]>) => {
            state.isLoading = false
            state.user.reviews = [...action.payload]
            updateLocalStorageUser(state.user)
        })
        builder.addCase(addReview.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })

        // DELETE REVIEW
        builder.addCase(deleteReview.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            deleteReview.fulfilled,
            (state, action: PayloadAction<Review[]>) => {
                state.isLoading = false
                state.user.reviews = [...action.payload]
                updateLocalStorageUser(state.user)
            }
        )
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                show: true,
                type: "error",
                msg: action.payload as string,
            }
        })
    },
})

export default userSlice.reducer
export const { setUserAlert, logout } = userSlice.actions
