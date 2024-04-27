import { useState, useEffect } from "react"
import {
	Box,
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Slider,
	Button,
} from "@mui/material"
import { Categories } from "../../types/ProductTypes/Categories"
import { categories } from "../../helpers/categories"
import { setFilters } from "../../redux/slices/productSlice"
import { getProducts } from "../../redux/thunks/thunksExport"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import CloseIcon from "@mui/icons-material/Close"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import useIsFirstRender from "../../hooks/useIsFirstRender"
import { initialFilters } from "../../redux/initialStates/initialFilters"
import CategoryAccordion from "./CategoryAccordion"

// Get price value text for slider
const getValueText = (value: number) => {
	return `€ ${value}`
}

export const CategorySidebarMobile = () => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false)
	const isFirstRender: boolean = useIsFirstRender()
	const { filters, sort } = useAppSelector((store) => store.products)
	const dispatch = useAppDispatch()

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const marks = [
		{ value: filters.price[0], label: `€ ${filters.price[0]}` },
		{ value: filters.price[1], label: `€ ${filters.price[1]}` },
	]

	// Get total number of active filters
	const activeFilters: number = Object.keys(filters).reduce((acc, curr) => {
		// Check if category array is not empty
		if (filters[curr as keyof typeof filters][0]) {
			acc += 1
		}

		return acc
	}, 0)

	const handlePriceChange = (e: Event) => {
		// @ts-ignore
		const { name, value } = e.target
		dispatch(setFilters({ ...filters, price: value }))
	}

	useEffect(() => {
		// This prevents unnecessary request on first mount
		if (!isFirstRender) {
			const timeoutId: number = setTimeout(() => {
				dispatch(getProducts({ filters, sort }))
			}, 350)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [filters])

	// DRAWER
	const drawer = (
		<Box
			sx={{
				position: "absolute",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				px: 6,
				width: "100%",
			}}
		>
			<Toolbar
				disableGutters
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h6" noWrap component="div">
					Filters {activeFilters ? `(${activeFilters})` : <></>}
				</Typography>
				<Button
					sx={{ color: "#e83030" }}
					onClick={() => dispatch(setFilters(initialFilters))}
				>
					Clear filters
				</Button>
			</Toolbar>
			<Divider />

			{Object.keys(categories).map((catFilter, index) => {
				if (catFilter !== "price") {
					const formattedCategory: string = catFilter
						.toLocaleUpperCase()
						.replace("_", " ")
					const currFilter: string[] =
						categories[catFilter as Categories]
					// Check how many filters are active for the given category
					const amountOfCheckedFilters: number =
						filters[catFilter as Categories].length
					return (
						<CategoryAccordion
							key={index}
							index={index}
							formattedCategory={formattedCategory}
							amountOfCheckedFilters={amountOfCheckedFilters}
							catFilter={catFilter}
							currFilter={currFilter}
						/>
					)
				}
			})}

			<Divider textAlign="left" sx={{ my: 2, fontWeight: 600 }}>
				Price
			</Divider>
			<Slider
				getAriaLabel={() => "Price"}
				getAriaValueText={getValueText}
				name="price"
				value={filters.price}
				valueLabelDisplay="auto"
				marks={marks}
				step={100}
				min={0}
				max={1000}
				onChange={handlePriceChange}
				sx={{ maxWidth: "75%" }}
			/>

			<Button
				onClick={handleDrawerToggle}
				variant="contained"
				size="large"
				startIcon={<CloseIcon />}
				sx={{
					margin: "0 auto",
				}}
			>
				CLOSE
			</Button>
		</Box>
	)

	const container = window !== undefined ? () => document.body : undefined

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="absolute"
				sx={{
					width: "100%",
					top: "auto",
					left: 0,
					color: "primary.main",
					bgcolor: "#f6f6f6",
					borderTop: "1.5px solid #c0c0c0",
					borderBottom: "1.5px solid #c0c0c0",
					boxShadow: "none",
					transition: ".18s linear",
					cursor: "pointer",
					"&:hover": {
						bgcolor: "#dfdfdf",
						transition: ".18s linear",
					},
				}}
				onClick={handleDrawerToggle}
			>
				<Toolbar
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
					>
						<FilterAltIcon />
					</IconButton>
					<Typography variant="h6" sx={{ cursor: "pointer" }}>
						Filters {activeFilters ? `(${activeFilters})` : <></>}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{
					width: { xs: "100%", sm: "60%", md: "50%" },
					flexShrink: { sm: 0 },
					p: 3,
				}}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: "block",
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: { xs: "100%", sm: "60%", md: "50%" },
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	)
}
