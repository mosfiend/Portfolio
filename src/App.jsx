import React, { useState } from "react"
// import useWindowSize from "./outils/useWindowSize"
import Nav from "./components/Nav"
import Showcase from "./components/Showcase";
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Socials from "./components/Socials"
import {Container,Flex, Box } from "@chakra-ui/react"

const App = () => {
  return (<Box bg="#2E3037" >
      <Showcase />
    <About />
    <Projects id="Projects" />
    {/* <Contact /> */}
    {/* <Socials /> */}
  </Box>)
}

export default App