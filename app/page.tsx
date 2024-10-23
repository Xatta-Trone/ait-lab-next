
import { Metadata } from "next";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/typography";

export const metadata: Metadata = {
  title: "AIT Lab",
  description: "AIT Lab",
};

export default function Home() {
  return (
    <>
      <Flex align={"center"} width={"100%"} marginTop={5} direction={'column'}>
        <Heading>
          Home Page
        </Heading>
        Page under construction!!
      </Flex>
    </>
  );
}
