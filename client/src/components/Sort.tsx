import { useEffect } from "react"
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setSort } from "../redux/slices/productSlice"
import { getProducts } from "../redux/thunks/thunksExport"
// Avoid duplicate declaration
import { Sort as SortType } from "../types/ProductTypes/Sort"
import useIsFirstRender from "../hooks/useIsFirstRender"

const Sort = () => {
	const { filters, sort } = useAppSelector((store) => store.products)
	const isFirstRender: boolean = useIsFirstRender()
	const dispatch = useAppDispatch()

	const handleChange = (e: SelectChangeEvent) => {
		dispatch(setSort(e.target.value as SortType))
	}

	useEffect(() => {
		if (sort && !isFirstRender) {
			dispatch(getProducts({ filters, sort }))
		}
	}, [sort])

	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id="sort-label">Sort By</InputLabel>
				<Select
					labelId="sort-label"
					id="sort"
					value={sort}
					label="Sort By"
					onChange={handleChange}
				>
					<MenuItem value={"fullName-asc"}>Alphabetical a-z</MenuItem>
					<MenuItem value={"fullName-desc"}>
						Alphabetical z-a
					</MenuItem>
					<MenuItem value={"price-asc"}>Price ascending</MenuItem>
					<MenuItem value={"price-desc"}>Price descending</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}

export default Sort
