import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Stack,
    Textarea,
    useClipboard,
    VStack,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

export default function ContactForm() {

    const encode = (data)=> Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const handleSubmit = e => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", name:name, email:email, message:message })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));

      e.preventDefault();
    };

    const handleChange = e => {
  e.target.name==="name"?setName(e.target.value):e.target.name==="email"?setEmail(e.target.value):setMessage(e.target.value)
}
    return (
        <form  onSubmit={handleSubmit}>
                <VStack>
          <Input type="hidden" name="contact" value="contact" />

          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <BsPerson />
              </InputLeftElement>
              <Input type="text" name="name" placeholder="Your Name" onChange={handleChange} value={name}/>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineEmail />
              </InputLeftElement>
              <Input type="email" name="email" placeholder="Your Email" onChange={handleChange} value={email}/>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              resize="none"
onChange={handleChange} value={message}
            />
          </FormControl>

          <Button
                    type="submit"
                    _hover={
                        {
                            //do what you want
                        }
                    }
            width="full"
          >
            Send Message
          </Button>
                </VStack>
  </form>
  );
}
