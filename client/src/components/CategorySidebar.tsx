import { useEffect, ChangeEvent } from "react"
import {
    Container,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Slider,
    Divider,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getProducts, setFilters } from "../redux/productSlice"
import { Filters } from "../types/Filters"
import { BpIcon, BpCheckedIcon } from "./CustomMaterialUI/CustomCheckbox"
import { isFiltersEmpty } from "../helpers/isFiltersEmpty"

type Categories = "brand" | "dial_color" | "case_material" | "band_material" | "mechanism"

// Get price value text for slider
const getValueText = (value: number) => {
    return `€ ${value}`
}

const CategorySidebar = () => {
    const { filters } = useAppSelector((store) => store.products)
    const marks = [
        { value: filters.price[0], label: `€ ${filters.price[0]}` },
        { value: filters.price[1], label: `€ ${filters.price[1]}` },
    ]
    const dispatch = useAppDispatch()
    const categories: Filters = {
        brand: ["casio", "orient", "seiko", "citizen"],
        dial_color: ["black", "white", "blue", "green", "brown"],
        case_material: ["stainless_steel", "resin", "gold", "gold coating", "polymer"],
        band_material: ["stainless_steel", "resin", "leather", "polymer", "textile"],
        mechanism: ["analog", "digital"],
        price: [0, 1000],
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, categoryName: Categories) => {
        const { name, checked } = e.target
        if (checked) {
            const newFilters: Filters = {
                ...filters,
                [categoryName]: [...filters[categoryName], name],
            }
            dispatch(setFilters(newFilters))
            return
        } else {
            const newFilters: Filters = {
                ...filters,
                [categoryName]: [...filters[categoryName]].filter((br) => br !== name),
            }
            dispatch(setFilters(newFilters))

            return
        }
    }

    const handlePriceChange = (e: Event) => {
        // @ts-ignore
        const { name, value } = e.target
        dispatch(setFilters({ ...filters, price: value }))
    }

    useEffect(() => {
        // This prevents unnecessary request on first mount
        if (!isFiltersEmpty(filters)) {
            const timeoutId: number = setTimeout(() => {
                dispatch(getProducts(filters))
            }, 200)

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
            {Object.keys(categories).map((catFilter) => {
                if (catFilter !== "price") {
                    const formattedCategory: string = catFilter
                        .toLocaleUpperCase()
                        .replace("_", " ")
                    return (
                        <>
                            <Divider textAlign="left" sx={{ my: 2, fontWeight: 600 }}>
                                {formattedCategory}
                            </Divider>
                            <FormGroup
                                onChange={(e) =>
                                    handleChange(
                                        e as ChangeEvent<HTMLInputElement>,
                                        catFilter as Categories
                                    )
                                }
                            >
                                {categories[catFilter as Categories].map((el) => {
                                    const formattedFilter: string =
                                        el.charAt(0).toLocaleUpperCase() +
                                        el.slice(1).replace("_", " ")

                                    const currentCategory: string[] =
                                        filters[catFilter as Categories]
                                    const isChecked: boolean = currentCategory.includes(
                                        el as Categories
                                    )

                                    return (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    icon={<BpIcon />}
                                                    checkedIcon={<BpCheckedIcon />}
                                                    size="small"
                                                    sx={{ p: 0, px: 1 }}
                                                />
                                            }
                                            label={formattedFilter}
                                            name={el}
                                            checked={isChecked}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </>
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
                step={50}
                min={0}
                max={1000}
                onChange={handlePriceChange}
            />
        </Container>
    )
}

export default CategorySidebar
