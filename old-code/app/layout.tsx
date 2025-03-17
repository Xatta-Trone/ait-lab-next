"use client"; // Enables client-side rendering for this component

import { ChakraProvider, Container, Grid, GridItem } from "@chakra-ui/react";
import theme from "./theme"; // Import custom Chakra UI theme
import { ColorModeScript } from "@chakra-ui/react"; // Handles color mode scripts for SSR
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop"; // Button to scroll back to top
import "./index.css"; // Global CSS

// Root layout component for the entire application
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props; // Destructure children for rendering nested components

  return (
    <html suppressHydrationWarning>
      <head>
        {/* Import Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="AIT_Favicon.png" type="image/x-icon" />
      </head>
      <body style={{ overflowX: "hidden" }} >
        {/* Add ColorModeScript for proper color mode hydration during SSR */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        {/* ChakraProvider wraps the app with the custom theme */}
        <ChakraProvider theme={theme}>
          {/* Grid layout for structuring Navbar, main content, and Footer */}
          <Grid templateRows="auto 1fr auto" minH="100vh" maxWidth={"100vw"}>
            {/* Navbar displayed at the top */}
            <GridItem as="header" w="100%">
              <Navbar />
            </GridItem>
            {/* Main content area with a padding at the top to account for Navbar */}
            <GridItem as="main" w="100%" pt={"80px"}>
              {children}
            </GridItem>

            {/* Footer displayed at the bottom */}
            <GridItem as="footer" w="100%" color="white">
              <Footer />
            </GridItem>

            {/* Scroll-to-top button for convenience */}
            <ScrollToTop />
          </Grid>
        </ChakraProvider>
      </body>
    </html>
  );
}
