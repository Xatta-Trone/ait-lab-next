import { Flex, Heading } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Publication | AIT Lab",
    description: "AIT Lab",
};

const page = () => {
    return (
        <>
            <Flex align={"center"} widows={"100%"} marginTop={5} direction={'column'}>
                <Heading>
                    Publication Page
                </Heading>
                Page under construction!!
            </Flex>
        </>
    )
}

export default page