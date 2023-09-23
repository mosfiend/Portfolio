import { Text, Button, Flex, Center, Heading } from "@chakra-ui/react";
import Socials from "./Socials.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
import Glass from "./Glass.jsx";
const Sidebar = ({curScene, project}) => {
    let bg = curScene===0?"rgba(200,255,70,0.5)":curScene===1?"rgba(255,0,30,0.4)":"rgba(0,0,0,1)"
    return (
        <Glass
            position="absolute"
            left="50px"
            top="10vh"
            width="30vw"
            boxShadow={`3px 4px 12px 0px ${bg}`}
        >
            {curScene === 0 ? (
                <About 
                        />
            ) : curScene === 2 ? (
                    <Contact />
                ) : (
                        <Projects project={project} />
                    )}
        </Glass>
    )
}

export default Sidebar
