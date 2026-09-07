import React from 'react';
import { Box, Button, Container, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { MdLocalShipping, MdShoppingBag } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Tankyou = () => {
  const navigate = useNavigate();
  const orderId = 'HS' + Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <Container maxW="500px" py={16}>
      <VStack spacing={6} textAlign="center">
        <Box bg="green.50" p={5} rounded="full">
          <CheckCircleIcon boxSize="60px" color="green.500" />
        </Box>

        <Heading size="lg" color="gray.800">
          Order Placed Successfully!
        </Heading>

        <Text color="gray.500" fontSize="md">
          Thank you for shopping with Harsha's Collection 🎉
        </Text>

        <Box bg="gray.50" w="full" rounded="lg" p={5} border="1px" borderColor="gray.200">
          <VStack spacing={3}>
            <Text fontSize="sm" color="gray.500">Order ID</Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.600" letterSpacing="wide">
              {orderId}
            </Text>
            <Box h="1px" bg="gray.200" w="full" />
            <Box display="flex" alignItems="center" gap={2}>
              <Icon as={MdLocalShipping} color="orange.500" />
              <Text fontSize="sm" color="gray.600">
                Estimated delivery by{' '}
                <Text as="span" fontWeight="bold">
                  {new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>

        <VStack spacing={3} w="full" pt={4}>
          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            leftIcon={<Icon as={MdShoppingBag} />}
            onClick={() => navigate('/myOrders')}
          >
            View My Orders
          </Button>
          <Button
            variant="outline"
            size="lg"
            w="full"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Tankyou;
