import React from 'react'
import {Link, Box, IconButton } from '@chakra-ui/react'
import { FaTwitter } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { FaEnvelope } from "react-icons/fa"

const Socials = () => {
    return (
        <>
            <Link target="_blank"  href="https://github.com/mosfiend">   <FaGithub color="white" size={"1.7em"} />
            </Link>
            <Link  target="_blank"  href="">
                <FaLinkedin color="white" size={"1.7em"} /> 
            </Link>

            <Link target="_blank"  href="https://twitter.com/mosfiend">
                <FaTwitter color="white" size={"1.7em"} />
            </Link> 
            <Link> <FaEnvelope color="white" size={"1.7em"} />
            </Link>
        </>
    )
}

export default Socials