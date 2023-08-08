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
import { getProducts, setSort } from "../redux/productSlice"
// Avoid duplicate declaration
import { Sort as SortType } from "../types/Sort"
import useIsFirstRender from "../hooks/useIsFirstRender"

const Sort = () => {
    const { sort } = useAppSelector((store) => store.products)
    const isFirstRender: boolean = useIsFirstRender()
    const dispatch = useAppDispatch()

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(setSort(e.target.value as SortType))
    }

    useEffect(() => {
        if (sort && !isFirstRender) {
            dispatch(getProducts({ sort }))
        }
    }, [sort])

    return (
        <Box
            sx={{
                position: "absolute",
                top: "30px",
                right: "95px",
                minHeight: "30px",
                height: "30px",
                minWidth: "180px",
            }}
        >
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
                    <MenuItem value={"fullName-desc"}>Alphabetical z-a</MenuItem>
                    <MenuItem value={"price-asc"}>Price ascending</MenuItem>
                    <MenuItem value={"price-desc"}>Price descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Sort
