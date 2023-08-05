import { useState, useEffect, ChangeEvent } from "react"
import {
    Box,
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Slider,
    Button,
    Container,
} from "@mui/material"
import { BpIcon, BpCheckedIcon } from "./CustomMaterialUI/CustomCheckbox"
import { Filters } from "../types/Filters"
import { setFilters, getProducts } from "../redux/productSlice"
import { useAppDispatch, useAppSelector } from "../redux/store"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CloseIcon from "@mui/icons-material/Close"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

type Categories = "brand" | "dial_color" | "case_material" | "band_material" | "mechanism"

// Get price value text for slider
const getValueText = (value: number) => {
    return `€ ${value}`
}

export const CategorySidebarMobile = () => {
    const [mobileOpen, setMobileOpen] = useState(true)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const { filters } = useAppSelector((store) => store.products)

    const marks = [
        { value: filters.price[0], label: `€ ${filters.price[0]}` },
        { value: filters.price[1], label: `€ ${filters.price[1]}` },
    ]
    const dispatch = useAppDispatch()

    const categories: Filters = {
        brand: ["casio", "orient", "seiko"],
        dial_color: ["black", "white", "blue", "green", "brown"],
        case_material: ["stainless_steel", "resin", "gold", "gold coating"],
        band_material: ["stainless_steel", "resin", "leather"],
        mechanism: ["analog", "digital"],
        price: [0, 1000],
    }

    // Get total number of active filters
    const activeFilters: number = Object.keys(filters).reduce((acc, curr) => {
        // Check if category array is not empty
        if (filters[curr as keyof typeof filters][0]) {
            acc += 1
        }

        return acc
    }, 0)

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
        const timeoutId: number = setTimeout(() => {
            dispatch(getProducts(filters))
        }, 200)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [filters])

    const drawer = (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 6,
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Filters {activeFilters ? `(${activeFilters})` : <></>}
                </Typography>
            </Toolbar>
            <Divider />

            {Object.keys(categories).map((catFilter, index) => {
                if (catFilter !== "price") {
                    const formattedCategory: string = catFilter
                        .toLocaleUpperCase()
                        .replace("_", " ")
                    const currFilter: string[] = categories[catFilter as Categories]
                    // Check how many filters are active for the given category
                    const amountOfCheckedFilters: number =
                        filters[catFilter as Categories].length
                    return (
                        <>
                            <Accordion sx={{ width: "100%" }} disableGutters>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}`}
                                    id={`panel${index}`}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography>{formattedCategory}</Typography>

                                    {amountOfCheckedFilters ? (
                                        <Button
                                            sx={{
                                                p: 0,
                                                width: "5px",
                                                minWidth: "20px",
                                                maxWidth: "20px",
                                                marginLeft: "auto",
                                                marginRight: 1,
                                            }}
                                            variant="contained"
                                            size="small"
                                        >
                                            {amountOfCheckedFilters}
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup
                                        onChange={(e) =>
                                            handleChange(
                                                e as ChangeEvent<HTMLInputElement>,
                                                catFilter as Categories
                                            )
                                        }
                                    >
                                        {currFilter.map((el) => {
                                            const formattedFilter: string =
                                                el.charAt(0).toLocaleUpperCase() +
                                                el.slice(1).replace("_", " ")

                                            const currentCategory: string[] =
                                                filters[catFilter as Categories]
                                            const isChecked: boolean =
                                                currentCategory.includes(el as Categories)

                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            icon={<BpIcon />}
                                                            checkedIcon={
                                                                <BpCheckedIcon />
                                                            }
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
                                </AccordionDetails>
                            </Accordion>
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
        </Container>
    )

    const container = window !== undefined ? () => document.body : undefined

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `300px` },
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
                        sx={{ display: { sm: "none" } }}
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
                sx={{ width: { sm: "100%" }, flexShrink: { sm: 0 }, p: 3 }}
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
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: "100%",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: "100%",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}
