import mongoose from "mongoose"
import products from "../products"
import Product from "../models/productModel"
import generateNameIds from "../nameIds"

const imgUrlsMap: Map<string, number> = new Map([
    ["casio-edifice-eqb-1200d-2aer-solar-bluetooth", 3],
    ["casio-edifice-efs-s620bl-1avuef-solar-chronograph", 3],
    ["casio-g-shock-gst-b100gb-1a9er-wave-ceptor-solar-bluetooth", 1],
    ["casio-g-shock-ga-2000bt-1aer-bhutan-textile-limited-edition", 2],
    ["casio-g-shock-gw-9400-1er-rangeman", 1],
    ["seiko-5-sport-srpj47k1", 3],
    ["seiko-presage-srpb41j1", 2],
    ["orient-sports-ra-aa0814r", 2],
    ["orient-bambino-fac08002f", 3],
    ["orient-bambino-fac08001t", 3],
    ["citizen-eco-drive-ra-aa0008b", 2],
    ["casio-g-shock-gst-b100-1aer-wave-ceptor-solar-bluetooth", 2],
    ["casio-g-shock-ga-2200skl-4aer", 2],
    ["casio-g-shock-gst-b400d-1aer-solar-bluetooth", 3],
    ["casio-edifice-efv-c110d-2avef", 2],
    ["orient-bambino-fac08004d", 2],
    ["orient-sk-ra-aa0b03i", 2],
    ["orient-bambino-fac00007w", 2],
    ["orient-contemporary-ra-ba0006b", 2],
    ["seiko-sport-ssb421p1", 3],
    ["seiko-prospex-sne593p1", 2],
    ["citizen-eco-drive-ca7022-87e", 2],
    ["citizen-super-titanium-ca4570-88l", 2],
])

const populateDB = async () => {
    const watches = products.watches
    const nameIds = generateNameIds()
    try {
        await Product.deleteMany({})
        watches.forEach(async (watch, index) => {
            const { model_info, brand, model } = watch
            let images: string[] = []
            const nameId: string = nameIds.get(model_info)!
            let numOfImages = imgUrlsMap.get(nameId)!
            // Get correct number of images for each product
            for (let i = 1; i <= numOfImages; i++) {
                images.push(`${nameId}-${i}.jpg`)
            }
            const fullName = `${brand} ${model} ${model_info}`.toLocaleLowerCase()
            await Product.create({
                ...watch,
                image_urls: [...images],
                nameId,
                fullName,
            })
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default populateDB
