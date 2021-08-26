import { createTheme } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f51174",
    },
  },

  typography: {
    fontFamily: ["Arial"].join(","),
  },
})
export default theme
