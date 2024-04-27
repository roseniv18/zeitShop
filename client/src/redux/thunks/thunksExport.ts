// A separate file that exports all thunks.
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllProductsThunk } from "./products/getAllProductsThunk"
import { loadMoreProductsThunk } from "./products/loadMoreProductsThunk"
import { getProductThunk } from "./products/getProductThunk"
import { getReviewsThunk } from "./products/getReviewsThunk"
import { getSearchProductsThunk } from "./products/getSearchProductsThunk"
import { registerUserThunk } from "./user/registerUserThunk"
import { loginUserThunk } from "./user/loginUserThunk"
import { updateContactInfoThunk } from "./user/updateContactInfoThunk"
import { addToWishlistThunk } from "./user/addToWishlistThunk"
import { removeFromWishlistThunk } from "./user/removeFromWishListThunk"
import { addReviewThunk } from "./user/addReviewThunk"
import { deleteReviewThunk } from "./user/deleteReviewThunk"

// PRODUCT THUNKS
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

// SEARCH THUNK
export const getSearchProducts = createAsyncThunk(
	"search/getProducts",
	getSearchProductsThunk
)

// USER THUNKS
export const registerUser = createAsyncThunk("user/register", registerUserThunk)
export const loginUser = createAsyncThunk("user/login", loginUserThunk)
export const updateContactInfo = createAsyncThunk(
	"user/updateContactInfo",
	updateContactInfoThunk
)
export const addToWishlist = createAsyncThunk(
	"user/addToWishlist",
	addToWishlistThunk
)
export const removeFromWishlist = createAsyncThunk(
	"user/removeFromWishlist",
	removeFromWishlistThunk
)
export const addReview = createAsyncThunk("user/addReview", addReviewThunk)
export const deleteReview = createAsyncThunk(
	"user/deleteReview",
	deleteReviewThunk
)
