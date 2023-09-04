import { useState, useEffect } from "react";
import Socials from "./Socials.jsx";
import { Manager } from "../PixiAnimations/manager.js";
import { Text, Button, Box, Flex, Center, Heading } from "@chakra-ui/react";
import Contact from "./Contact.jsx";
import About from "./About.jsx";
const Showcase = (props) => {
  let runOnce = false;
  const [curScene, setCurScene] = useState(1);
  const changeScene = (cur) => {
    setCurScene(cur);
  };

  useEffect(() => {
    if (!runOnce) {
      Manager.initialize(
        document.getElementById("pixi-canvas"),
        0x2e3037,
        document.getElementById("container"),
        changeScene
      );
      Manager.vp();
      Manager.initializeLoader();
      runOnce = true;
    }
  }, []);
  return (
    <Box id="container">
      <Box
        textAlign="center"
        position="absolute"
        top="10vh"
        left="3vw"
        bg="#69696969"
        width="30vw"
        backdropFilter="auto"
        backdropBlur="7px"
        borderRadius="6px"
      >
        <Heading as="h1" fontSize="5xl" m={4}>
          {curScene === 1 ? <>Who am I</> : <>Get in touch</>}
        </Heading>
        {curScene === 1 ? <About curScene={curScene} /> : <Contact />}
      </Box>
      <Box w="100%" h="100vh">
        <canvas id="pixi-canvas" />
      </Box>
    </Box>
  );
};

export default Showcase;
