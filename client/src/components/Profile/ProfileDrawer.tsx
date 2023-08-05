import { useState, useEffect } from "react"
import PersonIcon from "@mui/icons-material/Person"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarsIcon from "@mui/icons-material/Stars"
import ProfileDrawerMobile from "./ProfileDrawerMobile"
import ProfileDrawerLarge from "./ProfileDrawerLarge"

export default function ProfileDrawer() {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
    const list: string[] = ["Personal Info", "Reviews", "Wishlist"]

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const listIconPairs: Map<string, JSX.Element> = new Map([
        ["Personal Info", <PersonIcon />],
        ["Reviews", <StarsIcon />],
        ["Wishlist", <FavoriteIcon />],
    ])

    return screenWidth < 768 ? (
        <ProfileDrawerMobile list={list} listIconPairs={listIconPairs} />
    ) : (
        <ProfileDrawerLarge list={list} listIconPairs={listIconPairs} />
    )
}
