import { Box, Heading, Text } from "@chakra-ui/react";

const About = ({curScene}) => {
  return (
        <>
            <Heading as="h1" fontSize="6xl" textAlign="center" m={4}>
                Who am I?
            </Heading>
                <Text fontSize="xl" m={4}>
                Hi there! I am coming back from a year long break from coding, and if you're seeing this then it means that for the first time in my career
                I have completed a personal project (or at least have gotten it to a point where it's presentable)!
        </Text>
                <Text fontSize="xl" m={4}>
                This isn't much, but if there's anything I have learned from my journey learning on and off, it's that finishing a project is the hardest skill that nobody teaches you.
        </Text>
                <Text fontSize="xl" m={4}>

        </Text>
</>
  );
};

export default About;
