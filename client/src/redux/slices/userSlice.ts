import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/UserTypes/User"
import { initialUser } from "../initialStates/initialUser"
import { WishListProduct } from "../../types/ProductTypes/WishlistProduct"
import { updateLocalStorageUser } from "../../helpers/updateLocalStorageUser"
import { Review } from "../../types/UserTypes/Review"
import { Alert } from "../../types/MiscTypes/Alert"
import { getUserFromLocalStorage } from "../../helpers/getFromLocalStorage"
import {
	registerUser,
	loginUser,
	removeFromWishlist,
	addToWishlist,
	deleteReview,
	addReview,
	updateContactInfo,
} from "../thunks/thunksExport"

type UserState = {
	user: User
	isLoading: boolean
	alert: Alert
}

const initialState: UserState = {
	user: getUserFromLocalStorage(),
	isLoading: false,
	alert: {
		show: false,
		type: "info",
		msg: "",
	},
}

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
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false
				state.user = action.payload
				state.alert = {
					show: true,
					type: "success",
					msg: `Welcome ${action.payload.firstName}`,
				}
			}
		)
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
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false
				state.user = action.payload
				state.alert = {
					show: true,
					type: "success",
					msg: `Welcome back ${action.payload.firstName}`,
				}
			}
		)
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
				state.alert = {
					show: true,
					type: "success",
					msg: `Added item to wishlist!`,
				}
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
				state.alert = {
					show: true,
					type: "success",
					msg: `Removed item from wishlist.`,
				}
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
		builder.addCase(
			addReview.fulfilled,
			(state, action: PayloadAction<Review[]>) => {
				state.isLoading = false
				state.user.reviews = [...action.payload]
				updateLocalStorageUser(state.user)
				state.alert = {
					show: true,
					type: "success",
					msg: `Successfully added review!`,
				}
			}
		)
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
				state.alert = {
					show: true,
					type: "success",
					msg: `Successfully deleted review!`,
				}
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
