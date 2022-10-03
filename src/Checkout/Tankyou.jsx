import React from 'react'
import { Box, Heading, Text,Link,useColorModeValue as mode } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
const Tankyou = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate("/")
    }
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
       Thank you 
      </Heading>
      <Text color={'gray.500'}>
       Hope you enjoy the shopping🙂,Visit again Harsha's Collection  
      </Text>
      <Link color={mode('blue.500', 'blue.200')} onClick={handleClick} ml='10px' fontWeight='bold'>Continue shopping</Link>
    </Box>
  )
}

export default Tankyou