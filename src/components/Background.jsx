import{ useState } from "react" 
import {Container,Flex, Box } from "@chakra-ui/react"
import { keyframes,Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Background = ({bg1,bg2,bg3}) => {
    function anim(bg){
console.log(bg,(bg+1)%2)
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
            bgGradient='linear(to-b,rgba(0,255,200,0.1), rgb(200,255,0,0.3))'
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
            bgGradient="linear(to-b,rgba(0,255,255,0.6),rgba(200,255,0,0.3))"
            zIndex="-1"
            animation={anim(bg2)}
        >
        </Box>
        <Box
            as={motion.div}
            position="absolute"
            w="100vw" h="100vh"
            bgGradient="linear(to-b,rgba(0,255,200,0.8), rgb(200,255,0,0.2))"
            zIndex="-1"
            animation={anim(bg3)}
        >
        </Box>
</motion.div>
</>
  );
};

export default Background;
