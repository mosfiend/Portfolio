import { useState, useEffect } from "react";
import Socials from "./Socials.jsx";
import { Manager } from "../Animations/manager.js";
import { Text, Button, Box, Flex, Center, Heading } from "@chakra-ui/react";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
const Showcase = (props) => {
  let runOnce = false;
  const [curScene, setCurScene] = useState(1);
  const handleState = (cur) => {
    setCurScene(cur);
  };

  useEffect(() => {
    if (!runOnce) {
      Manager.initialize(
        document.getElementById("pixi-canvas"),
        0x2e3037,
        document.getElementById("container"),
        handleState
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
        bg="#39c0ba44"
        width="30vw"
        backdropFilter="auto"
        backdropBlur="7px"
        borderRadius="6px"
      >
        <Heading textAlign="center" as="h1" fontSize="5xl" m={4}>
          {curScene === 1 ? (
            <>Who am I</>
          ) : curScene === 2 ? (
            <>Get in touch</>
          ) : undefined}
        </Heading>
        {curScene === 1 ? (
          <About curScene={curScene} />
        ) : curScene === 2 ? (
          <Contact />
        ) : (
          <Projects />
        )}
      </Box>
      <Box w="100%" h="100vh">
        <canvas id="pixi-canvas" />
      </Box>
    </Box>
  );
};

export default Showcase;
