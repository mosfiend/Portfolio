import { useEffect } from 'react';
import Socials from './Socials.jsx';
import { Manager } from '../PixiAnimations/manager.js'
import { Text, Button, Box, Flex, Center, Heading } from '@chakra-ui/react';
import { extendTheme, defineStyleConfig } from '@chakra-ui/react'
const Showcase = (props) => {
    let runOnce = false
    useEffect(() => {
        if (!runOnce) {
            Manager.initialize(document.getElementById("pixi-canvas"), 0x2E3037, document.getElementById("container"));
            Manager.vp();
            Manager.initializeLoader()
            runOnce = true
        }
    }, [])
    return (
        <Box id="container" >
            <Box position="absolute" top="30vh" left="3vw" bg="#39C0BA33" backdropFilter='auto' backdropBlur='4px' borderRadius="8px"
            >
                <Heading color="white" as="h1" fontSize="4xl" m={4}>
                    Abdellaoui Mostefa
                </Heading>
                <Text color="white" fontSize="xl" m="4">a great deal of things,foremost of all, an amazing father</Text>
                <Center m={4}><Button>Hire  me jee</Button> <Socials /> </Center>
            </Box>
            <Box w="100%" h="100vh" ><canvas id="pixi-canvas" /></Box>

        </Box >
    )
}

export default Showcase