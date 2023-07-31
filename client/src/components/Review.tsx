import { useState } from "react"
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

const Review = () => {
    const [value, setValue] = useState<number | null>(4.6)

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
                    <ListItemText
                        primary="Heading"
                        secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    magnam placeat quis voluptatem nihil blanditiis, ipsum reiciendis
                    nemo. Et ipsum esse magni, possimus sed tenetur est, reprehenderit,
                    repellat blanditiis nemo fugit tempore veniam unde fuga iure tempora
                    deserunt facere maxime?"
                    />
                </ListItem>
                <ListItem>
                    <Rating name="read-only" value={value} precision={0.5} readOnly />
                </ListItem>
                <Divider />
            </List>
        </Container>
    )
}
export default Review
