import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  MdLocalShipping,
  MdStorefront,
  MdShoppingBag,
  MdLocationOn,
  MdPhone,
  MdPerson,
  MdRefresh,
} from 'react-icons/md';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../Components/AdminNav';
import {
  getCustomerDataAddress,
  getCustomerDataAddressOnline,
} from '../Redux/AppRedux/action';
import Status, { getStatusColor } from '../SingleProd/Status';

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const shopCust = useSelector((store) => store.AppRedux.shopCust) || [];
  const deliveryCust = useSelector((store) => store.AppRedux.deliveryCust) || [];
  const isLoading = useSelector((store) => store.AppRedux.isLoading);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(getCustomerDataAddress());
    dispatch(getCustomerDataAddressOnline());
  }, [dispatch]);

  const refresh = () => {
    dispatch(getCustomerDataAddress());
    dispatch(getCustomerDataAddressOnline());
  };

  const totalOrders = deliveryCust.length + shopCust.length;
  const deliveryCount = deliveryCust.length;
  const pickupCount = shopCust.length;

  const statusCounts = useMemo(() => {
    const all = [
      ...deliveryCust.map((o) => o.status),
      ...shopCust.map((o) => o.Sstatus),
    ];
    return {
      ordered: all.filter((s) => s?.toLowerCase() === 'ordered').length,
      processing: all.filter((s) => s?.toLowerCase() === 'processing').length,
      shipped: all.filter((s) => s?.toLowerCase() === 'shipped').length,
      delivered: all.filter((s) => s?.toLowerCase() === 'delivered').length,
    };
  }, [deliveryCust, shopCust]);

  const filteredDelivery = useMemo(() => {
    return deliveryCust.filter((o) => {
      const matchSearch =
        !search ||
        o.cusname?.toLowerCase().includes(search.toLowerCase()) ||
        o.mobile?.includes(search) ||
        o.city?.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'all' ||
        o.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [deliveryCust, search, statusFilter]);

  const filteredShop = useMemo(() => {
    return shopCust.filter((o) => {
      const matchSearch =
        !search ||
        o.Sname?.toLowerCase().includes(search.toLowerCase()) ||
        o.Smobile?.includes(search) ||
        o.Scity?.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'all' ||
        o.Sstatus?.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [shopCust, search, statusFilter]);

  return (
    <Box minH="100vh" bg="gray.50">
      <AdminNav />

      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={6}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
          <Box>
            <Heading size="lg">Order Management</Heading>
            <Text fontSize="sm" color="gray.500" mt={0.5}>
              Track and manage all customer orders
            </Text>
          </Box>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            leftIcon={<Icon as={MdRefresh} />}
            onClick={refresh}
            rounded="lg"
            isLoading={isLoading}
          >
            Refresh
          </Button>
        </Flex>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={4} mb={6}>
          {[
            { label: 'Total Orders', value: totalOrders, color: 'blue', icon: MdShoppingBag },
            { label: 'Delivery', value: deliveryCount, color: 'purple', icon: MdLocalShipping },
            { label: 'Pickup', value: pickupCount, color: 'teal', icon: MdStorefront },
            { label: 'Ordered', value: statusCounts.ordered, color: 'blue' },
            { label: 'Shipped', value: statusCounts.shipped, color: 'purple' },
            { label: 'Delivered', value: statusCounts.delivered, color: 'green' },
          ].map((s) => (
            <Stat
              key={s.label}
              p={4}
              bg="white"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.100"
              rounded="xl"
              cursor="pointer"
              _hover={{ shadow: 'md', borderColor: `${s.color}.200` }}
              transition="all 0.15s"
            >
              <HStack justify="space-between">
                <Box>
                  <StatLabel fontSize="xs" color="gray.500" fontWeight="600">{s.label}</StatLabel>
                  <StatNumber fontSize="xl" color={`${s.color}.600`}>{s.value}</StatNumber>
                </Box>
                {s.icon && (
                  <Flex
                    w="36px" h="36px" rounded="lg"
                    bg={`${s.color}.50`}
                    align="center" justify="center"
                  >
                    <Icon as={s.icon} color={`${s.color}.500`} boxSize={5} />
                  </Flex>
                )}
              </HStack>
            </Stat>
          ))}
        </SimpleGrid>

        {/* Filters */}
        <Flex gap={3} mb={4} wrap="wrap" align="center">
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, phone, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rounded="lg"
              bg="white"
              size="md"
            />
          </InputGroup>
          <HStack spacing={2} flexWrap="wrap">
            {['all', 'Ordered', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={statusFilter === s ? 'solid' : 'ghost'}
                colorScheme={statusFilter === s ? 'blue' : 'gray'}
                onClick={() => setStatusFilter(s)}
                rounded="full"
                fontWeight="600"
                fontSize="xs"
              >
                {s === 'all' ? 'All Status' : s}
              </Button>
            ))}
          </HStack>
        </Flex>

        {/* Tabs */}
        <Box bg="white" rounded="xl" shadow="sm" borderWidth="1px" borderColor="gray.100" overflow="hidden">
          <Tabs colorScheme="blue" variant="enclosed-colored">
            <TabList bg="gray.50" px={4} pt={3}>
              <Tab
                rounded="t-lg"
                fontWeight="600"
                fontSize="sm"
                _selected={{ bg: 'white', color: 'blue.600', borderColor: 'gray.200', borderBottomColor: 'white' }}
              >
                <HStack spacing={2}>
                  <Icon as={MdLocalShipping} boxSize={4} />
                  <Text>Home Delivery</Text>
                  <Badge colorScheme="blue" rounded="full" ml={1}>{filteredDelivery.length}</Badge>
                </HStack>
              </Tab>
              <Tab
                rounded="t-lg"
                fontWeight="600"
                fontSize="sm"
                _selected={{ bg: 'white', color: 'teal.600', borderColor: 'gray.200', borderBottomColor: 'white' }}
              >
                <HStack spacing={2}>
                  <Icon as={MdStorefront} boxSize={4} />
                  <Text>Store Pickup</Text>
                  <Badge colorScheme="teal" rounded="full" ml={1}>{filteredShop.length}</Badge>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              {/* Home Delivery Tab */}
              <TabPanel p={0}>
                {isLoading ? (
                  <VStack p={6} spacing={3}>
                    {[1, 2, 3].map((i) => <Skeleton key={i} h="60px" w="100%" rounded="md" />)}
                  </VStack>
                ) : filteredDelivery.length === 0 ? (
                  <EmptyState message="No delivery orders found" />
                ) : (
                  <Box overflowX="auto">
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th py={3} fontSize="xs" color="gray.500">#</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Customer</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Contact</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Delivery Address</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Status</Th>
                          <Th py={3} fontSize="xs" color="gray.500" textAlign="center">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredDelivery.map((order, i) => (
                          <Tr key={order.id || i} _hover={{ bg: 'gray.50' }} transition="background 0.1s">
                            <Td py={3}>
                              <Text fontSize="xs" color="gray.400" fontWeight="600">{order.no || i + 1}</Text>
                            </Td>
                            <Td py={3}>
                              <HStack spacing={2}>
                                <Flex
                                  w="32px" h="32px" rounded="full"
                                  bg="blue.50" align="center" justify="center" flexShrink={0}
                                >
                                  <Icon as={MdPerson} color="blue.400" boxSize={4} />
                                </Flex>
                                <Text fontWeight="600" fontSize="sm">{order.cusname}</Text>
                              </HStack>
                            </Td>
                            <Td py={3}>
                              <VStack spacing={0} align="start">
                                <HStack spacing={1}>
                                  <Icon as={MdPhone} color="gray.400" boxSize={3} />
                                  <Text fontSize="xs" color="gray.600">{order.mobile}</Text>
                                </HStack>
                                <Text fontSize="xs" color="gray.400">PIN: {order.pincode}</Text>
                              </VStack>
                            </Td>
                            <Td py={3}>
                              <VStack spacing={0} align="start">
                                <HStack spacing={1}>
                                  <Icon as={MdLocationOn} color="gray.400" boxSize={3} />
                                  <Text fontSize="xs" color="gray.700" fontWeight="500">
                                    {order.street}
                                  </Text>
                                </HStack>
                                <Text fontSize="xs" color="gray.500">
                                  {order.city}, {order.state}
                                </Text>
                              </VStack>
                            </Td>
                            <Td py={3}>
                              <Badge
                                colorScheme={getStatusColor(order.status)}
                                rounded="full"
                                px={3}
                                py={0.5}
                                fontSize="10px"
                                fontWeight="600"
                              >
                                {order.status}
                              </Badge>
                            </Td>
                            <Td py={3} textAlign="center">
                              <Status orderId={order.id} status={order.status} type="home" />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                )}
              </TabPanel>

              {/* Store Pickup Tab */}
              <TabPanel p={0}>
                {isLoading ? (
                  <VStack p={6} spacing={3}>
                    {[1, 2, 3].map((i) => <Skeleton key={i} h="60px" w="100%" rounded="md" />)}
                  </VStack>
                ) : filteredShop.length === 0 ? (
                  <EmptyState message="No store pickup orders found" />
                ) : (
                  <Box overflowX="auto">
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th py={3} fontSize="xs" color="gray.500">#</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Customer</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Contact</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Location</Th>
                          <Th py={3} fontSize="xs" color="gray.500">Status</Th>
                          <Th py={3} fontSize="xs" color="gray.500" textAlign="center">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredShop.map((order, i) => (
                          <Tr key={order.id || i} _hover={{ bg: 'gray.50' }} transition="background 0.1s">
                            <Td py={3}>
                              <Text fontSize="xs" color="gray.400" fontWeight="600">{order.no || i + 1}</Text>
                            </Td>
                            <Td py={3}>
                              <HStack spacing={2}>
                                <Flex
                                  w="32px" h="32px" rounded="full"
                                  bg="teal.50" align="center" justify="center" flexShrink={0}
                                >
                                  <Icon as={MdPerson} color="teal.400" boxSize={4} />
                                </Flex>
                                <Text fontWeight="600" fontSize="sm">{order.Sname}</Text>
                              </HStack>
                            </Td>
                            <Td py={3}>
                              <VStack spacing={0} align="start">
                                <HStack spacing={1}>
                                  <Icon as={MdPhone} color="gray.400" boxSize={3} />
                                  <Text fontSize="xs" color="gray.600">{order.Smobile}</Text>
                                </HStack>
                                <Text fontSize="xs" color="gray.400">PIN: {order.Spincode}</Text>
                              </VStack>
                            </Td>
                            <Td py={3}>
                              <HStack spacing={1}>
                                <Icon as={MdLocationOn} color="gray.400" boxSize={3} />
                                <Text fontSize="xs" color="gray.700">
                                  {order.Scity}, {order.Sstate}
                                </Text>
                              </HStack>
                            </Td>
                            <Td py={3}>
                              <Badge
                                colorScheme={getStatusColor(order.Sstatus)}
                                rounded="full"
                                px={3}
                                py={0.5}
                                fontSize="10px"
                                fontWeight="600"
                              >
                                {order.Sstatus}
                              </Badge>
                            </Td>
                            <Td py={3} textAlign="center">
                              <Status orderId={order.id} status={order.Sstatus} type="shop" />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

const EmptyState = ({ message }) => (
  <Flex direction="column" align="center" py={16} gap={3}>
    <Icon as={MdShoppingBag} boxSize={12} color="gray.200" />
    <Text color="gray.400" fontSize="sm">{message}</Text>
  </Flex>
);

export default PersonalDetails;
