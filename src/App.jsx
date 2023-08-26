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
const converted = {
  background: "rgba( 64, 156, 220, 0.2 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur( 10px )",
  borderRadius: "10px"
}
  return (<Box  >
      <Showcase />
    <About />
    <Projects id="Projects" />
    {/* <Contact /> */}
    {/* <Socials /> */}
  </Box>)
}

export default App