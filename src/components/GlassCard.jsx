import { extendTheme, defineStyleConfig } from '@chakra-ui/react'
const Box = defineStyleConfig({
    baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 'base', // <-- border radius is same for all variants and sizes
        w: "100vw"
    },
    variants: {
        outline: {
            border: '2px solid',
            borderColor: 'purple.500',
            color: 'purple.500',
        },
        solid: {
            bg: 'purple.500',
            color: 'white',
            display: 'fixed'
        },
    },
    // The default size and variant values
})
const theme = extendTheme({
    components: {
        Box,
    },
})
 }
 export default Glass