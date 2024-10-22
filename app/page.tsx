
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Flex, Heading } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "AIT Lab",
  description: "AIT Lab",
};

export default function Home() {
  return (
    <>
      <Flex align={"center"} widows={"100%"} marginTop={5} direction={'column'}>
        <Heading>
          Home Page
        </Heading>
        Page under construction!!
      </Flex>
    </>
  );
}
