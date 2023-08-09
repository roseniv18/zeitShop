import { ChangeEvent } from "react"
import { Box, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { Categories } from "../../types/Categories"
import { categories } from "../../helpers/categories"
import { Filters } from "../../types/Filters"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { BpIcon, BpCheckedIcon } from "./../CustomMaterialUI/CustomCheckbox"
import { setFilters } from "../../redux/productSlice"

type PropsType = {
    formattedCategory: string
    catFilter: string
}

const CategoryItem = ({ formattedCategory, catFilter }: PropsType) => {
    const { filters } = useAppSelector((store) => store.products)
    const dispatch = useAppDispatch()

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

    return (
        <Box>
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
                {categories[catFilter as Categories].map((el, index) => {
                    const formattedFilter: string =
                        el.charAt(0).toLocaleUpperCase() + el.slice(1).replace("_", " ")

                    const currentCategory: string[] = filters[catFilter as Categories]
                    const isChecked: boolean = currentCategory.includes(el as Categories)

                    return (
                        <FormControlLabel
                            key={index}
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
        </Box>
    )
}

export default CategoryItem
