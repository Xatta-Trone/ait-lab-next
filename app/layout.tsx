"use client";

import { ChakraProvider, Container, Grid, GridItem } from "@chakra-ui/react"; // Correct import
import theme from "./theme"; // Import the custom theme
import { ColorModeScript } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./index.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: "white" }}>
        {/* Ensure ColorModeScript is included for proper SSR hydration */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Grid templateRows="auto 1fr auto" minH="100vh">
            {/* Navbar (Full Width) */}
            <GridItem as="header" w="100%">
              <Navbar />
            </GridItem>

            {/* Main Content (Limited to container.xl) */}
            <GridItem as="main" w="100%">
              <Container maxW="container.xl" py={8}>
                {children}
              </Container>
            </GridItem>

            {/* Footer (Full Width) */}
            <GridItem as="footer" w="100%" color="white">
              <Footer />
            </GridItem>
            <ScrollToTop />
          </Grid>
        </ChakraProvider>
      </body>
    </html>
  );
}
