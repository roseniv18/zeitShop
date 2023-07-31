import { Container } from "@mui/material"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { serverURL } from "../../helpers/serverURL"

const ProductGallery = ({ image_urls }: { image_urls: string[] }) => {
    return (
        <Container sx={{ m: 0, p: 0 }} disableGutters maxWidth="lg">
            <Carousel
                useKeyboardArrows={true}
                showStatus={false}
                showArrows={false}
                width="100%"
            >
                {image_urls.map((img, index) => {
                    return (
                        <div key={index}>
                            <img
                                src={`${serverURL}/images/${img}`}
                                alt=""
                                className="carousel-img"
                            />
                        </div>
                    )
                })}
            </Carousel>
        </Container>
    )
}

export default ProductGallery
