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

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        categoryName:
            | "brand"
            | "dial_color"
            | "case_material"
            | "band_material"
            | "mechanism"
    ) => {
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
        const timeoutId: number = setTimeout(() => {
            dispatch(getProducts(filters))
        }, 200)

        return () => {
            clearTimeout(timeoutId)
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
            <Divider textAlign="left" sx={{ my: 2, fontWeight: 500 }}>
                Brand
            </Divider>
            <FormGroup
                onChange={(e) =>
                    handleChange(e as ChangeEvent<HTMLInputElement>, "brand")
                }
            >
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Casio"
                    name="casio"
                    checked={filters.brand.includes("casio")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Orient"
                    name="orient"
                    checked={filters.brand.includes("orient")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Seiko"
                    name="seiko"
                    checked={filters.brand.includes("seiko")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Omega"
                    name="omega"
                    checked={filters.brand.includes("omega")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Rolex"
                    name="rolex"
                    checked={filters.brand.includes("rolex")}
                />
            </FormGroup>
            <Divider textAlign="left" sx={{ my: 2, fontWeight: 500 }}>
                Dial Color
            </Divider>
            <FormGroup
                onChange={(e) =>
                    handleChange(e as ChangeEvent<HTMLInputElement>, "dial_color")
                }
            >
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Black"
                    name="black"
                    checked={filters.dial_color.includes("black")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="White"
                    name="white"
                    checked={filters.dial_color.includes("white")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Blue"
                    name="blue"
                    checked={filters.dial_color.includes("blue")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Green"
                    name="green"
                    checked={filters.dial_color.includes("green")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Brown"
                    name="brown"
                    checked={filters.dial_color.includes("brown")}
                />
            </FormGroup>

            <Divider textAlign="left" sx={{ my: 2, fontWeight: 500 }}>
                Case Material
            </Divider>
            <FormGroup
                onChange={(e) =>
                    handleChange(e as ChangeEvent<HTMLInputElement>, "case_material")
                }
            >
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Stainless steel"
                    name="stainless_steel"
                    checked={filters.case_material.includes("stainless_steel")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Resin"
                    name="resin"
                    checked={filters.case_material.includes("resin")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Gold"
                    name="gold"
                    checked={filters.case_material.includes("gold")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Gold coating"
                    name="gold_coating"
                    checked={filters.case_material.includes("gold_coating")}
                />
            </FormGroup>

            <Divider textAlign="left" sx={{ my: 2, fontWeight: 500 }}>
                Band Material
            </Divider>
            <FormGroup
                onChange={(e) =>
                    handleChange(e as ChangeEvent<HTMLInputElement>, "band_material")
                }
            >
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Stainless steel"
                    name="stainless_steel"
                    checked={filters.band_material.includes("stainless_steel")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Resin"
                    name="resin"
                    checked={filters.band_material.includes("resin")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Leather"
                    name="leather"
                    checked={filters.band_material.includes("leather")}
                />
            </FormGroup>

            <Divider textAlign="left" sx={{ my: 2, fontWeight: 500 }}>
                Mechanism
            </Divider>
            <FormGroup
                onChange={(e) =>
                    handleChange(e as ChangeEvent<HTMLInputElement>, "mechanism")
                }
            >
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Analog"
                    name="analog"
                    checked={filters.mechanism.includes("analog")}
                />
                <FormControlLabel
                    control={<Checkbox size="small" sx={{ p: 0, px: 1 }} />}
                    label="Digital"
                    name="digital"
                    checked={filters.mechanism.includes("digital")}
                />
            </FormGroup>

            <Divider textAlign="left" sx={{ my: 2, fontWeight: 500 }}>
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
