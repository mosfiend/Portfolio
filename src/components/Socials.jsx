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
      <IconButton 
                    bg="none"
                    _hover={{
                        bg: 'none',
                        color: useColorModeValue('white', 'black'),
                    }}
                    icon={<FaGithub color="#ccccdd" size={"1.7em"} />}
       />
</Box>
<Box>
      <IconButton 
bg="none"
      icon={<FaLinkedin  color="#ccccdd" size={"1.7em"} />} 
        />
</Box>
<Box>
      <IconButton 
bg="none"
      icon={<FaTwitter  color="#ccccdd" size={"1.7em"} />}
         />
</Box>
<Box>
      <IconButton 
      bg="transparent" 
      icon={<FaEnvelope color="#ccccdd" size={"1.7em"} />}
         />
</Box>

    </Grid>
  );
};

export default Socials;
