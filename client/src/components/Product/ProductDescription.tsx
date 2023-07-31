import { styled } from "@mui/material/styles"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material"
import { tableCellClasses } from "@mui/material/TableCell"
import { useAppSelector } from "../../redux/store"

export default function ProductDescription() {
    const { product } = useAppSelector((store) => store.products)

    const {
        brand,
        model,
        case_diameter,
        bracelet_material,
        case_material,
        dial_color,
        mechanism,
    } = product

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }))

    function createData(name: string, data: string | number) {
        return { name, data }
    }

    const rows = [
        createData("Brand", brand),
        createData("Model", model),
        createData("Case Diameter", `${case_diameter}mm`),
        createData("Bracelet Material", bracelet_material),
        createData("Case Material", case_material.join(", ")),
        createData("Dial Color", dial_color),
        createData("Mechanism", mechanism),
    ]

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead></TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow
                            key={row.name}
                            sx={{ textTransform: "capitalize" }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: 600 }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.data}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
