import { Text, Button, Box, Flex, Center, Heading } from "@chakra-ui/react";
import Socials from "./Socials.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";

const Sidebar = ({curScene}) => {
  return (
      <Box
        position="absolute"
        top="10vh"
        left="3vw"
        bg="#39c0ba44"
        width="30vw"
        backdropFilter="auto"
        backdropBlur="7px"
        borderRadius="6px"
      >
        <Heading textAlign="center" as="h1" fontSize="5xl" m={4}>
          {curScene === 0 ? (
            <>Who am I</>
          ) : curScene === 2 ? (
            <>Get in touch</>
          ) : undefined}
        </Heading>
        {curScene === 0 ? (
          <About curScene={curScene} />
        ) : curScene === 2 ? (
          <Contact />
        ) : (
          <Projects />
        )}
      </Box>
  )
}

export default Sidebar
