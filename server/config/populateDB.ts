import products from "../products"
import Product from "../models/productModel"
import generateNameIds from "../nameIds"
import { baseAsyncFn } from "../types/Functions"
import { Watch } from "../types/Products"

/* 
	We need to know how many images each product we will have,
	so that we can generate the img url dynamically using nameId.
	nameId is returned from generateNameIds().
*/

// Key is nameId, value is number of images.
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

const populateDB: baseAsyncFn = async () => {
	console.log("POPULATING DATABASE...")
	// We are getting the watches array and nameIds (for dynamic img url generation)
	const watches: Watch[] = products.watches
	const nameIds = generateNameIds()
	try {
		// First, make sure database is empty by deleting everything inside.
		await Product.deleteMany({})
		// Loop through each watch object, creating a database entry.
		watches.forEach(async (watch) => {
			const { model_info, brand, model } = watch

			let images: string[] = []
			const nameId: string = nameIds.get(model_info)!
			let numOfImages: number = imgUrlsMap.get(nameId)!

			// Get correct number of images for each product
			for (let i = 1; i <= numOfImages; i++) {
				images.push(`${nameId}-${i}.jpg`)
			}
			const fullName: string =
				`${brand} ${model} ${model_info}`.toLocaleLowerCase()
			await Product.create({
				...watch,
				image_urls: [...images],
				nameId,
				fullName,
			})
		})
		console.log("POPULATING DATABASE COMPLETE!")
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

export default populateDB
