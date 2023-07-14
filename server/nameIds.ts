import Product from "./models/productModel"
import products from "./products"

let nameIds: Map<string, string> = new Map([["", ""]])

const generateNameIds = () => {
    products.watches.forEach((watch) => {
        const { brand, model, model_info } = watch
        const nameId: string = `${brand}-${model}-${model_info}`.split(" ").join("-")
        nameIds.set(model_info, nameId.toLocaleLowerCase())
    })

    // console.log(nameIds)
    return nameIds
}

export default generateNameIds
