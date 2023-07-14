import mongoose from "mongoose"
import products from "../products"
import Product from "../models/productModel"

const populateDB = async () => {
    const watches = products.watches
    try {
        watches.forEach(async (watch) => {
            await Product.create(watch)
            console.log(watch)
        })
    } catch (error) {}
}

export default populateDB
