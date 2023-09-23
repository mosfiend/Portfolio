import {Flex,Grid, Button, Box, VStack, Heading } from '@chakra-ui/react'
import ContactForm from './ContactForm.jsx'
import Socials from './Socials.jsx'
export default function Contact() {
  
  return (
            <Box>
            <Heading as="h1" fontSize="6xl" textAlign="center" m={4}>
                Get in Touch
            </Heading>
      <Flex justifyContent="space-around" borderRadius="lg" p={8} shadow="base">
         <Socials />
        <ContactForm />

      </Flex>
            </Box>
    )
}
