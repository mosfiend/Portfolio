import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Box,
    FormErrorMessage,
    FormLabel,
    FormControl,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react'

export default function ContactForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    console.log()
    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)
  
    const isError = input === ''
  
    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        })
    }

    return (
        <Box >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input
                        id='name'
                        placeholder='name'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='subject'>Subject</FormLabel>
                    <Input
                        id='subject'
                        placeholder='subject'
                        {...register('subject', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {/* {errors.subject && errors.subject.message} */}
                    </FormErrorMessage>
                </FormControl>
                {/* <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type='email'/>

        <FormErrorMessage>Email is required.</FormErrorMessage>
    </FormControl> */}


                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>
        </Box>
    )
}


// function Contact({header}) {

//     return (<>
//     <h4>{header}</h4>
// <form id="contact" className="contact">
// <label>Name</label>
// <input id="name-field" className="input" type="text" name="name"/>

// <label>Subject</label>
// <input id="submit-field" className="input" type="text" name="subject"/>

// <label>Email</label>
// <input id="mail-field" className="input" type="text" name="name"/>

// <label>Message</label>
// <textarea id="message-field" className="input" />

// <input id="submit" className="submit-btn" type="submit"/>
// </form>
//     </>)
// }



