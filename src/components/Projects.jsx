import { Box, Grid, GridItem } from "@chakra-ui/react";

const Projects = () => {
  return (
    <Box>
      <h2>Projects</h2>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4}>
        <GridItem bg="gray.300" p={4} height="200px" margin="10px">
          {/* Project 1 content here */}
        </GridItem>
        <GridItem bg="gray.300" p={4} height="200px" margin="10px">
          {/* Project 2 content here */}
        </GridItem>
        <GridItem bg="gray.300" p={4} height="200px" margin="10px">
          {/* Project 3 content here */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Projects;
