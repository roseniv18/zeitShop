import { useEffect } from "react"
import { Container, Slider, Divider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getProducts, setFilters } from "../../redux/productSlice"
import { categories } from "../../helpers/categories"
import useIsFirstRender from "../../hooks/useIsFirstRender"
import CategoryItem from "./CategoryItem"

// Get price value text for slider
const getValueText = (value: number) => {
    return `€ ${value}`
}

const CategorySidebar = () => {
    const { filters, sort } = useAppSelector((store) => store.products)
    const marks = [
        { value: filters.price[0], label: `€ ${filters.price[0]}` },
        { value: filters.price[1], label: `€ ${filters.price[1]}` },
    ]
    const dispatch = useAppDispatch()
    const isFirstRender: boolean = useIsFirstRender()

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

    return (
        <Container
            sx={{
                bgcolor: "transparent",
                textAlign: "center",
                py: 2,
            }}
        >
            {Object.keys(categories).map((catFilter, index) => {
                if (catFilter !== "price") {
                    const formattedCategory: string = catFilter
                        .toLocaleUpperCase()
                        .replace("_", " ")
                    return (
                        <CategoryItem
                            key={index}
                            formattedCategory={formattedCategory}
                            catFilter={catFilter}
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
            />
        </Container>
    )
}

export default CategorySidebar
