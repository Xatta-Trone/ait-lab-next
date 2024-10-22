import { Provider as ChakraProvider } from "@/components/ui/provider"
import Provider from "./providers"
import { Theme } from "@chakra-ui/react"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <ChakraProvider>
          <Provider>
            <Theme appearance="dark" colorPalette={"blue"}>
              {children}
            </Theme>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  )
}