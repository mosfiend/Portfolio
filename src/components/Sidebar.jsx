import { Text, Button, Box, Flex, Center, Heading } from "@chakra-ui/react";
import Socials from "./Socials.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
import { keyframes} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Sidebar = ({curScene}) => {
    let bg = curScene===0?"rgba(200,255,0,0.4)":curScene===1?"rgba(255,0,30,0.4)":"rgba(0,0,0,1)"
    return (
        <Box
            position="absolute"
            top="10vh"
            left="3vw"
            bg="#39c0ba44"
            width="30vw"
            height="65vh"
            backdropFilter="auto"
            backdropBlur="9px"
            borderRadius="6px"
            boxShadow={`3px 4px 12px 0px ${bg}`}
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
