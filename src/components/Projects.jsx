import { useState } from "react";
import {Image, Flex,Heading, Link, Text, IconButton, Box, Grid, GridItem } from "@chakra-ui/react";
import { FaGithub, FaCodepen } from "react-icons/fa";
import {HiExternalLink} from "react-icons/hi";
import projectData from "../assets/data/ProjectData.json"
import { AnimatePresence,motion } from 'framer-motion'
const Projects = ({project}) => {
    const [icons, setIcons] = useState({
react:false,
pixi:false,
html5:false,
css3: false
    })
    const allIcons= ["react","pixi","html5","css3"]
    const projects = projectData.projects
    //             {
    //                 console.log(skill)
    //   {/* </AnimatePresence> */}
    return (
        <>
            <Heading as="h1" fontSize="6xl" textAlign="center" m={4}>
                Previous work
            </Heading>

{
project === -1?
                <Text fontSize="xl" m={4}>
                        A list of projects I have jstarted in the past that either I haven't continued
                </Text>
                    :
        <>
<Box textAlign="left">
                <Heading as="h2" fontSize="4xl" m={4}>
                    {projects[project].name}
                </Heading>
                <Text fontSize="xl" m={4}>
                    {projects[project].description}
                </Text>
            </Box>
            <Flex justifyContent="flex-start">
     <AnimatePresence>
                {
                    projects[project].stack.map((skill,idx)=> {
                  return <Box
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key={idx}
                    >
                        <Image
                            alt={`${skill}`}
                            width="50"
                            height={50}
                            src={`/images/${skill}.png`}
                        />
                    </Box>
                })
            }
     </AnimatePresence>
            </Flex>
            <Flex justifyContent="flex-end">
                <Box>
                    <Link
                        href={projects[project].github || projects[project].codepen }
                        target="_blank"
                        rel="noreferrer noopener"

                        _hover={{bg:"none",stroke:"red"}}
                    >
                        <IconButton
                            bg="none"
                            icon={projects[project].github?<FaGithub color="#ccccdd" size={"1.7em"} />:
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
            }
        </>
    );
};

export default Projects;
