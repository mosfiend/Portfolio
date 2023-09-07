import React from "react";
import { Flex, Link, Box, IconButton } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Socials = () => {
  return (
    <Flex>
<Box>
      <IconButton 
bg="none"
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

    </Flex>
  );
};

export default Socials;
