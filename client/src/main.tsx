import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"

const theme = createTheme({
    direction: "ltr",

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {},
            },
        },
    },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)
