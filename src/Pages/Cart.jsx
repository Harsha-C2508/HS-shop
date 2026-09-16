import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Select,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromCart, updateCartQuantity } from '../Redux/AppRedux/action';
import Delete from '../CartList/Delete';
import BillPart from '../CartList/BillPart';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { resolveImageUrl } from '../api/client';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((store) => store.AppRedux.cart) || [];
  const { isAuth } = useSelector((store) => store.AuthRedux);
  const [loading, setLoading] = useState(true);
  const linkColor = useColorModeValue('blue.500', 'blue.200');

  useEffect(() => {
    if (!isAuth) {
      setLoading(false);
      return;
    }
    setLoading(true);
    dispatch(getDataFromCart()).finally(() => setLoading(false));
  }, [dispatch, isAuth]);

  const handleQuantityChange = (itemId, value) => {
    dispatch(updateCartQuantity(itemId, value));
  };

  return (
    <>
      <Navbar />
      <Box maxW="1200px" mx="auto" px={4} py={6}>
        {loading ? (
          <Stack spacing={4}>
            <Skeleton height="120px" borderRadius="md" />
            <SkeletonText noOfLines={4} spacing={3} />
          </Stack>
        ) : !isAuth ? (
          <Stack align="center" py={16} spacing={4}>
            <Text fontWeight="700" fontSize="xl">
              Please log in to view your cart
            </Text>
            <Button colorScheme="blue" onClick={() => navigate('/login', { state: { from: { pathname: '/cart' } } })}>
              Login
            </Button>
          </Stack>
        ) : cart.length === 0 ? (
          <Stack align="center" py={12} spacing={4} maxW="320px" mx="auto">
            <Image
              src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
              alt="Empty cart"
              maxW="200px"
            />
            <Text fontWeight="700" fontSize="xl">
              Your cart is empty
            </Text>
            <Button onClick={() => navigate('/')} variant="outline" colorScheme="red">
              View Products
            </Button>
          </Stack>
        ) : (
          <Flex direction={{ base: 'column', lg: 'row' }} gap={8} align="flex-start">
            <Stack flex={1} spacing={0} w="full">
              {cart.map((item) => (
                <Box key={item.id}>
                  <Flex
                    gap={{ base: 4, md: 6 }}
                    py={5}
                    direction={{ base: 'column', sm: 'row' }}
                    align={{ base: 'stretch', sm: 'center' }}
                  >
                    <Image
                      src={resolveImageUrl(item.img)}
                      alt={item.name}
                      boxSize={{ base: 'full', sm: '120px' }}
                      maxH="120px"
                      objectFit="cover"
                      borderRadius="md"
                      flexShrink={0}
                    />
                    <Box flex={1} minW={0}>
                      <Text fontWeight="bold">{item.name}</Text>
                      <Text mt={1}>₹{item.price}</Text>
                      {(item.quantity || 1) > 1 && (
                        <Text fontSize="sm" color="gray.500">
                          ₹{item.price * (item.quantity || 1)} total
                        </Text>
                      )}
                    </Box>
                    <Flex align="center" gap={3} flexShrink={0}>
                      <Select
                        width="80px"
                        size="sm"
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </Select>
                      <Delete id={item.id} />
                    </Flex>
                  </Flex>
                  <Divider />
                </Box>
              ))}
            </Stack>

            <Box w={{ base: 'full', lg: '340px' }} flexShrink={0}>
              <BillPart />
              <Flex justify="center" mt={4} gap={2} align="center">
                <Text fontWeight="bold">or</Text>
                <Link color={linkColor} onClick={() => navigate('/')} fontWeight="bold">
                  Continue shopping
                </Link>
              </Flex>
            </Box>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default Cart;
