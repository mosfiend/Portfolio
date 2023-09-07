import {Button, Box, VStack, Heading } from '@chakra-ui/react'
import ContactForm from './ContactForm.jsx'
import Socials from './Socials.jsx'
export default function Contact() {
  
  return (
      <Box borderRadius="lg" p={8} shadow="base">
        <VStack spacing={5}>
        <ContactForm />
         <Socials />
        </VStack>

      </Box>
    )
}