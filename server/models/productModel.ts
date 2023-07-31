import mongoose from "mongoose"

const reviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        required: [true, "Please provide user name"],
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating"],
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: false,
    },
    productName: {
        type: String,
        required: [true, "Please provide a product name"],
    },
    image: {
        type: String,
        // required: [true, "Please provide an image"],
    },
    productId: {
        type: String,
        required: [true, "Please provide a product id"],
    },
})

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
        reviews: [reviewsSchema],
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product
