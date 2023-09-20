import {Flex,Heading, Link, Text, IconButton, Box, Grid, GridItem } from "@chakra-ui/react";
import { FaGithub, FaCodepen } from "react-icons/fa";
import {HiExternalLink} from "react-icons/hi";
import projectData from "../outils/ProjectData.json"
const Projects = () => {
  return (
    <>
        <Heading as="h1" fontSize="5xl" textAlign="center" m={4}>
        Previous work
        </Heading>

<Box textAlign="left">
        <Heading as="h2" fontSize="4xl" m={4}>
{projectData.projects[0].name}
        </Heading>
       <Text m={4}>
       </Text>
</Box>
<Flex position="absolute"bottom="4" right= "4" justifyContent="flex-end">
<Box>
                <Link
                        href={projectData.projects[0].github}
target="_blank"
rel="noreferrer noopener"

_hover={{bg:"none",stroke:"red"}}
                    >
      <IconButton
bg="none"
      icon={projectData.projects[1].github?<FaGithub color="#ccccdd" size={"1.7em"} />:
<FaCodepen color="#ccccdd" size={"1.7em"}
_hover={{bg:"none",stroke:"red"}}

                                />
                            }
_hover={{bg:"none",stroke:"red"}}
       />
                </Link>
</Box>
<Box>
      <IconButton
bg="none"
      icon={<HiExternalLink color="#ccccdd" size={"1.7em"} />}
       />
</Box>
</Flex>
    </>
  );
};

export default Projects;
