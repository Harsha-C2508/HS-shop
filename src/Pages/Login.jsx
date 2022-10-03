import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthRedux/action";
// import { LOGIN_SUCCESS } from "../Redux/AuthRedux/actionType";
import { useDispatch } from "react-redux";
import { loginAsAdmin } from "../Redux/AuthRedux/action";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  // const location = useLocation();
  // const come = location.state?.from?.pathname || '/'
  const handleSubmit = (e) =>{
     e.preventDefault();
          
    if(email==="adminharsh@gmail.com" && password==="hey1234"){
      let data={
        email:"eve.holt@reqres.in",
        password:"cityslicka"
      }
          dispatch( loginAsAdmin(
            data
          ))
          navigate('/admin')
    }
    else{
      dispatch( login({
        email,password
      }))
      navigate("/")
    }
  }
  



  const handleClick=()=>{
    navigate("/sigIn")
  }
  return (
    <>
       <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password"  onChange={(e)=>setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                 >
                  <Text>Are you a new your to this website   
                  <Link color={'blue.400'} onClick={handleClick}>Create Account</Link>
                  </Text>
                </Stack>

                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  onClick={login}
                  >
                  Sign in
                </Button>
              </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
