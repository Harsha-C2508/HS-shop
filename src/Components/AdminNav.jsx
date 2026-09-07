import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  MdStorefront,
  MdDashboard,
  MdShoppingBag,
  MdLogout,
} from 'react-icons/md';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/AuthRedux/action';

const NAV_ITEMS = [
  { label: 'Storefront', icon: MdStorefront, to: '/' },
  { label: 'Products', icon: MdDashboard, to: '/admin' },
  { label: 'Orders', icon: MdShoppingBag, to: '/customer' },
];

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box
      bg="gray.900"
      color="white"
      px={6}
      py={0}
      position="sticky"
      top={0}
      zIndex={20}
      borderBottom="1px"
      borderColor="whiteAlpha.100"
    >
      <Flex justify="space-between" align="center" maxW="1400px" mx="auto" h="56px">
        <HStack spacing={2} cursor="pointer" onClick={() => navigate('/admin')}>
          <Box w="32px" h="32px" rounded="lg" bg="blue.500" display="flex" alignItems="center" justifyContent="center">
            <Text fontWeight="900" fontSize="sm">HS</Text>
          </Box>
          <Heading size="sm" letterSpacing="-0.02em">Admin</Heading>
        </HStack>

        <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.label} to={item.to}>
                <Button
                  size="sm"
                  variant="ghost"
                  color={isActive ? 'white' : 'whiteAlpha.700'}
                  bg={isActive ? 'whiteAlpha.150' : 'transparent'}
                  _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  leftIcon={<Icon as={item.icon} boxSize={4} />}
                  rounded="lg"
                  fontWeight={isActive ? '600' : '500'}
                  fontSize="sm"
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </HStack>

        <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
          <Button
            size="sm"
            variant="outline"
            color="red.300"
            borderColor="red.400"
            _hover={{ bg: 'red.500', color: 'white', borderColor: 'red.500' }}
            leftIcon={<Icon as={MdLogout} boxSize={4} />}
            onClick={handleLogout}
            rounded="lg"
            fontWeight="500"
            fontSize="sm"
          >
            Logout
          </Button>
        </HStack>

        <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              colorScheme="whiteAlpha"
              size="sm"
              rounded="lg"
            />
            <MenuList color="gray.800" rounded="xl" shadow="xl" py={2}>
              {NAV_ITEMS.map((item) => (
                <MenuItem
                  key={item.label}
                  as={Link}
                  to={item.to}
                  icon={<Icon as={item.icon} boxSize={4} />}
                  fontSize="sm"
                  fontWeight="500"
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem
                icon={<Icon as={MdLogout} boxSize={4} color="red.500" />}
                onClick={handleLogout}
                fontSize="sm"
                fontWeight="500"
                color="red.500"
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminNav;
