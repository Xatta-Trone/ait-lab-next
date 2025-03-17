/** @format */

import { extendTheme } from "@chakra-ui/react";

// Extending the Chakra UI theme with custom styles and components
export default extendTheme({
  // Custom fonts for the application
  fonts: {
    heading: "'Montserrat', sans-serif", // Font for headings
    body: "'Roboto', sans-serif", // Font for body text
  },

  // Custom colors for branding and consistency
  colors: {
    primary: "#b7791f", // Golden color for primary elements
    background: "gray.700", // Dark background color
    text: "#1A202C", // Text color (used primarily for dark mode styling)
  },

  // Global styles applied throughout the app
  styles: {
    global: {
      // Custom styling for text selection
      "::-moz-selection": {
        backgroundColor: "#b7791f", // Highlight color for selected text (Firefox)
        color: "white", // Text color for selection
      },
      "::selection": {
        backgroundColor: "#b7791f", // Highlight color for selected text
        color: "white", // Text color for selection
      },
    },
  },

  // Customizing Chakra UI components
  components: {
    Heading: {
      // Base styles for all heading components
      baseStyle: {
        fontFamily: "heading", // Use the custom heading font
        fontWeight: "bold",
        color: "gray.600", // Default heading color
      },
    },
    Text: {
      // Base styles for all text components
      baseStyle: {
        fontFamily: "body", // Use the custom body font
        color: "text", // Default text color
      },
    },
    Link: {
      // Base styles for all link components
      baseStyle: {
        fontFamily: "body",
        color: "primary", // Use the primary color for links
        _hover: {
          textDecoration: "none", // Remove underline on hover
          color: "text", // Change link color on hover
        },
      },
    },
    Button: {
      // Base styles and variants for button components
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md", // Medium border radius for buttons
      },
      variants: {
        solid: {
          bg: "primary", // Solid button background color
          color: "white", // Text color for solid buttons
          _hover: {
            bg: "primary.500", // Darker primary color on hover
            color: "white",
          },
        },
        outline: {
          borderColor: "primary", // Outline color
          color: "primary", // Text color for outline variant
          _hover: {
            bg: "primary", // Primary background on hover
            color: "background", // Background color for text on hover
          },
        },
      },
      defaultProps: {
        size: "md", // Default size for buttons
        variant: "outline", // Default variant for buttons
      },
    },
    Input: {
      // Base styles for input fields
      baseStyle: {
        field: {
          borderColor: "primary", // Border color for input fields
          _focus: {
            borderColor: "primary", // Border color when focused
            boxShadow: "0 0 0 1px #b7791f", // Subtle outline effect on focus
          },
        },
      },
      defaultProps: {
        focusBorderColor: "primary", // Default focus border color
      },
    },
  },

  // Configuration for color mode behavior
  config: {
    initialColorMode: "light", // Default application color mode
    useSystemColorMode: false, // Ignore the system's color mode preference
  },
});
