import { useAppSelector } from "../../redux/store"
import PersonalInfo from "./PersonalInfo"
import Reviews from "./Reviews/Reviews"
import Wishlist from "./Wishlist/Wishlist"

const ProfileContent = () => {
    const { isLoading } = useAppSelector((store) => store.user)
    const { activeTab, drawerWidth } = useAppSelector((store) => store.misc)
    const listElementPairs: Map<string, JSX.Element> = new Map([
        ["Personal Info", <PersonalInfo drawerWidth={drawerWidth} />],
        ["Reviews", <Reviews drawerWidth={drawerWidth} />],
        ["Wishlist", <Wishlist drawerWidth={drawerWidth} />],
    ])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return listElementPairs.get(activeTab)
}

export default ProfileContent
