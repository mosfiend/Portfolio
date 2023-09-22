import{ useState } from "react" 
import Animations from "./components/Animations";
import Sidebar from "./components/Sidebar";
import Background from "./components/Background";
import {Container,Flex, Box } from "@chakra-ui/react"
import { keyframes,Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { motion } from 'framer-motion'
const App = () => {
    const [curScene, setCurScene] = useState(0);
    const [project,setProject] =useState(-1)
    const [bg1,setBg1] = useState(1)
    const [bg2,setBg2] = useState(0)
    const [bg3,setBg3] = useState(0)
    return (<Box>

        <Background bg1={bg1} bg2={bg2} bg3={bg3}/>
        <Animations bg1={bg1} bg2={bg2} bg3={bg3} setBg1={setBg1} setBg2={setBg2} setBg3={setBg3} curScene={curScene} setCurScene={setCurScene} setProject={setProject}/>
        <Sidebar curScene={curScene} project={project}/>

    </Box>)
}

export default App
