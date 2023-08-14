import { useState, useEffect, ChangeEvent, Fragment, KeyboardEvent } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import { Product } from "../../types/Product"
import SearchIcon from "@mui/icons-material/Search"
import SearchItem from "./SearchItem"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getSearchProducts } from "../../redux/searchSlice"
import useIsFirstRender from "../../hooks/useIsFirstRender"
import { Divider } from "@mui/material"

export default function SearchBar() {
    const { searchProducts, isLoading } = useAppSelector((store) => store.search)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<Product[]>(searchProducts)
    const [searchValue, setSearchValue] = useState<string>("")
    const [validString, setValidString] = useState<boolean>(true)
    const isFirstRender: boolean = useIsFirstRender()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValidString(false)
        const regex: RegExp = new RegExp("^[a-zA-Z0-9- ]*$")
        if (regex.test(e.target.value)) {
            setSearchValue(e.target.value)
            setValidString(true)
            return
        }
    }

    const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("submit")
        }
    }

    useEffect(() => {
        if (!isFirstRender) {
            const timeoutId: number = setTimeout(() => {
                dispatch(getSearchProducts(searchValue))
            }, 1000)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [searchValue])

    useEffect(() => {
        setOptions(searchProducts)
    }, [searchProducts])

    useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    return (
        <>
            <Autocomplete
                id="search-bar"
                size="small"
                sx={{ width: { xs: 300, sm: 330, md: 360 }, my: 0, mx: "auto" }}
                freeSolo
                open={open}
                onKeyDown={handleSubmit}
                onOpen={() => {
                    setOpen(true)
                }}
                onClose={() => {
                    setOpen(false)
                }}
                isOptionEqualToValue={(option, value) =>
                    option.fullName === value.fullName
                }
                getOptionLabel={(option) => {
                    if (typeof option === "string") {
                        return option
                    }
                    return option.fullName
                }}
                options={options}
                renderOption={(props, option) => {
                    if (options && options.length > 0) {
                        return (
                            <>
                                <SearchItem
                                    key={option._id}
                                    name={option.fullName}
                                    price={option.price}
                                    img={option.image_urls[0]}
                                    url={option.nameId}
                                />
                                {/* DON'T DISPLAY DIVIDER AFTER LAST ITEM */}
                                {option._id !== options[options.length - 1]._id ? (
                                    <Divider />
                                ) : (
                                    <></>
                                )}
                            </>
                        )
                    }
                }}
                loading={isLoading}
                filterOptions={(x) => x}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputLabelProps={{
                            sx: {
                                bgcolor: "transparent",
                            },
                        }}
                        onChange={handleChange}
                        value={searchValue}
                        placeholder="Search here..."
                        error={!validString}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {isLoading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                            startAdornment: (
                                <Fragment>
                                    <SearchIcon />
                                </Fragment>
                            ),
                            sx: { bgcolor: "#fff" },
                        }}
                    />
                )}
            />
        </>
    )
}
