import {Flex,Grid, Button, Box, VStack, Heading } from '@chakra-ui/react'
import ContactForm from './ContactForm.jsx'
import Socials from './Socials.jsx'
export default function Contact() {
  
  return (
      <Flex justifyContent="space-around" borderRadius="lg" p={8} shadow="base">
         <Socials />
        <ContactForm />

      </Flex>
    )
}
