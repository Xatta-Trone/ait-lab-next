/** @format */

import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  fonts: {
    heading: "'Montserrat', sans-serif", // Font for headings
    body: "'Roboto', sans-serif", // Font for body text
  },
  colors: {
    primary: "#2B6CB0", // Golden color for primary elements
    background: "#1A202C", // Dark background
    text: "#1A202C", // Light text color for dark mode
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "heading",
        fontWeight: "bold",
        color: "gray.600", // Golden color for headings
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "body",
        color: "text", // Light color for body text in dark mode
      },
    },
    Link: {
      baseStyle: {
        fontFamily: "body",
        color: "primary", // Golden color for links
        _hover: {
          textDecoration: "none",
          color: "text", // Change to light color on hover
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "primary",
          color: "white",
          _hover: {
            bg: "primary.500",
            color: "white",
          },
        },
        outline: {
          borderColor: "primary",
          color: "primary",
          _hover: {
            bg: "primary",
            color: "background",
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "outline",
      },
    },
  },
  config: {
    initialColorMode: "light", // Default to dark mode
    useSystemColorMode: false, // Do not use the system color mode
  },
});
