import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    quaternary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    quaternary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    outlinedBlue: true;
    outlinedWhite: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E1D40",
      contrastText: "#EBECF0",
    },
    secondary: {
      main: "#3279FD",
      contrastText: "#B5BBC6",
    },
    tertiary: {
      main: "#D9D9D9",
      contrastText: "#808186",
    },
    text: {
      primary: "#f8f8f8",
      secondary: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            backgroundImage: "linear-gradient(to right, #002559, #0151C1)",
            color: "#fff",
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #0151C1, #002559)",
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            backgroundImage: "linear-gradient(to right, #E9F2FC, #E9F2FC)",
            color: "#0E1D40",
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #c5cdd5, #E9F2FC)",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            border: "2px solid #495c88",
            color: "#495c88",
          },
        },
        {
          props: { variant: "outlinedWhite" },
          style: {
            border: "2px solid #c7cee0",
            color: "#c7cee0",
          },
        },
        {
          props: { variant: "outlinedBlue" },
          style: {
            color: "#fff",
            border: "2px solid #4B93F8",
            "&:hover": {
              backgroundColor: "#4b93f861",
            },
          },
        },
      ],
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 300,
      color: "#0E1D40",
      fontFamily: "Poppins, sans-serif",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
