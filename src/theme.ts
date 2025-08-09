"use client";

import { createTheme } from "@mui/material";
import { thTH } from "@mui/material/locale";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    secondary: {
      main: "#6c757d"
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "black",
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
          "&.Mui-selected": {
            backgroundColor: "#2092ec",
            color: "#fff",
            ".MuiListItemIcon-root": {
              color: "#fff"
            },
            "&:hover": {
              backgroundColor: "#2092ec",
              color: "#fff",
            },
            "&:hover .MuiListItemIcon-root": {
              color: "#fff"
            }
          },
          "&:hover": {
            backgroundColor: "#2092ec",
            color: "#fff",
          },
          "&:hover .MuiListItemIcon-root": {
            color: "#fff"
          }
        },

      }
    },
  }
}, thTH);

export default theme;
