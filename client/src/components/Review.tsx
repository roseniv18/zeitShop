import {
    Container,
    Avatar,
    Rating,
    Divider,
    List,
    ListItem,
    ListItemText,
} from "@mui/material"
import user from "../assets/users/2.jpg"

type PropTypes = {
    userName: string
    rating: number
    comment?: string
}

const Review = ({ userName, rating, comment }: PropTypes) => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Avatar alt="Travis Howard" src={user} />
            <List sx={{ display: "flex", flexDirection: "column" }}>
                <ListItem>
                    <ListItemText primary={userName} secondary={comment ? comment : ""} />
                </ListItem>
                <ListItem>
                    <Rating name="read-only" value={rating} precision={0.5} readOnly />
                </ListItem>
                <Divider />
            </List>
        </Container>
    )
}
export default Review
