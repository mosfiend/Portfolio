import { Box, Flex, Heading, Link, Container } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="teal.500" color="white" >
      <Container maxWidth="1200">
        <Flex as="nav" align="center" justify="space-between" p="4" height='10vh'>
          <Box>
            <Heading as="h1" fontSize="4xl">Mostefa</Heading>
          </Box>
          <Box>
            <Link mr="4">About</Link>
            <Link mr="4" to="#projects">Projects</Link>
            <Link>Contact</Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
