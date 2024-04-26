import { Theme, createTheme } from "@mui/material"

// Define custom MUI Theme.
export const theme: Theme = createTheme({
	direction: "ltr",

	palette: {
		primary: {
			light: "#C5CAE9",
			main: "#3F51B5",
			dark: "#303F9F",
			contrastText: "#fff",
		},

		secondary: {
			light: "#FFECB3",
			main: "#FFC107",
			dark: "#FFA000",
			contrastText: "#212121",
		},

		text: {
			primary: "#212121",
			secondary: "#757575",
		},

		info: {
			light: "#BBDEFB",
			main: "#2196F3",
			dark: "#1976D2",
		},

		warning: {
			light: "#FFECB3",
			main: "#FFC107",
			dark: "#FFA000",
			contrastText: "#212121",
		},

		error: {
			light: "#FFCDD2",
			main: "#F44336",
			dark: "#D32F2F",
			contrastText: "#FFFFFF",
		},
	},

	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {},
			},
		},
	},
})
