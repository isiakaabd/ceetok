import { createTheme } from "@mui/material/styles";

const lightGrey = "#5F5C5C";
const darkGreen = "#044402";
const green = "#37D42A";

export const muiTheme = createTheme({
  palette: {
    common: {
      lightGrey,
    },
    primary: {
      main: darkGreen,
    },
    // secondary: {
    //   main: grey,
    // },
    // error: {
    //   main: red,
    // },

    secondary: {
      main: lightGrey,
    },
    info: {
      main: lightGrey,
    },
    success: {
      main: green,
    },
    // warning: {
    //   main: gold,
    // },
    // disabled: {
    //   main: disable,
    // },
  },
  typography: {
    fontFamily: ["Raleway", "sans-serif", "Roboto"].join(", "),
    fontSize: 10,
    htmlFontSize: 10,
    h1: {
      fontSize: "clamp(2.5rem, 8vw, 5rem)",
      fontWeight: 700,
      color: "#fff",
      // lineHeight: "3rem",
    },
    h2: {
      fontSize: "clamp(1.8rem, 8vw, 2.7rem)",
      fontWeight: 700,
    },
    h3: {
      fontSize: "clamp(1.8rem, 8vw,2.25rem)",
      fontWeight: 500,
    },
    h4: {
      fontSize: "clamp(1.4rem,8vw,2rem)",
      fontWeight: 500,
    },
    h5: {
      fontSize: "clamp(1.3rem,2vw,1.5rem)",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1.4rem",
      fontWeight: 500,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "clamp(1.2rem,2vw, 1.4rem)",
      fontWeight: 500,
      lineHeight: 1.85,
    },
    body3: {
      fontSize: "clamp(1.2rem,2vw, 1.3rem)",
      fontWeight: 600,
      lineHeight: 0.7,
    },
    btn: {
      fontSize: "1.5rem",
      textTransform: "none",
      height: "5rem",
      borderRadius: 10,
      boxShadow: "0px 0px 4px -1px rgba(71,64,71,0.63)",
    },

    cardGridWrapper: {
      height: "100%",
      padding: "5rem 3rem",
      "@media(max-width:600px)": {
        padding: "3rem 2rem",
      },
      borderRadius: 20,
      boxShadow: "-1px 11px 30px 0px #e0e0e03b",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,.5),0px 8px 10px 1px rgba(0,0,0,0.01),0px 3px 14px 2px rgba(0,0,0,0.01)",
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: "2rem",
          fontWeight: 500,
          "& .MuiAvatar-img": {
            objectFit: "contain",
          },
          // backgroundColor: "#FF9B04",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        backgroundColor: "#FF9B04",
        color: "#fff",
        fontSize: { md: "1.5rem", xs: "1rem" },
      },
    },
  },
});
