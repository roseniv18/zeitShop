import { useState, SyntheticEvent } from "react"
import { Box, Tabs, Tab, Container } from "@mui/material"
import ProductDescription from "./ProductDescription"
import Reviews from "../Reviews"
import { Product } from "../../types/Product"

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

const ProductTabs = ({ reviewingProduct }: { reviewingProduct: Product }) => {
    const [value, setValue] = useState<number>(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Reviews" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ProductDescription />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Reviews reviewingProduct={reviewingProduct} />
            </CustomTabPanel>
        </Container>
    )
}

export default ProductTabs
