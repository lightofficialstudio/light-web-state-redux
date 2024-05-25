"use client";
import { createTheme } from "@mui/material/styles";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

const theme = createTheme({
  typography: {
    fontFamily: notoSansThai.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default theme;
