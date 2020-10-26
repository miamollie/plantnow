import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: '"Playfair", serif',
    },
    h2: {
      fontFamily: '"Playfair", serif',
    },
    h3: {
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: "#668068",
    },
    secondary: {
      main: "#f1e9e7",
    },
    tertiary: {
      main: "#eaf0e9",
    },
    background: {
      default: "#fff",
    },
  },
});

export default responsiveFontSizes(theme);

//  "Playfair"

// H1h2 playfair
// h3 poppins bold
