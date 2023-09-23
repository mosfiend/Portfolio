import React from "react";
import { useColorModeValue, Grid, Link, Box, IconButton } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Socials = () => {
  return (
    <Grid justifyContent="center" alignItems="spaceAround">
<Box>
                    <Link
                        href={"https://github.com/mosfiend"}
                        target="_blank"
                        rel="noreferrer noopener"
                        _hover={{bg:"none",stroke:"red"}}
                    >
      <IconButton 
                    bg="none"
                            _hover={{bg:"none",stroke:"red"}}
                    icon={<FaGithub color="#ccccdd" size={"1.7em"} />}
                />

                    </Link>
            </Box>
            <Box>
                    <Link>
                <IconButton 
                    bg="none"
                    _hover={{bg:"none",stroke:"red"}}
                    icon={<FaLinkedin  color="#ccccdd" size={"1.7em"} />} 
                />
                    </Link>
            </Box>
            <Box>
                    <Link
                        href={"https://twitter.com/mosfiend"}
                        target="_blank"
                        rel="noreferrer noopener"
                        >
                <IconButton  
                    bg="none"
                    _hover={{bg:"none",stroke:"red"}}
                    icon={<FaTwitter  color="#ccccdd" size={"1.7em"} />}
                />
                    </Link>
            </Box>
            <Box>
                    <Link>
                <IconButton 
                    bg="transparent" 
                    _hover={{bg:"none",stroke:"red"}}
      icon={<FaEnvelope color="#ccccdd" size={"1.7em"} />}
         />
                    </Link>
</Box>

    </Grid>
  );
};

export default Socials;
