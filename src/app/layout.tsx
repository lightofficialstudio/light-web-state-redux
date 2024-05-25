import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import {
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./globals.css";
// provider
import { StoreProvider } from "./store/storeProvider";
import theme from "@/components/theme/theme";
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export const metadata: Metadata = {
  title: "Redux Practice",
  description: "Created with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light-mode ">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={notoSansThai.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                ฝึกฝนการใช้งาน Redux Toolkit
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Box mt={4} mb={15}>
              <StoreProvider>{children}</StoreProvider>
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
