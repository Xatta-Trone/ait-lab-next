import { Provider as ChakraProvider } from "@/components/ui/provider"
import Provider from "./providers"
import { Theme } from "@chakra-ui/react"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body style={{ backgroundColor: "white" }}>
        <ChakraProvider>
          <Theme appearance="light" colorPalette={"#2b6cb0"}>
            <Provider>
              {children}
            </Provider>
          </Theme>
        </ChakraProvider>
      </body>
    </html>
  )
}