import { Flex, Heading } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Openings | AIT Lab",
    description: "AIT Lab",
};

const page = () => {
    return (
        <>
            <Flex align={"center"} width={"100%"} marginTop={5} direction={'column'}>
                <Heading>
                    Openings Page
                </Heading>
                Page under construction!!
            </Flex>
        </>
    )
}

export default page