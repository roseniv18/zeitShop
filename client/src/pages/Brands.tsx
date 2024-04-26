import { Typography, Grid, Container, Box } from "@mui/material"
import { serverURL } from "../helpers/serverURL"
import { useNavigate } from "react-router"

const Brands = () => {
	const navigate = useNavigate()

	// Be careful when changing these, as the image src and router pages are dependent on them.
	const brands: string[] = ["casio", "citizen", "orient", "seiko"]

	return (
		<Container>
			<Typography variant="h2" sx={{ my: 3 }}>
				Brands
			</Typography>
			<Grid container spacing={3}>
				{brands.map((brand) => (
					<Grid item xs={12} sm={6} md={4}>
						<Box
							className="brand-img-container"
							sx={{
								maxWidth: "100%",
								height: "100%",
								maxHeight: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<img
								src={`${serverURL}/images/brands/${brand}.jpg`}
								className="brand-img"
								onClick={() => navigate(`/products/${brand}`)}
							/>
						</Box>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default Brands
