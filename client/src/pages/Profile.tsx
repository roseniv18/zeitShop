import { Container } from "@mui/material"
import ProfileDrawer from "../components/Profile/ProfileDrawer"
import ProfileContent from "../components/Profile/ProfileContent"

const Profile = () => {
    return (
        <Container sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
            <ProfileDrawer />
            <ProfileContent />
        </Container>
    )
}

export default Profile
