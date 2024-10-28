
import { Metadata } from "next";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/typography";
import { Hero } from "@/components/Homepage/Hero";

export const metadata: Metadata = {
  title: "AIT Lab",
  description: "AIT Lab",
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
