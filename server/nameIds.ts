import products from "./products"

// nameId will be a string containing brand, model, model_info.
let nameIds: Map<string, string> = new Map([["", ""]])

type fnType = () => Map<string, string>

const generateNameIds: fnType = () => {
	products.watches.forEach((watch) => {
		const { brand, model, model_info } = watch
		const nameId: string = `${brand}-${model}-${model_info}`
			.split(" ")
			.join("-")
		nameIds.set(model_info, nameId.toLocaleLowerCase())
	})

	return nameIds
}

export default generateNameIds
