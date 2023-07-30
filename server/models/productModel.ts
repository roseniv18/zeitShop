import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        nameId: String,
        article_number: String,
        brand: String,
        model: String,
        model_info: String,
        price: Number,
        case_diameter: Number,
        band_material: String,
        case_material: {
            type: [{ type: String }],
        },
        image_urls: {
            type: [{ type: String }],
        },
        dial_color: String,
        mechanism: String,
        fullName: String,
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product
