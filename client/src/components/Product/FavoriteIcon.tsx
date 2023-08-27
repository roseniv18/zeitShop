import { useAppDispatch, useAppSelector } from "../../redux/store"
import { addToWishlist, removeFromWishlist } from "../../redux/userSlice"
import { Link } from "react-router-dom"
import { default as HeartBorderIcon } from "@mui/icons-material/FavoriteBorder"
import { default as HeartIcon } from "@mui/icons-material/Favorite"

type PropTypes = {
    productId: string
    productName: string
    thumbnail: string
}

const FavoriteIcon = ({ productId, productName, thumbnail }: PropTypes) => {
    const { user } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()

    let isWishlisted = false
    for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].productId === productId) {
            isWishlisted = true
        }
    }

    return (
        <>
            {user._id && user.token ? (
                isWishlisted ? (
                    <HeartIcon
                        sx={{ ":hover": { cursor: "pointer" } }}
                        color="warning"
                        onClick={() =>
                            dispatch(
                                removeFromWishlist({
                                    _id: user._id,
                                    productId: productId,
                                })
                            )
                        }
                    />
                ) : (
                    <HeartBorderIcon
                        sx={{ ":hover": { cursor: "pointer" } }}
                        onClick={() =>
                            dispatch(
                                addToWishlist({
                                    _id: user._id,
                                    productName,
                                    productId: productId,
                                    image: thumbnail,
                                })
                            )
                        }
                    />
                )
            ) : (
                <Link to="/login">
                    <HeartBorderIcon sx={{ ":hover": { cursor: "pointer" } }} />
                </Link>
            )}
        </>
    )
}

export default FavoriteIcon
