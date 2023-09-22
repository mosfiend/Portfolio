import { Box, useStyleConfig } from "@chakra-ui/react";

const Glass = (props) => {
  const { variant, ...rest } = props
  const styles = useStyleConfig('Glass', { variant })
  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />
}
export default Glass

