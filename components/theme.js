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
      fontFamily: '"Playfair Display", serif',
      fontWeight: "100",
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: "2rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "1rem",
    },
    h5: {
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  palette: {
    primary: {
      main: "#668068",
      contrast: "#fff",
    },
    secondary: {
      main: "#f1e9e7",
      contrast: "#444",
    },
    tertiary: {
      main: "#eaf0e9",
      contrast: "#e8d2c7",
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiIconButton: {
      root: {
        color: "white",
        backgroundColor: "#668068",
        "&:hover": {
          backgroundColor: "#e8d2c7",
        },
      },
    },
    MuiButton: {
      root: {
        color: "white",
        backgroundColor: "#668068",
        "&:hover": {
          backgroundColor: "#e8d2c7",
        },
        fontWeight: "bold",
      },
    },
  },
});

export default responsiveFontSizes(theme);
