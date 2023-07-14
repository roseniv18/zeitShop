import mongoose from "mongoose"
import products from "../products"
import Product from "../models/productModel"
import generateNameIds from "../nameIds"

const imgUrls = [
    [
        "casio-edifice-eqb-1200d-2aer-solar-bluetooth-1.jpg",
        "casio-edifice-eqb-1200d-2aer-solar-bluetooth-2.jpg",
        "casio-edifice-eqb-1200d-2aer-solar-bluetooth-3.jpg",
    ],
    [
        "casio-edifice-efs-s620bl-1avuef-solar-chronograph-1.jpg",
        "casio-edifice-efs-s620bl-1avuef-solar-chronograph-2.jpg",
        "casio-edifice-efs-s620bl-1avuef-solar-chronograph-3.jpg",
    ],
    ["casio-g-shock-gst-b100gb-1a9er-wave-ceptor-solar-bluetooth-1.jpg"],
    [
        "casio-g-shock-ga-2000bt-1aer-bhutan-textile-limited-edition-1.jpg",
        "casio-g-shock-ga-2000bt-1aer-bhutan-textile-limited-edition-2.jpg",
    ],
    ["casio-g-shock-gw-9400-1er-rangeman-1.jpg"],
    [
        "seiko-5-sport-srpj47k1-1.jpg",
        "seiko-5-sport-srpj47k1-2.jpg",
        "seiko-5-sport-srpj47k1-3.jpg",
    ],
    ["seiko-presage-srpb41j1-1.jpg", "seiko-presage-srpb41j1-2.jpg"],
    ["orient-sports-ra-aa0814r-1.jpg", "orient-sports-ra-aa0814r-2.jpg"],
    [
        "orient-bambino-fac08002f-1.jpg",
        "orient-bambino-fac08002f-2.jpg",
        "orient-bambino-fac08002f-3.jpg",
    ],
    [
        "orient-bambino-fac08001t-1.jpg",
        "orient-bambino-fac08001t-2.jpg",
        "orient-bambino-fac08001t-3.jpg",
    ],
    [
        "orient-mako-ra-aa0008b-1.jpg",
        "orient-mako-ra-aa0008b-2.jpg",
        "orient-mako-ra-aa0008b-3.jpg",
    ],
    ["citizen-eco-drive-ra-aa0008b-1.jpg", "citizen-eco-drive-ra-aa0008b-2.jpg"],
]

const populateDB = async () => {
    const watches = products.watches
    const nameIds = generateNameIds()
    try {
        await Product.deleteMany({})
        watches.forEach(async (watch, index) => {
            const { model_info } = watch
            await Product.create({
                ...watch,
                image_urls: [...imgUrls[index]],
                nameId: nameIds.get(model_info),
            })
            // console.log(watch)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default populateDB
