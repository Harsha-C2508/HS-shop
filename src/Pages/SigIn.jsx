import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../Redux/AuthRedux/action';

const SigIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, errorMessage } = useSelector((state) => state.AuthRedux);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userName, setUserName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp({ email: userEmail, password: userPassword, name: userName, number: userNumber }))
      .then(() => navigate('/'))
      .catch(() => {});
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create Account</Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            {isError && (
              <Alert status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            )}
            <form onSubmit={submitHandler}>
              <FormControl id="name" isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </FormControl>
              <FormControl id="number" isRequired mb={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" value={userNumber} onChange={(e) => setUserNumber(e.target.value)} />
              </FormControl>
              <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
              </FormControl>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
                type="submit"
                w="full"
                isLoading={isLoading}
              >
                Sign Up
              </Button>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SigIn;
