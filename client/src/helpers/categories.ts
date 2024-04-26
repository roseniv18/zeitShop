import { Filters } from "../types/ProductTypes/Filters"

export const categories: Filters = {
	brand: ["casio", "orient", "seiko", "citizen"],
	dial_color: ["black", "white", "blue", "green", "brown"],
	case_material: [
		"stainless_steel",
		"resin",
		"gold",
		"gold coating",
		"polymer",
	],
	band_material: [
		"stainless_steel",
		"resin",
		"leather",
		"polymer",
		"textile",
	],
	mechanism: ["analog", "digital"],
	price: [0, 1000],
}
