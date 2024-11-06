/** @format */

import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  fonts: {
    heading: "'Montserrat', sans-serif", // Font for headings
    body: "'Roboto', sans-serif", // Font for body text
  },
  colors: {
    primary: "#b7791f", // Golden color for primary elements
    background: "#1A202C", // Dark background
    text: "#1A202C", // Light text color for dark mode
  },
  styles: {
    global: {
      "::-moz-selection": {
        backgroundColor: "#b7791f", // Accent color for text selection in Firefox
        color: "white", // Text color for selected text
      },
      "::selection": {
        backgroundColor: "#b7791f", // Accent color for text selection
        color: "white", // Text color for selected text
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "heading",
        fontWeight: "bold",
        color: "gray.600", // Color for headings
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "body",
        color: "text", // Color for body text
      },
    },
    Link: {
      baseStyle: {
        fontFamily: "body",
        color: "primary", // Color for links
        _hover: {
          textDecoration: "none",
          color: "text", // Change to text color on hover
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
    Input: {
      baseStyle: {
        field: {
          borderColor: "primary", // Border color
          _focus: {
            borderColor: "primary", // Border on focus
            boxShadow: "0 0 0 1px #b7791f", // Outline on focus
          },
        },
      },
      defaultProps: {
        focusBorderColor: "primary",
      },
    },
  },
  config: {
    initialColorMode: "light", // Default to light mode
    useSystemColorMode: false, // Do not use the system color mode
  },
});
