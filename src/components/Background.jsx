import{ useState } from "react" 
import {Container,Flex, Box } from "@chakra-ui/react"
import { keyframes,Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Background = ({bg1,bg2,bg3}) => {
    function anim(bg){
        const frames = keyframes`
0% {
opacity:${(bg+1)%2};
}
100% {
opacity:${bg};
}
`
        return `${frames} 1s ease-out 1 alternate forwards`;
    }
  return (
<>
        <Box 
            as={motion.div}
            position="absolute"
            w="100vw" h="100vh"
            bgGradient="linear(to-b,rgba(0,150,255,0.2),rgba(0,150,255,0.4),rgba(0,100,255,0.7), rgba(200,255,20,0.7))"
            zIndex="-1"
            animation={anim(bg1)}
        >
        </Box>
<motion.div 
               style={{pointerEvents:"none",
            position:"absolute"}}
            initial={{ opacity: 0 }}
                animate={{opacity:1}}
                transition={{delay:2}}
            >
        <Box
            as={motion.div}
            position="absolute"
            w="100vw" h="100vh"
            bgGradient="linear(to-b,rgba(0,150,255,0.2),rgba(0,150,255,0.4),rgba(0,100,255,0.7), rgba(255,0,30,0.6))"
            zIndex="-1"
            animation={anim(bg2)}
        >
        </Box>
        <Box
            as={motion.div}
            position="absolute"
            w="100vw" h="100vh"
            bgGradient="linear(to-b,rgba(0,150,255,0.2),rgba(0,150,255,0.4),rgba(0,100,255,0.7), rgba(30,30,30,0.8))"
            zIndex="-1"
            animation={anim(bg3)}
        >
        </Box>
</motion.div>
</>
  );
};

export default Background;
