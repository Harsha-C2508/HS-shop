import {
  Badge,
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  MdLocalShipping,
  MdStorefront,
  MdLocationOn,
  MdPhone,
  MdReceipt,
  MdShoppingBag,
  MdAccessTime,
  MdPayment,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import { resolveImageUrl } from '../api/client';
import { getMyOrders } from '../Redux/AppRedux/action';

const statusColors = {
  ordered: 'blue',
  processing: 'orange',
  shipped: 'purple',
  'out for delivery': 'cyan',
  delivered: 'green',
  cancelled: 'red',
  returned: 'gray',
};

const getColor = (s) => statusColors[(s || '').toLowerCase()] || 'gray';
const paymentColors = { paid: 'green', pending: 'yellow', failed: 'red' };
const getPayColor = (s) => paymentColors[(s || '').toLowerCase()] || 'gray';

const formatDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const firstItem = order.items?.[0];
  const itemCount = order.items?.length || 0;
  const thumb = firstItem?.img ? resolveImageUrl(firstItem.img) : null;

  return (
    <Box
      bg="white"
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={open ? 'blue.200' : 'gray.100'}
      overflow="hidden"
      _hover={{ shadow: 'md', borderColor: open ? 'blue.200' : 'gray.200' }}
      transition="all 0.2s"
    >
      {/* Clickable summary */}
      <Box
        cursor="pointer"
        onClick={() => setOpen((v) => !v)}
        px={{ base: 4, md: 5 }}
        py={4}
      >
        <Flex gap={4} align="start">
          {/* Thumbnail */}
          {thumb ? (
            <Box position="relative" flexShrink={0}>
              <Image
                src={thumb}
                alt={firstItem.name}
                boxSize="72px"
                objectFit="cover"
                rounded="xl"
                bg="gray.100"
                border="1px"
                borderColor="gray.200"
              />
              {itemCount > 1 && (
                <Flex
                  position="absolute"
                  bottom="-4px"
                  right="-4px"
                  bg="blue.500"
                  color="white"
                  rounded="full"
                  w="22px"
                  h="22px"
                  align="center"
                  justify="center"
                  fontSize="10px"
                  fontWeight="800"
                  border="2px solid white"
                >
                  +{itemCount - 1}
                </Flex>
              )}
            </Box>
          ) : (
            <Flex
              w="72px"
              h="72px"
              bg="gray.100"
              rounded="xl"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Icon as={MdShoppingBag} color="gray.300" boxSize={7} />
            </Flex>
          )}

          {/* Order summary */}
          <Box flex={1} minW={0}>
            <Flex justify="space-between" align="start" gap={2}>
              <Box>
                <HStack spacing={2} mb={1}>
                  <Text fontWeight="700" fontSize="sm">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Text>
                  <Badge
                    colorScheme={getColor(order.status)}
                    rounded="full"
                    px={2}
                    fontSize="10px"
                    fontWeight="700"
                  >
                    {order.status}
                  </Badge>
                </HStack>
                <Text fontSize="sm" fontWeight="600" noOfLines={1} color="gray.700">
                  {firstItem?.name}
                  {itemCount > 1 && (
                    <Text as="span" color="gray.400" fontWeight="400">
                      {' '}and {itemCount - 1} more item{itemCount - 1 > 1 ? 's' : ''}
                    </Text>
                  )}
                </Text>
              </Box>
              <Icon
                as={open ? MdExpandLess : MdExpandMore}
                boxSize={5}
                color="gray.400"
                mt={1}
                flexShrink={0}
              />
            </Flex>

            <HStack spacing={3} mt={2} flexWrap="wrap">
              <Text fontWeight="700" fontSize="md" color="gray.800">
                {'\u20B9'}{order.total}
              </Text>
              {order.subtotal > order.total && (
                <Text fontSize="xs" textDecoration="line-through" color="gray.400">
                  {'\u20B9'}{order.subtotal}
                </Text>
              )}
              <Text fontSize="xs" color="gray.400">{'\u00B7'}</Text>
              <HStack spacing={1}>
                <Icon as={MdPayment} color="gray.400" boxSize={3} />
                <Badge
                  colorScheme={getPayColor(order.paymentStatus)}
                  variant="subtle"
                  rounded="full"
                  px={2}
                  fontSize="10px"
                >
                  {order.paymentStatus}
                </Badge>
              </HStack>
              {order.createdAt && (
                <>
                  <Text fontSize="xs" color="gray.400">{'\u00B7'}</Text>
                  <HStack spacing={1}>
                    <Icon as={MdAccessTime} color="gray.400" boxSize={3} />
                    <Text fontSize="xs" color="gray.500">{formatDate(order.createdAt)}</Text>
                  </HStack>
                </>
              )}
            </HStack>

            {order.discount > 0 && (
              <Badge colorScheme="green" rounded="md" px={2} py={0.5} fontSize="10px" mt={2}>
                Coupon {order.couponCode}: saved {'\u20B9'}{order.discount}
              </Badge>
            )}
          </Box>
        </Flex>
      </Box>

      {/* Expandable details */}
      <Collapse in={open} animateOpacity>
        <Divider />

        {/* All items */}
        <Box px={{ base: 4, md: 5 }} py={4}>
          <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase" mb={3}>
            Items ({itemCount})
          </Text>
          <VStack spacing={2} align="stretch">
            {order.items?.map((item, idx) => (
              <Flex
                key={idx}
                gap={3}
                p={3}
                bg="gray.50"
                rounded="xl"
                align="center"
              >
                {item.img && (
                  <Image
                    src={resolveImageUrl(item.img)}
                    alt={item.name}
                    boxSize="48px"
                    objectFit="cover"
                    rounded="lg"
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                  />
                )}
                <Box flex={1} minW={0}>
                  <Text fontWeight="600" fontSize="sm" noOfLines={1}>{item.name}</Text>
                  <HStack spacing={2} mt={0.5}>
                    <Text fontSize="xs" color="gray.500">Qty: {item.quantity || 1}</Text>
                    <Text fontSize="xs" color="gray.400">{'\u00B7'}</Text>
                    <Text fontSize="sm" fontWeight="600" color="gray.700">{'\u20B9'}{item.price}</Text>
                  </HStack>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Delivery info */}
        {order.shipping && (
          <>
            <Divider />
            <Box px={{ base: 4, md: 5 }} py={4}>
              <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase" mb={3}>
                Delivery Details
              </Text>
              <Flex
                p={4}
                bg="gray.50"
                rounded="xl"
                gap={4}
                wrap="wrap"
                align="center"
              >
                <Flex
                  w="36px" h="36px" rounded="lg"
                  bg={order.deliveryType === 'home' ? 'purple.50' : 'teal.50'}
                  align="center" justify="center" flexShrink={0}
                >
                  <Icon
                    as={order.deliveryType === 'home' ? MdLocalShipping : MdStorefront}
                    color={order.deliveryType === 'home' ? 'purple.500' : 'teal.500'}
                    boxSize={5}
                  />
                </Flex>
                <Box flex={1} minW="180px">
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={0.5}>
                    {order.deliveryType === 'home' ? 'Home Delivery' : 'Store Pickup'}
                  </Text>
                  <Text fontSize="sm" fontWeight="500" color="gray.700">
                    {order.shipping.name}
                  </Text>
                  <HStack spacing={1} mt={0.5}>
                    <Icon as={MdLocationOn} color="gray.400" boxSize={3} />
                    <Text fontSize="xs" color="gray.600">
                      {[order.shipping.buildingNo, order.shipping.street, order.shipping.city, order.shipping.state]
                        .filter(Boolean)
                        .join(', ')}{' '}
                      - {order.shipping.pincode}
                    </Text>
                  </HStack>
                  <HStack spacing={1} mt={0.5}>
                    <Icon as={MdPhone} color="gray.400" boxSize={3} />
                    <Text fontSize="xs" color="gray.600">{order.shipping.mobile}</Text>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Collapse>
    </Box>
  );
};

const Myorders = () => {
  const dispatch = useDispatch();
  const myOrders = useSelector((store) => store.AppRedux.myOrders) || [];
  const isLoading = useSelector((store) => store.AppRedux.isLoading);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <Box bg="gray.50" minH="80vh">
      <Navbar />
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 6, md: 10 }}>
        <HStack spacing={3} mb={6}>
          <Flex w="40px" h="40px" rounded="xl" bg="blue.50" align="center" justify="center">
            <Icon as={MdReceipt} color="blue.500" boxSize={5} />
          </Flex>
          <Box>
            <Heading size="lg">My Orders</Heading>
            <Text fontSize="sm" color="gray.500">
              {myOrders.length} order{myOrders.length !== 1 ? 's' : ''} placed
            </Text>
          </Box>
        </HStack>

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} h="140px" rounded="2xl" />
            ))}
          </SimpleGrid>
        ) : myOrders.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            py={20}
            bg="white"
            rounded="2xl"
            shadow="sm"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Icon as={MdShoppingBag} boxSize={16} color="gray.200" mb={4} />
            <Text color="gray.500" fontSize="lg" fontWeight="500">No orders yet</Text>
            <Text color="gray.400" fontSize="sm" mt={1}>Your orders will appear here once you shop</Text>
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {myOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Myorders;
