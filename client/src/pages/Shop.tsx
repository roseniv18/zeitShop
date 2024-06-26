import { useState, useRef } from "react"
import CategorySidebar from "../components/Sidebar/CategorySidebar"
import { Grid, Container, Typography, Button, Box } from "@mui/material"
import Item from "../components/Product/ProductCard"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { setFilters } from "../redux/slices/productSlice"
import { getProducts, loadMoreProducts } from "../redux/thunks/thunksExport"
import Spinner from "../components/Spinner"
import { CategorySidebarMobile } from "../components/Sidebar/CategorySidebarMobile"
import { useParams } from "react-router"
import ActiveFilters from "../components/ActiveFilters"
import Sort from "../components/Sort"

const Shop = () => {
	const { products, isLoading, isLoadingMoreProducts, filters, sort } =
		useAppSelector((store) => store.products)
	// Track the screen width to display correct category sidebar
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

	const page = useRef<number>(2)
	const dispatch = useAppDispatch()
	const { brand } = useParams()

	useEffect(() => {
		// Fetch products based on brand
		if (brand) {
			dispatch(setFilters({ ...filters, brand: [brand] }))
			return
		}

		dispatch(getProducts({ filters, sort }))
	}, [])

	// Track window resize
	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const handleLoadMoreProducts = async () => {
		const currPage: number = page.current
		await dispatch(loadMoreProducts({ filters, sort, page: currPage }))
		page.current += 1
	}

	return (
		<Container maxWidth="lg">
			{screenWidth < 900 ? <CategorySidebarMobile /> : <></>}

			<Grid
				container
				sx={{ my: 10, justifyContent: "space-between" }}
				direction="row"
			>
				{screenWidth >= 900 ? (
					<Grid
						item
						xs={2}
						sx={{ display: { xs: "none", md: "block" } }}
					>
						<CategorySidebar />
					</Grid>
				) : (
					<></>
				)}

				<Grid
					container
					item
					xs={12}
					md={9}
					spacing={3}
					sx={{
						position: "relative",
						justifyContent: { xs: "center", md: "start" },
						alignContent: "start",
						paddingLeft: 3,
					}}
				>
					<Grid item container xs={12} spacing={3}>
						<Grid item xs={12} sm={6} md={8} lg={9}>
							<Typography
								variant="h3"
								sx={{
									textTransform: "capitalize",
									textAlign: "left",
								}}
							>
								{brand && filters.brand.includes(brand)
									? `${brand} watches`
									: "Watches"}
							</Typography>

							<Typography
								variant="body1"
								sx={{ opacity: 0.75, textAlign: "left" }}
							>
								Showing {products.products.length} of{" "}
								{products.totalCount}
							</Typography>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Sort />
						</Grid>

						<Grid item xs={12}>
							<ActiveFilters />
						</Grid>
					</Grid>

					<Grid
						item
						container
						spacing={3}
						xs={12}
						sx={{
							justifyContent: { xs: "center", md: "start" },
						}}
					>
						{!isLoading ? (
							products.products.length > 0 ? (
								products.products.map((product) => {
									return (
										<Grid
											item
											xs={9}
											sm={5}
											md={4}
											key={product._id}
											sx={{ height: "420px" }}
										>
											<Item product={product} />
										</Grid>
									)
								})
							) : (
								<Typography variant="h2">
									No products found.
								</Typography>
							)
						) : (
							<Spinner />
						)}

						{isLoadingMoreProducts ? (
							<Box
								sx={{
									my: 5,
									width: "100%",
									margin: "0 auto",
								}}
							>
								<Spinner />
							</Box>
						) : (
							<></>
						)}

						{products.products.length === products.totalCount ? (
							<></>
						) : (
							<Grid item sx={{ margin: "0 auto" }}>
								<Button
									sx={{
										margin: "1em auto",
									}}
									variant="contained"
									size="large"
									onClick={handleLoadMoreProducts}
									disabled={
										isLoading || isLoadingMoreProducts
									}
								>
									Load more
								</Button>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Shop
