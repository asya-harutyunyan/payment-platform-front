import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    quaternary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    quaternary?: PaletteOptions["primary"];
    error?: PaletteOptions["error"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    outlinedBlue: true;
    outlinedWhite: true;
    error: true;
    error_background: true;
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
          props: { variant: "error" },
          style: {
            border: "2px solid  #b72d2d",
            color: "#b72d2d",
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #aa5b5b, #f8f0f0)",
            },
          },
        },
        {
          props: { variant: "error_background" },
          style: {
            // border: "2px solid  #b72d2d",
            backgroundImage: "linear-gradient(to right, #b72d2d17, #927d7d52)",
            color: "#b72d2d",
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, #b72d2d4a, #927d7d71)",
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
      fontStyle: "medium",
      lineHeight: "100%",
      letterSpacing: "0%",
      color: "#D3D3D3",
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
      fontWeight: "300",
      padding: "10px 0",
      color: "#EBECF0",
      fontFamily: "Poppins, sans-serif",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "400",
      padding: "10px 0",
      color: "#fff",
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
