import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdEdit,
  MdCheck,
  MdClose,
  MdShoppingBag,
  MdFavorite,
  MdLocalShipping,
} from 'react-icons/md';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import Navbar from '../Components/Navbar';

const addressReducer = (state, action) => {
  if (action.type === 'load') return { ...state, ...action.value };
  return { ...state, [action.field]: action.value };
};

const emptyAddress = {
  name: '', mobile: '', pincode: '', city: '', state: '',
  buildingNo: '', street: '', landmark: '',
};

const StatCard = ({ icon, label, value, color, onClick }) => (
  <Box
    bg="white"
    border="1px"
    borderColor="gray.100"
    rounded="xl"
    p={5}
    shadow="sm"
    cursor={onClick ? 'pointer' : 'default'}
    onClick={onClick}
    _hover={onClick ? { shadow: 'md', transform: 'translateY(-2px)' } : {}}
    transition="all 0.2s"
  >
    <HStack spacing={3}>
      <Flex w="42px" h="42px" rounded="xl" bg={`${color}.50`} align="center" justify="center">
        <Icon as={icon} color={`${color}.500`} boxSize={5} />
      </Flex>
      <Box>
        <Text fontSize="2xl" fontWeight="800" color="gray.800">{value}</Text>
        <Text fontSize="xs" color="gray.500" fontWeight="500">{label}</Text>
      </Box>
    </HStack>
  </Box>
);

const Profile = () => {
  const user = useSelector((store) => store.AuthRedux.user);
  const navigate = useNavigate();
  const toast = useToast();

  const [address, setAddress] = useReducer(addressReducer, emptyAddress);
  const [editingAddress, setEditingAddress] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ orders: 0, wishlist: 0 });

  useEffect(() => {
    client.get('/auth/me').then((res) => {
      const addrs = res.data?.user?.addresses || [];
      const def = addrs.find((a) => a.isDefault) || addrs[0];
      if (def) setAddress({ type: 'load', value: def });
    }).catch(() => {});

    client.get('/mine').then((res) => {
      setStats((prev) => ({ ...prev, orders: res.data?.length || 0 }));
    }).catch(() => {});

    client.get('/wish').then((res) => {
      setStats((prev) => ({ ...prev, wishlist: res.data?.length || 0 }));
    }).catch(() => {});
  }, []);

  const handleSaveAddress = async () => {
    if (!address.name || !address.mobile || !address.pincode || !address.city || !address.state) {
      toast({ title: 'Please fill all required fields', status: 'warning', duration: 3000 });
      return;
    }
    setSaving(true);
    try {
      await client.put('/auth/address', address);
      toast({ title: 'Address saved', status: 'success', duration: 2000 });
      setEditingAddress(false);
    } catch {
      toast({ title: 'Failed to save address', status: 'error', duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  const hasAddress = address.name && address.city;
  const initials = user?.name ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : '?';

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container maxW="900px" py={8} px={{ base: 4, md: 6 }}>

        {/* Profile Header */}
        <Box
          bg="white"
          rounded="2xl"
          overflow="hidden"
          shadow="sm"
          border="1px"
          borderColor="gray.100"
          mb={6}
        >
          <Box h="100px" bgGradient="linear(to-r, blue.500, purple.500)" />
          <Box px={6} pb={6} mt="-40px">
            <Flex align="end" justify="space-between">
              <HStack spacing={4} align="end">
                <Avatar
                  name={user?.name}
                  size="xl"
                  bg="white"
                  color="blue.500"
                  border="4px solid white"
                  shadow="lg"
                  fontSize="2xl"
                  fontWeight="800"
                />
                <Box pb={1}>
                  <Heading size="md" color="gray.800">{user?.name || 'User'}</Heading>
                  <Text fontSize="sm" color="gray.500">{user?.email}</Text>
                </Box>
              </HStack>
              {user?.role === 'admin' && (
                <Badge colorScheme="purple" fontSize="xs" px={3} py={1} rounded="full" fontWeight="700">
                  Admin
                </Badge>
              )}
            </Flex>

            <Divider my={5} />

            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
              <HStack spacing={3}>
                <Flex w="36px" h="36px" rounded="lg" bg="blue.50" align="center" justify="center">
                  <Icon as={MdPerson} color="blue.500" boxSize={4} />
                </Flex>
                <Box>
                  <Text fontSize="xs" color="gray.400" fontWeight="500">Full Name</Text>
                  <Text fontSize="sm" fontWeight="600" color="gray.700">{user?.name || '-'}</Text>
                </Box>
              </HStack>

              <HStack spacing={3}>
                <Flex w="36px" h="36px" rounded="lg" bg="green.50" align="center" justify="center">
                  <Icon as={MdEmail} color="green.500" boxSize={4} />
                </Flex>
                <Box>
                  <Text fontSize="xs" color="gray.400" fontWeight="500">Email</Text>
                  <Text fontSize="sm" fontWeight="600" color="gray.700">{user?.email || '-'}</Text>
                </Box>
              </HStack>

              <HStack spacing={3}>
                <Flex w="36px" h="36px" rounded="lg" bg="orange.50" align="center" justify="center">
                  <Icon as={MdPhone} color="orange.500" boxSize={4} />
                </Flex>
                <Box>
                  <Text fontSize="xs" color="gray.400" fontWeight="500">Phone</Text>
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    {user?.phone ? `+91 ${user.phone}` : address.mobile ? `+91 ${address.mobile}` : 'Not set'}
                  </Text>
                </Box>
              </HStack>
            </SimpleGrid>
          </Box>
        </Box>

        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mb={6}>
          <StatCard
            icon={MdShoppingBag}
            label="Orders"
            value={stats.orders}
            color="blue"
            onClick={() => navigate('/myOrders')}
          />
          <StatCard
            icon={MdFavorite}
            label="Wishlist"
            value={stats.wishlist}
            color="pink"
            onClick={() => navigate('/wish')}
          />
          <StatCard
            icon={MdLocalShipping}
            label="Addresses"
            value={hasAddress ? 1 : 0}
            color="teal"
          />
        </SimpleGrid>

        {/* Default Address */}
        <Box bg="white" rounded="2xl" shadow="sm" border="1px" borderColor="gray.100" overflow="hidden">
          <Flex px={6} py={4} justify="space-between" align="center" borderBottom="1px" borderColor="gray.100">
            <HStack spacing={2}>
              <Icon as={MdLocationOn} color="red.400" boxSize={5} />
              <Heading size="sm" color="gray.800">Default Address</Heading>
            </HStack>
            {!editingAddress && (
              <Button
                size="sm"
                variant="ghost"
                colorScheme="blue"
                leftIcon={<MdEdit />}
                onClick={() => setEditingAddress(true)}
              >
                {hasAddress ? 'Edit' : 'Add Address'}
              </Button>
            )}
          </Flex>

          <Box px={6} py={5}>
            {editingAddress ? (
              <VStack spacing={3} align="stretch">
                <SimpleGrid columns={2} spacing={3}>
                  <Input
                    placeholder="Full Name *"
                    size="sm"
                    rounded="lg"
                    value={address.name}
                    onChange={(e) => setAddress({ field: 'name', value: e.target.value })}
                  />
                  <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none" color="gray.400" fontSize="xs">+91</InputLeftElement>
                    <Input
                      placeholder="Mobile *"
                      rounded="lg"
                      pl="38px"
                      maxLength={10}
                      value={address.mobile}
                      onChange={(e) => setAddress({ field: 'mobile', value: e.target.value.replace(/\D/g, '') })}
                    />
                  </InputGroup>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={3}>
                  <Input
                    placeholder="Pincode *"
                    size="sm"
                    rounded="lg"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress({ field: 'pincode', value: e.target.value.replace(/\D/g, '') })}
                  />
                  <Input
                    placeholder="City *"
                    size="sm"
                    rounded="lg"
                    value={address.city}
                    onChange={(e) => setAddress({ field: 'city', value: e.target.value })}
                  />
                  <Input
                    placeholder="State *"
                    size="sm"
                    rounded="lg"
                    value={address.state}
                    onChange={(e) => setAddress({ field: 'state', value: e.target.value })}
                  />
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={3}>
                  <Input
                    placeholder="Building / House No."
                    size="sm"
                    rounded="lg"
                    value={address.buildingNo}
                    onChange={(e) => setAddress({ field: 'buildingNo', value: e.target.value })}
                  />
                  <Input
                    placeholder="Street / Area"
                    size="sm"
                    rounded="lg"
                    value={address.street}
                    onChange={(e) => setAddress({ field: 'street', value: e.target.value })}
                  />
                </SimpleGrid>
                <Input
                  placeholder="Landmark (optional)"
                  size="sm"
                  rounded="lg"
                  value={address.landmark}
                  onChange={(e) => setAddress({ field: 'landmark', value: e.target.value })}
                />
                <HStack spacing={3} pt={2}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<MdCheck />}
                    onClick={handleSaveAddress}
                    isLoading={saving}
                  >
                    Save Address
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<MdClose />}
                    onClick={() => setEditingAddress(false)}
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            ) : hasAddress ? (
              <Box>
                <HStack spacing={2} mb={2}>
                  <Text fontWeight="700" fontSize="sm" color="gray.800">{address.name}</Text>
                  <Badge colorScheme="blue" fontSize="10px" rounded="full" px={2}>Default</Badge>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {[address.buildingNo, address.street].filter(Boolean).join(', ')}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {address.city}, {address.state} - {address.pincode}
                </Text>
                {address.landmark && (
                  <Text fontSize="sm" color="gray.500">Landmark: {address.landmark}</Text>
                )}
                <Text fontSize="sm" color="gray.500" mt={1}>
                  +91 {address.mobile}
                </Text>
              </Box>
            ) : (
              <VStack py={6} spacing={3}>
                <Icon as={MdLocationOn} boxSize={10} color="gray.300" />
                <Text color="gray.400" fontSize="sm">No saved address yet</Text>
                <Button size="sm" colorScheme="blue" variant="outline" onClick={() => setEditingAddress(true)}>
                  Add Address
                </Button>
              </VStack>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
