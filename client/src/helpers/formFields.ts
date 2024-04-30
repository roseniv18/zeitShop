type FormField = {
	fieldName: string
	id: string
	label: string
}

export const formFields: FormField[] = [
	{
		fieldName: "fullName",
		label: "Full Name",
		id: "full-name",
	},
	{
		fieldName: "streetAddress",
		label: "Street Address",
		id: "street-address",
	},
	{
		fieldName: "country",
		label: "Country",
		id: "country",
	},
	{
		fieldName: "city",
		label: "City",
		id: "city",
	},
	{
		fieldName: "postalCode",
		label: "Postal Code",
		id: "postal-code",
	},
]
