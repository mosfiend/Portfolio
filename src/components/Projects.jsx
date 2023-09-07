import {Flex,Heading,Text,IconButton, Box, Grid, GridItem } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import {HiExternalLink} from "react-icons/hi";
const Projects = () => {
  return (
    <Box>
        <Heading as="h1" fontSize="5xl" m={4}>
        Previous work
        </Heading>

<Box textAlign="left">
        <Heading as="h2" fontSize="4xl" m={4}>
        workout app!
        </Heading>
       <Text> An app I worked on a millenia ago, seems you're still interested?</Text>
</Box>
<Flex justifyContent="flex-end">
<Box>
      <IconButton 
bg="none"
      icon={<FaGithub color="#ccccdd" size={"1.7em"} />}
       />
</Box>
<Box>
      <IconButton 
bg="none"
      icon={<HiExternalLink color="#ccccdd" size={"1.7em"} />}
       />
</Box>
</Flex>
    </Box>
  );
};

export default Projects;
