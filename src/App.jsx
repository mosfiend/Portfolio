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
  return (<Box bgGradient='linear(to-b,rgba(0,255,200,0.1), rgb(200,255,0,0.2))' >
      <Showcase />
  </Box>)
}

export default App