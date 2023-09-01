import { useEffect } from "react";
import Socials from "./Socials.jsx";
import { Manager } from "../PixiAnimations/manager.js";
import { Text, Button, Box, Flex, Center, Heading } from "@chakra-ui/react";
import { extendTheme, defineStyleConfig } from "@chakra-ui/react";
const Showcase = (props) => {
  let runOnce = false;
  useEffect(() => {
    if (!runOnce) {
      Manager.initialize(
        document.getElementById("pixi-canvas"),
        0x2e3037,
        document.getElementById("container")
      );
      Manager.vp();
      Manager.initializeLoader();
      runOnce = true;
    }
  }, []);
  return (
    <Box id="container">
      <Box
        position="absolute"
        top="10vh"
        left="3vw"
        bg="#39C0BA20"
        backdropFilter="auto"
        backdropBlur="7px"
        borderRadius="6px"
      >
        <Heading color="white" as="h1" fontSize="5xl" m={4}>
          Abdellaoui Mostefa
        </Heading>
        <Text color="white" fontSize="2xl" m="4">
          a great deal of things,foremost of all, an amazing father
        </Text>
        <Center m={4}>
          <Button>Hire me jee</Button> <Socials />{" "}
        </Center>
      </Box>
      <Box w="100%" h="100vh">
        <canvas id="pixi-canvas" />
      </Box>
    </Box>
  );
};

export default Showcase;
