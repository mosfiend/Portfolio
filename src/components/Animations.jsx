import { useState, useEffect } from "react";
import { Manager } from "../Animations/manager.js";
import { Text, Button, Box, Flex, Center, Heading } from "@chakra-ui/react";
import Socials from "./Socials.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
const Animations = ({bg1,bg2,bg3,setBg1, setBg2, setBg3, setCurScene,setBgAlpha}) => {
    const setBgs = [setBg1,setBg2,setBg3]
    const bgs = [bg1,bg2,bg3]
    let runOnce = false;
    const handleState = (cur) => {
        setCurScene(cur);
    };

    const handleBgState = (cur,alpha) => {
        setBgs[cur](alpha)
    };
    useEffect(() => {
        if (!runOnce) {
            Manager.initialize(
                document.getElementById("pixi-canvas"),
                0x2e3037,
                document.getElementById("container"),
                handleState,
                handleBgState
            );
            Manager.vp();
            Manager.initializeLoader();
            runOnce = true;
        }
    }, []);
    return (
        <Box id="container" w="100vw" h="100vh">
            <canvas id="pixi-canvas" />
        </Box>
    );
};

export default Animations;
