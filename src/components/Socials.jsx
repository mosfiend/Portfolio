import React from "react";
import { Link, Box, IconButton } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Socials = () => {
  return (
    <>
      <IconButton 
      icon={<FaGithub color="white" size={"1.7em"} />}
       />
      <IconButton 
      icon={<FaLinkedin color="white" size={"1.7em"} />} 
        />
      <IconButton 
      icon={<FaTwitter color="white" size={"1.7em"} />}
         />
      <IconButton 
      icon={<FaEnvelope color="white" size={"1.7em"} />}
         />

    </>
  );
};

export default Socials;
