import { ChangeEvent } from "react"
import {
	Box,
	Accordion,
	AccordionSummary,
	Typography,
	Button,
	AccordionDetails,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material"
import { setFilters } from "../../redux/slices/productSlice"
import { BpIcon, BpCheckedIcon } from "../CustomMaterialUI/CustomCheckbox"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Filters } from "../../types/ProductTypes/Filters"
import { Categories } from "../../types/ProductTypes/Categories"

type PropsType = {
	index: number
	formattedCategory: string
	amountOfCheckedFilters: number
	currFilter: string[]
	catFilter: string
}

const CategoryAccordion = ({
	index,
	formattedCategory,
	amountOfCheckedFilters,
	currFilter,
	catFilter,
}: PropsType) => {
	const { filters } = useAppSelector((store) => store.products)
	const dispatch = useAppDispatch()

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		categoryName: Categories
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
				[categoryName]: [...filters[categoryName]].filter(
					(br) => br !== name
				),
			}
			dispatch(setFilters(newFilters))

			return
		}
	}

	return (
		<Box sx={{ width: { xs: "100%", md: "75%" }, marginBottom: 1 }}>
			<Accordion disableGutters elevation={1}>
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
						{currFilter.map((el, index) => {
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
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

export default CategoryAccordion
