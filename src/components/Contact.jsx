import ContactForm from './ContactForm.jsx'
import { Heading } from '@chakra-ui/react'
export default function Contact() {
  
  return (
  <>
      <Heading as="h3" fontSize="l" mb={4}>
        Contact
      </Heading>
        <ContactForm />
  </>
    )
}