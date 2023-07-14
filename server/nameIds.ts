import products from "./products"

let nameIds: string[] = [""]

products.watches.forEach((watch) => {
    const { brand, model, model_info } = watch
    const nameId: string = `${brand}-${model}-${model_info}`.split(" ").join("-")
    nameIds.push(nameId.toLowerCase())
})

export default nameIds
