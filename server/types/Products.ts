export type Watch = {
	article_number: number
	brand: string
	model: string
	model_info: string
	price: number
	case_diameter: number
	band_material: string
	case_material: string[]
	dial_color: string
	mechanism: string
	reviews: string[] // change to review type
}

export type Products = { watches: Watch[] }
