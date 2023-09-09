import{ useState } from "react"
import Animations from "./components/Animations";
import Sidebar from "./components/Sidebar";
import {Container,Flex, Box } from "@chakra-ui/react"

const App = () => {
  const [curScene, setCurScene] = useState(1);
  return (<Box bgGradient='linear(to-b,rgba(0,255,200,0.1), rgb(200,255,0,0.2))' >
<Sidebar curScene={curScene}/>
      <Animations  curScene={curScene} setCurScene={setCurScene}/>
  </Box>)
}

export default App