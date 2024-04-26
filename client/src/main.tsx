import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ThemeProvider } from "@emotion/react"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { theme } from "./helpers/muiTheme.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>
)
