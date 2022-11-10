import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "none",
        },
      },
    },
  },
});
