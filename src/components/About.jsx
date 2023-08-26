import { Box, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box paddingTop={50}>
      <Heading as="h3" fontSize="l" mb={4}>
        About Me
      </Heading>
      <Text>
        Write a brief introduction about yourself here. Mention your name,
        your profession, and any relevant background or experience you'd like
        to highlight.
      </Text>
      <Text mt={4}>
        You can also include a bit about your interests, hobbies, or any other
        fun facts that you'd like to share.
      </Text>
    </Box>
  );
};

export default About;
